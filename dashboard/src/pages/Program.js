import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createProgram,
  deleteProgram,
  getPrograms,
  reloadPrograms,
  updateProgram,
  getScope,
} from "../actions/program";
import { createScan } from "../actions/scan";
import PageTitle from "../components/Typography/PageTitle";
import { TrashIcon, EditIcon, SearchIcon, ButtonsIcon } from "../icons";
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
import { getPlatforms } from "../actions/platform";
import { AiFillSecurityScan } from "react-icons/ai";
import { TbReload } from "react-icons/tb";
import ClipLoader from "react-spinners/ClipLoader";

function Program() {
  const dispatch = useDispatch();
  const programState = useSelector((state) => state.program);
  const platformState = useSelector((state) => state.platform);
  const [allPrograms, setAllPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("public");
  const [platform, setPlatform] = useState();
  const [vdp, setVdp] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [domain, setDomain] = useState("");
  const [scanType, setScanType] = useState("passive");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seeScope, setSeeScope] = useState(false);
  const [launchScan, setLaunchScan] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleCreateScan = () => {
    setLaunchScan(false);

    dispatch(createScan(domain, scanType));

    setDomain("");
  };

  const handleSetScan = (url) => {
    setDomain(url);
    setLaunchScan(true);
  };

  const handleGetScope = (id) => {
    dispatch(getScope(id));
    setSeeScope(true);
  };

  const handleReloadPrograms = () => {
    dispatch(reloadPrograms());
  };

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

    dispatch(
      updateProgram(parseInt(editId), parseInt(platform), name, url, type, vdp)
    );

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
  const resultsPerPage = 30;
  const totalResults = allPrograms ? allPrograms.length : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  const getPlatformName = (id) => {
    if (platformState && platformState.platforms) {
      var potential = platformState.platforms.find(
        (item) => item.id === parseInt(id)
      );
      if (potential) {
        return potential.name;
      } else {
        return "";
      }
    }
  };

  const handleFilterSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setAllPrograms(programState.programs);
    }
    setAllPrograms(
      programState.programs.filter((program) =>
        program.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setAllPrograms(programState.programs);
  }, [programState]);

  useEffect(() => {
    setDataTable(
      allPrograms &&
        allPrograms.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, allPrograms]);

  return (
    <>
      <PageTitle>Programs</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-between">
          <div className="flex-1 lg:mr-32">
            <div className="py-3 relative w-full max-w-xl mr-6 focus-within:text-purple-500">
              <Input
                className="pl-10 text-gray-700"
                placeholder="Search for programs"
                aria-label="Search"
                onChange={(e) => handleFilterSearch(e)}
              />
            </div>
          </div>

          <div className="py-3 justify-end space-x-4">
            {programState.loading ? (
              <ClipLoader
                color={"#355dad"}
                loading={true}
                size={30}
                aria-label="Loading"
                data-testid="loader"
              />
            ) : (
              <Button
                className="bg-blue-900"
                onClick={() => handleReloadPrograms()}
              >
                <TbReload className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {totalResults > 0 ? (
          <div className="overflow-x-auto">
            <TableContainer className="mb-8 w-full sm:w-auto">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>Name</TableCell>
                    <TableCell className="hidden sm:table-cell">Type</TableCell>
                    <TableCell>Scope</TableCell>
                    <TableCell>Platform</TableCell>
                    <TableCell>Actions</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {dataTable &&
                    dataTable.map((key, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <a
                            className="text-sm truncate text-ellipsis overflow-hidden"
                            href={key.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {key.name}
                          </a>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-sm">
                            {key.type === "public" ? "Public" : "Private"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center space-x-4">
                            <Button
                              layout="link"
                              size="icon"
                              aria-label="See Scope"
                            >
                              <AiFillSecurityScan
                                onClick={() => handleGetScope(key.id)}
                                className="w-5 h-5"
                              />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {getPlatformName(key.platform_id)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <Button
                              layout="link"
                              size="icon"
                              aria-label="Delete"
                            >
                              <TrashIcon
                                onClick={() => handleDeleteProgram(key.id)}
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </Button>
                            <Button
                              layout="link"
                              size="icon"
                              aria-label="Delete"
                            >
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
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-sm">No data to display</span>
          </div>
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
                  className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Label>

            <Label className="pt-5">
              <span>Url</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Label>

            <Label className="pt-5">
              <span>VDP</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

        <Modal isOpen={seeScope} onClose={() => setSeeScope(false)}>
          <ModalHeader>Scope</ModalHeader>
          <ModalBody>
            {programState.loadingScope ? (
              <div className="flex items-center justify-center">
                <ClipLoader
                  color={"#355dad"}
                  loading={true}
                  size={30}
                  aria-label="Loading"
                  data-testid="loader"
                />
              </div>
            ) : (
              <TableContainer className="mb-8">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell>Scope</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Actions</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {programState.scope &&
                      programState.scope.map((key, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <span className="text-sm">{key.scope}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{key.scope_type}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center space-x-4">
                              <Button
                                layout="link"
                                size="icon"
                                aria-label="Scan"
                              >
                                <AiFillSecurityScan
                                  onClick={() => handleSetScan(key.scope)}
                                  className="w-5 h-5"
                                />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={() => setSeeScope(false)}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button
                block
                size="large"
                layout="outline"
                onClick={() => setSeeScope(false)}
              >
                Cancel
              </Button>
            </div>
          </ModalFooter>
        </Modal>

        <Modal isOpen={launchScan} onClose={() => setLaunchScan(false)}>
          <ModalHeader>Scan this target</ModalHeader>
          <ModalBody>
            <div className="px-4 py-3">
              <Label>
                <span>Domain</span>
                <Input
                  className="mt-1"
                  type="text"
                  value={domain}
                  placeholder="Enter a domain"
                  onChange={(e) => setDomain(e.target.value)}
                />
              </Label>
              <Label className="pt-5">
                <span>Type</span>
                <Select
                  value={scanType}
                  onChange={(e) => setScanType(e.target.value)}
                  className="mt-1"
                >
                  <option value="passive">Passive Subdomain</option>
                </Select>
              </Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="w-full sm:w-auto" onClick={handleCreateScan}>
              Add Scan
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Program;
