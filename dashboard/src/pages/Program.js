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
import { TbReload, TbPlus, TbArrowBack } from "react-icons/tb";
import ClipLoader from "react-spinners/ClipLoader";
import _ from "lodash";

function Program() {
  const dispatch = useDispatch();
  const programState = useSelector((state) => state.program);
  const platformState = useSelector((state) => state.platform);
  const [allPrograms, setAllPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("public");
  const [platform, setPlatform] = useState();
  const [vdp, setVdp] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seeScope, setSeeScope] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(30);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    let filtered = programState.programs;

    if (searchTerm !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    if (filterPlatform !== "all") {
      filtered = filtered.filter(
        (item) => item.platform_id === parseInt(filterPlatform)
      );
    }

    setTotalResults(filtered.length);
    setAllPrograms(filtered);
  }, [programState.programs, searchTerm, filterType, filterPlatform]);

  function closeModal() {
    setIsModalOpen(false);
  }

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
      {seeScope ? (
        <>
          <PageTitle>Scope</PageTitle>
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-between">
              <div className="py-3 justify-start space-x-4">
                <Button
                  className="bg-blue-900"
                  onClick={() => setSeeScope(false)}
                >
                  <TbArrowBack className="w-5 h-5" />
                </Button>
              </div>
            </div>
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
          </div>
        </>
      ) : (
        <>
          <PageTitle>Programs</PageTitle>

          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex flex-col justify-between">
              <div className="flex-2">

                  <Input
                    className="text-gray-700"
                    placeholder="Search for programs"
                    aria-label="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
  
              </div>
              <div className="flex-2">
                  <Select
                    onChange={(e) => setFilterPlatform(e.target.value)}
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="all">All Platforms</option>
                    {platformState.platforms &&
                      platformState.platforms.map((platform) => (
                        <option key={platform.id} value={platform.id}>
                          {platform.name}
                        </option>
                      ))}
                  </Select>
              </div>

              <div className="flex-2">
                  <Select
                    onChange={(e) => setFilterType(e.target.value)}
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </Select>
              </div>

              <div className="py-3 justify-end space-x-4">
                <Button
                  className="bg-blue-900"
                  onClick={() => setIsModalOpen(true)}
                >
                  <TbPlus className="w-5 h-5" />
                </Button>
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
                        <TableCell className="hidden sm:table-cell">
                          Type
                        </TableCell>
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
                    <Button onClick={() => handleUpdateProgram()}>
                      Update
                    </Button>
                  ) : (
                    <Button onClick={() => handleCreateProgram()}>Add</Button>
                  )}
                </div>
                <div className="block w-full sm:hidden">
                  <Button
                    block
                    size="large"
                    layout="outline"
                    onClick={closeModal}
                  >
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
      )}
    </>
  );
}

export default Program;
