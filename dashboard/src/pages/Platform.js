import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createPlatform,
  deletePlatform,
  getPlatforms,
  updatePlatform
} from "../actions/platform";
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

function Platform() {
  const dispatch = useDispatch();
  const platformState = useSelector((state) => state.platform);
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState("public")
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
    dispatch(getPlatforms());
  }, []);

  const handleCreatePlatform = () => {
    setIsModalOpen(false)

    dispatch(createPlatform(name, url, type));

    setName("");
    setType("public");
    setUrl("");
    setEditId(0);
  };

  const handleDeletePlatform = (id) => {
    dispatch(deletePlatform(id));
  };

  const handleUpdatePlatform = () => {
    setIsModalOpen(false);
    setEditMode(false);

    dispatch(updatePlatform(parseInt(editId), name, url, type));

    setName("");
    setType("public");
    setUrl("");
    setEditId(0);
  };

  const handleEditPlatform = (platform) => {
    setName(platform.name);
    setType(platform.type);
    setUrl(platform.url);
    setEditId(platform.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = platformState.platforms
    ? platformState.platforms.length
    : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  useEffect(() => {
    setDataTable(
      platformState.platforms &&
        platformState.platforms.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, platformState]);

  return (
    <>
      <PageTitle>Platform</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Button onClick={openModal}>Add a Platform</Button>
        </div>

        {totalResults > 0 && (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Url</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable.map((key, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{key.name}</span>
                    </TableCell>
                    <TableCell>
                      <a className="text-sm truncate text-ellipsis overflow-hidden" href={key.url}>
                        {key.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{key.type === "public" ? "Public" : "Private"}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="icon" aria-label="Delete">
                          <TrashIcon
                            onClick={() => handleDeletePlatform(key.id)}
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete">
                          <EditIcon
                            onClick={() => handleEditPlatform(key)}
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
          <ModalHeader>Add a Platform</ModalHeader>
          <ModalBody>
            <Label className="pt-5">
              <span>Name</span>
              <Input className="mt-1" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
            </Label>

            <Label className="pt-5">
              <span>Url</span>
              <Input className="mt-1" placeholder="" value={url} onChange={(e) => setUrl(e.target.value)} />
            </Label>

            <Label className="pt-5">
              <span>Type</span>
              <Select value={type} onChange={(e) => setType(e.target.value)} className="mt-1">
                <option value="private">Private</option>
                <option value="public">Public</option>
              </Select>
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
                <Button onClick={() => handleUpdatePlatform()}>Update</Button>
              ) : (
                <Button onClick={() => handleCreatePlatform()}>Add</Button>
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
                  onClick={() => handleUpdatePlatform()}
                >
                  Update
                </Button>
              ) : (
                <Button
                  block
                  size="large"
                  onClick={() => handleCreatePlatform()}
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

export default Platform;
