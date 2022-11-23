import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProgram, deleteProgram, getPrograms, updateProgram } from "../actions/program";
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
import { getPlatforms } from "../actions/platform";

function Program() {
  const dispatch = useDispatch();
  const programState = useSelector((state) => state.program);
  const platformState = useSelector((state) => state.platform);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("public");
  const [platform, setPlatform] = useState();
  const [vdp, setVdp] = useState(false);
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
    dispatch(getPrograms());
  }, []);

  const handleCreateProgram = () => {
    setIsModalOpen(false);
    
    dispatch(createProgram(parseInt(platform), name, url, type, vdp));

    setName("");
    setType("public");
    setPlatform(0);
    setUrl("");
    setVdp(false);
  };

  const handleUpdateProgram = () => {
    setIsModalOpen(false);
    setEditMode(false);

    dispatch(updateProgram(parseInt(editId), parseInt(platform), name, url, type, vdp));

    setName("");
    setType("public");
    setPlatform(0);
    setUrl("");
    setVdp(false);
    setEditId(0);
  };

  const handleDeleteProgram = (id) => {
    dispatch(deleteProgram(id));
  };

  const handleEditProgram = (program) => {
    setName(program.name);
    setType(program.type);
    setPlatform(program.platform_id);
    setUrl(program.url);
    setVdp(program.vdp);
    setEditId(program.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = programState.programs ? programState.programs.length : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  const getPlatformName = (id) => {
    if (platformState && platformState.platforms) {
      var potential = platformState.platforms.find(
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
    setDataTable(
      programState.programs &&
        programState.programs.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, programState]);

  return (
    <>
      <PageTitle>Program</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Button onClick={openModal}>Add a Program</Button>
        </div>

        {totalResults > 0 && (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Url</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable && dataTable.map((key, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{key.name}</span>
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-sm truncate text-ellipsis overflow-hidden"
                        href={key.url}
                      >
                        {key.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {key.type === "public" ? "Public" : "Private"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {getPlatformName(key.platform_id)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="icon" aria-label="Delete">
                          <TrashIcon
                            onClick={() => handleDeleteProgram(key.id)}
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete">
                          <EditIcon
                            onClick={() => handleEditProgram(key)}
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
          <ModalHeader>Add a Program</ModalHeader>
          <ModalBody>
            {platformState && platformState.platforms && (
              <Label className="pt-5">
                <span>Platform</span>
                <Select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="mt-1"
                >
                  <option value="">Select a Platform</option>
                  {platformState.platforms.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Select>
              </Label>
            )}
            <Label className="pt-5">
              <span>Name</span>
              <Input
                className="mt-1"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Label>

            <Label className="pt-5">
              <span>Url</span>
              <Input
                className="mt-1"
                placeholder=""
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Label>

            <Label className="pt-5">
              <span>VDP</span>
              <Input
                className="mt-1"
                type="checkbox"
                checked={vdp}
                onChange={(e) => setVdp(e.target.checked)}
              />
            </Label>

            <Label className="pt-5">
              <span>Type</span>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1"
              >
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
                <Button onClick={() => handleUpdateProgram()}>Update</Button>
              ) : (
                <Button onClick={() => handleCreateProgram()}>Add</Button>
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
                  onClick={() => handleUpdateProgram()}
                >
                  Update
                </Button>
              ) : (
                <Button
                  block
                  size="large"
                  onClick={() => handleCreateProgram()}
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

export default Program;
