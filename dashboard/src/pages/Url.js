import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUrl,
  deleteUrl,
  getUrls,
  updateUrl,
} from "../actions/url";
import PageTitle from "../components/Typography/PageTitle";
import { TrashIcon, EditIcon } from "../icons";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Pagination,
  Label,
  Select,
  Input,
} from "@windmill/react-ui";
import { getSubdomains } from "../actions/subdomain";

function Url() {
  const dispatch = useDispatch();
  const urlState = useSelector((state) => state.url);
  const subdomainState = useSelector((state) => state.subdomain);
  const [url, setUrl] = useState("");
  const [subdomain, setSubdomain] = useState();
  const [editId, setEditId] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setEditMode(false);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    dispatch(getSubdomains());
    dispatch(getUrls());
  }, []);

  const handleCreateUrl = () => {
    setIsModalOpen(false);

    dispatch(
      createUrl(parseInt(subdomain), url)
    );

    setUrl("");
    setSubdomain(0);
  };

  const handleUpdateUrl = () => {
    setIsModalOpen(false);
    setEditMode(false);

    dispatch(
      updateUrl(
        parseInt(editId),
        parseInt(subdomain),
        url
      )
    );

    setUrl("");
    setSubdomain(0);
    setEditId(0);
  };

  const handleDeleteUrl = (id) => {
    dispatch(deleteUrl(id));
  };

  const handleEditUrl = (url) => {
    setUrl(url.url);
    setSubdomain(url.subdomain_id);
    setEditId(url.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = urlState.urls ? urlState.urls.length : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  const getSubdomainName = (id) => {
    if (subdomainState && subdomainState.subdomains) {
      var potential = subdomainState.subdomains.find(
        (item) => item.id == parseInt(id)
      );
      if (potential) {
        return potential.url;
      } else {
        return "";
      }
    }
  };

  useEffect(() => {
    setDataTable(
      urlState.urls &&
        urlState.urls.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, urlState]);

  return (
    <>
      <PageTitle>Urls</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Button onClick={openModal}>Add a Url</Button>
        </div>

        {totalResults > 0 && (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Url</TableCell>
                  <TableCell>Subdomain</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status Code</TableCell>
                  <TableCell>Content Length</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable &&
                  dataTable.map((key, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{key.url}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {getSubdomainName(key.subdomain_id)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{key.title}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{key.status_code}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{key.content_length}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Delete">
                            <TrashIcon
                              onClick={() => handleDeleteUrl(key.id)}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button layout="link" size="icon" aria-label="Delete">
                            <EditIcon
                              onClick={() => handleEditUrl(key)}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={onPageChangeTable}
                label="Navigation"
              />
            </TableFooter>
          </TableContainer>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Add a Url</ModalHeader>
          <ModalBody>
            {subdomainState && subdomainState.subdomains && (
              <Label className="pt-5">
                <span>Subdomain</span>
                <Select
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="mt-1"
                >
                  <option value="">Select a Subdomain</option>
                  {subdomainState.subdomains.map((item) => (
                    <option value={item.id}>{item.url}</option>
                  ))}
                </Select>
              </Label>
            )}
            <Label className="pt-5">
              <span>Url</span>
              <Input
                className="mt-1"
                placeholder=""
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Label>
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              {editMode ? (
                <Button onClick={() => handleUpdateUrl()}>Update</Button>
              ) : (
                <Button onClick={() => handleCreateUrl()}>Add</Button>
              )}
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              {editMode ? (
                <Button
                  block
                  size="large"
                  onClick={() => handleUpdateUrl()}
                >
                  Update
                </Button>
              ) : (
                <Button
                  block
                  size="large"
                  onClick={() => handleCreateUrl()}
                >
                  Add
                </Button>
              )}
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Url;
