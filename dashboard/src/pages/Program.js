import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProgram,
  getPrograms,
  reloadPrograms,
  getScope,
  favouriteProgram,
} from "../actions/program";
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
  Button,
  Pagination,
  Select,
} from "@windmill/react-ui";
import Input from "../components/Input";
import { getPlatforms } from "../actions/platform";
import {
  AiFillSecurityScan,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { TbReload, TbPlus } from "react-icons/tb";
import ClipLoader from "react-spinners/ClipLoader";
import { getPlatformName } from "../utils/misc";
import Scope from "../components/Program/Scope";
import Add from "../components/Program/Add";

function Program() {
  const dispatch = useDispatch();
  const programState = useSelector((state) => state.program);
  const platformState = useSelector((state) => state.platform);

  const [seeScope, setSeeScope] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentProgram, setCurrentProgram] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPlatform, setFilterPlatform] = useState(0);

  const resultsPerPage = 30;

  function onPageChangeTable(p) {
    dispatch(
      getPrograms(p, resultsPerPage, searchTerm, filterType, filterPlatform)
    );
  }

  useEffect(() => {
    dispatch(
      getPrograms(1, resultsPerPage, searchTerm, filterType, filterPlatform)
    );
  }, [searchTerm, filterType, filterPlatform]);

  function closeModal() {
    setEditMode(false);
    setCurrentProgram({});
    setIsModalOpen(false);
  }

  const handleGetScope = (id) => {
    dispatch(getScope(id));
    setSeeScope(true);
  };

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getPrograms());
  }, []);

  const handleEditProgram = (program) => {
    setCurrentProgram(program);
    setEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <>
      {seeScope ? (
        <Scope setSeeScope={setSeeScope} programState={programState} />
      ) : (
        <>
          <PageTitle>Programs</PageTitle>

          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex flex-col md:flex-row justify-center items-center mb-4 space-x-4">
              <Input
                className="text-gray-700"
                placeholder="Search for programs"
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

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

              <Select
                onChange={(e) => setFilterType(e.target.value)}
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Select>

              <Button
                className="bg-blue-900"
                onClick={() => setIsModalOpen(true)}
              >
                <TbPlus className="w-5 h-5" />
              </Button>

              <Button
                className="bg-blue-900"
                onClick={() => dispatch(reloadPrograms())}
              >
                <TbReload className="w-5 h-5" />
              </Button>
            </div>

            {programState.loading && (
              <div className="flex items-center justify-center">
                <ClipLoader
                  color={"#355dad"}
                  loading={true}
                  size={30}
                  aria-label="Loading"
                  data-testid="loader"
                />
              </div>
            )}

            {programState.total && programState.total > 0 ? (
              <TableContainer
                className={`mb-8 ${programState.loading && "hidden"}`}
              >
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
                    {programState.programs &&
                      programState.programs.map((key, i) => (
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
                              {getPlatformName(
                                platformState.platforms,
                                key.platform_id
                              )}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-4">
                              <Button
                                layout="link"
                                size="icon"
                                aria-label="Favourite"
                              >
                                {key.favourite ? (
                                  <AiFillHeart
                                    onClick={() =>
                                      dispatch(
                                        favouriteProgram(key.id, resultsPerPage)
                                      )
                                    }
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <AiOutlineHeart
                                    onClick={() =>
                                      dispatch(
                                        favouriteProgram(key.id, resultsPerPage)
                                      )
                                    }
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </Button>
                              <Button
                                layout="link"
                                size="icon"
                                aria-label="Delete"
                              >
                                <TrashIcon
                                  onClick={() =>
                                    dispatch(
                                      deleteProgram(key.id, resultsPerPage)
                                    )
                                  }
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
                    totalResults={programState.total ? programState.total : 0}
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

            <Add
              seeModal={isModalOpen}
              setSeeModal={setIsModalOpen}
              closeModal={closeModal}
              editMode={editMode}
              setEditMode={setEditMode}
              currentProgram={currentProgram}
              platforms={platformState.platforms}
              resultsPerPage={resultsPerPage}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Program;
