import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createSubdomain,
  deleteSubdomain,
  getSubdomains,
  updateSubdomain,
} from "../actions/subdomain";
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
} from "@windmill/react-ui";
import Input from "../components/Input";
import { getPrograms } from "../actions/program";

function Subdomain() {
  const dispatch = useDispatch();
  const subdomainState = useSelector((state) => state.subdomain);
  const programState = useSelector((state) => state.program);
  const [url, setUrl] = useState("");
  const [program, setProgram] = useState();
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
    dispatch(getPrograms());
    dispatch(getSubdomains());
  }, []);

  const handleCreateSubdomain = () => {
    setIsModalOpen(false);

    dispatch(createSubdomain(parseInt(program), url));

    setUrl("");
    setProgram(0);
  };

  const handleUpdateSubdomain = () => {
    setIsModalOpen(false);
    setEditMode(false);

    dispatch(updateSubdomain(parseInt(editId), parseInt(program), url));

    setUrl("");
    setProgram(0);
    setEditId(0);
  };

  const handleDeleteSubdomain = (id) => {
    dispatch(deleteSubdomain(id));
  };

  const handleEditSubdomain = (subdomain) => {
    setUrl(subdomain.url);
    setProgram(subdomain.program_id);
    setEditId(subdomain.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = subdomainState.subdomains
    ? subdomainState.subdomains.length
    : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  const getProgramName = (id) => {
    if (programState && programState.programs) {
      var potential = programState.programs.find(
        (item) => item.id == parseInt(id)
      );
      if (potential) {
        return potential.name;
      } else {
        return "";
      }
    }
  };

  useEffect(() => {
    console.log(subdomainState.subdomains);
    setDataTable(
      subdomainState.subdomains &&
        subdomainState.subdomains.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, subdomainState]);

  return (
    <>
      <PageTitle>Subdomains</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3 flex items-center justify-end space-x-4">
          <Button onClick={openModal}>Add</Button>
        </div>
        
        <div>
        {totalResults > 0 ? (  
          <TableContainer className="mb-8 w-1">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Subdomain</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Ports</TableCell>
                  <TableCell>Status Code</TableCell>
                  <TableCell>Content Length</TableCell>
                  <TableCell>Technology</TableCell>
                  <TableCell>Screenshot</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable &&
                  dataTable.map((key, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">
                          <a href={key.url} target="__blank">
                            {key.url}
                          </a>
                        </span>
                        <br />
                        <span class="bg-sky-700 text-white text-xs font-medium mr-2 px-4 py-1 rounded dark:bg-blue-900 dark:text-blue-300">{key.title}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {getProgramName(key.program_id)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{key.port}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{key.status_code}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{key.content_length}</span>
                      </TableCell>
                      <TableCell>
                        {key.technologies != "" && key.technologies.split(",").map((tech, i) => (
                          <span class="bg-sky-700 text-white text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{tech}</span>
                        ))}
                      </TableCell>
                      <TableCell>
                        {key.screenshot !== "" ? (
                          <img
                            src={`data:image/png;base64,${key.screenshot}`}
                            style={{width: "200px", height: "100px"}}
                            alt="preview"
                          />
                        ) : (
                          <img
                            src={require("../assets/img/default_picture.png")}
                            alt="preview"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Delete">
                            <TrashIcon
                              onClick={() => handleDeleteSubdomain(key.id)}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button layout="link" size="icon" aria-label="Delete">
                            <EditIcon
                              onClick={() => handleEditSubdomain(key)}
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
          
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-sm">No data to display</span>
          </div>
        )}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Add a Subdomain</ModalHeader>
          <ModalBody>
            {programState && programState.programs && (
              <Label className="pt-5">
                <span>Program</span>
                <Select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select a Program</option>
                  {programState.programs.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Select>
              </Label>
            )}
            <Label className="pt-5">
              <span>Subdomain</span>
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
                <Button onClick={() => handleUpdateSubdomain()}>Update</Button>
              ) : (
                <Button onClick={() => handleCreateSubdomain()}>Add</Button>
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
                  onClick={() => handleUpdateSubdomain()}
                >
                  Update
                </Button>
              ) : (
                <Button
                  block
                  size="large"
                  onClick={() => handleCreateSubdomain()}
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

export default Subdomain;
