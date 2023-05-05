import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createSubdomain,
  deleteSubdomain,
  getSubdomains,
  updateSubdomain,
  getUniqueTechnologies,
} from "../actions/subdomain";
import { createScan } from "../actions/scan";
import { useHistory } from "react-router-dom";
import { getUrls } from "../actions/url";
import PageTitle from "../components/Typography/PageTitle";
import { AiFillSecurityScan } from "react-icons/ai";
import { TbArrowBack } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";
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
} from "@windmill/react-ui";
import ClipLoader from "react-spinners/ClipLoader";
import Input from "../components/Input";
import { getPrograms } from "../actions/program";
import Select from "react-tailwindcss-select";

function Subdomain() {
  const dispatch = useDispatch();
  const subdomainState = useSelector((state) => state.subdomain);
  const programState = useSelector((state) => state.program);
  const urlState = useSelector((state) => state.url);
  const history = useHistory();
  const [seeUrls, setSeeUrls] = useState(false);
  const [url, setUrl] = useState("");
  const [program, setProgram] = useState();
  const [editId, setEditId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
  const [screenshot, setScreenshot] = useState("");
  const [programSelect, setProgramSelect] = useState([]);
  const [technologiesSelect, setTechnologiesSelect] = useState([]);

  const [searchTermUrl, setSearchTermUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState(0);
  const [filterProgramValue, setFilterProgramValue] = useState("");
  const [filterTechnology, setFilterTechnology] = useState([]);

  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [pageTable, setPageTable] = useState(1);
  const totalResults = subdomainState.total ? subdomainState.total : 0;

  const [urlsResultsPerPage, setUrlsResultsPerPage] = useState(50);
  const [urlsPageTable, setUrlsPageTable] = useState(1);
  const [urlsTotalResults, setUrlsTotalResults] = useState(0);

  function onPageChangeTable(p) {
    let technologies = filterTechnology ? filterTechnology.map((option) => option.value).join(',') : "";
    dispatch(getSubdomains(p, resultsPerPage, searchTerm, filterProgramValue, technologies));
    setPageTable(p);
  }

  function onUrlsPageChangeTable(p) {
    dispatch(getUrls(url, p, resultsPerPage, searchTermUrl));
    setUrlsPageTable(p);
  }

  function openModal() {
    setEditMode(false);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openScreenshotModal(image) {
    setScreenshot(image);
    setIsScreenshotModalOpen(true);
  }

  function closeScreenshotModal() {
    setScreenshot("");
    setIsScreenshotModalOpen(false);
  }

  useEffect(() => {
    dispatch(getPrograms());
    dispatch(getUniqueTechnologies());
    dispatch(getSubdomains(1, resultsPerPage, searchTerm, filterProgramValue, ""));
  }, []);

  useEffect(() => {
    setUrlsTotalResults(urlState.total ? urlState.total : 0);
  }, [urlState]);

  useEffect(() => {
    if (subdomainState && subdomainState.uniqueTechnologies) {
      setTechnologiesSelect([
        ...subdomainState.uniqueTechnologies.map((technology) => {
          return { value: technology, label: technology };
        }),
      ]);
    }
  }, [subdomainState]);

  useEffect(() => {
    let technologies = filterTechnology ? filterTechnology.map((option) => option.value).join(',') : "";
    dispatch(getSubdomains(1, resultsPerPage, searchTerm, filterProgramValue, technologies));
  }, [searchTerm, filterProgramValue, filterTechnology]);

  useEffect(() => {
    if (programState && programState.programs) {
      let options = [
        { value: 0, label: "All" },
        ...programState.programs.map((program) => {
          return { value: program.id, label: program.name };
        }),
      ];
      setProgramSelect(options);
    }
  }, [programState]);

  const handleScanUrls = () => {
    let scan = {
      domain: url,
      subdomain: false,
      screenshot: false,
      portScan: false,
      directoryScan: true,
      vulnerabilityScan: false,
      nucleiSeverity: "",
    };

    dispatch(createScan(scan));

    history.push("/app/scan");
  };

  const handleSetFilterTechnology = (e) => {
    setFilterTechnology(e);
  }

  const handleSeeUrls = (subdomain) => {
    setUrl(subdomain);
    setSeeUrls(true);
    dispatch(getUrls(subdomain, 1, urlsResultsPerPage, searchTermUrl));
  };

  useEffect(() => {
    dispatch(getUrls(url, 1, urlsResultsPerPage, searchTermUrl));
  }, [searchTermUrl]);

  const handleCreateSubdomain = () => {
    setIsModalOpen(false);

    dispatch(createSubdomain(parseInt(program.value), url));

    setUrl("");
    setProgram({ value: 0, label: "All" });
  };

  const handleUpdateSubdomain = () => {
    setIsModalOpen(false);
    setEditMode(false);

    dispatch(updateSubdomain(parseInt(editId), parseInt(program), url));

    setUrl("");
    setProgram(0);
    setEditId(0);
  };

  const handleSetFilterProgram = (e) => {
    setFilterProgram(e);
    setFilterProgramValue(e.value);
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

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <>
      {seeUrls ? (
        <>
          <PageTitle>Urls</PageTitle>
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-between">
              <div className="flex-2">
                <Input
                  className="text-gray-700"
                  placeholder="Search for url"
                  aria-label="Search"
                  onChange={(e) => setSearchTermUrl(e.target.value)}
                />
              </div>

              <div className="py-3 justify-start space-x-4">
                <Button
                  className="bg-blue-900"
                  onClick={() => setSeeUrls(false)}
                >
                  <TbArrowBack className="w-5 h-5" />
                </Button>
              </div>
              <div className="py-3 justify-start space-x-4">
                <Button
                  className="bg-blue-900"
                  onClick={() => handleScanUrls()}
                >
                  Scan Urls
                </Button>
              </div>
            </div>

            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>Url</TableCell>
                    <TableCell>Status Code</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {urlState.loading ? (
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
                    urlState.urls &&
                    urlState.urls.map((key, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <span className="text-sm">
                            <a href={key.url} target="_blank">
                              {key.url}
                            </a>
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{key.status_code}</span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={urlsTotalResults}
                  resultsPerPage={urlsResultsPerPage}
                  onChange={onUrlsPageChangeTable}
                  label="Navigation"
                />
              </TableFooter>
            </TableContainer>
          </div>
        </>
      ) : (
        <>
          <PageTitle>Subdomains</PageTitle>

          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex flex-col justify-between">
              <div className="flex-2">
                <Input
                  className="text-gray-700"
                  placeholder="Search for subdomain"
                  aria-label="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-2">
                <Select
                  value={filterProgram}
                  isSearchable={true}
                  placeholder="Filter by program"
                  onChange={(e) => handleSetFilterProgram(e)}
                  options={programSelect}
                />
              </div>

              <div className="flex-2">
                <Select
                  value={filterTechnology}
                  isSearchable={true}
                  isMultiple={true}
                  placeholder="Filter by technology"
                  onChange={(e) => handleSetFilterTechnology(e)}
                  options={technologiesSelect}
                />
              </div>

              <div className="py-3 justify-end space-x-4">
                <Button className="bg-blue-900" onClick={openModal}>
                  <TbPlus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
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
                      <TableCell>Urls</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {subdomainState.loading ? (
                      <div className="flex justify-center items-center center">
                        <ClipLoader color="#0f172a" loading={true} size={50} />
                      </div>
                    ) : totalResults > 0 ? (
                      subdomainState.subdomains &&
                      subdomainState.subdomains.map((key, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <span className="text-sm">
                              <a href={key.url} target="__blank">
                                {key.url}
                              </a>
                            </span>
                            <br />
                            {key.title != "" && (
                              <span class="bg-sky-700 text-white text-xs font-medium mr-2 px-4 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                                {key.title}
                              </span>
                            )}
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
                            <span className="text-sm">
                              {key.content_length}
                            </span>
                          </TableCell>
                          <TableCell>
                            {key.technologies != "" &&
                              key.technologies
                                .split(",")
                                .map(
                                  (tech, i) =>
                                    tech !== "" && (
                                      <span class="bg-sky-700 text-white text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {tech}
                                      </span>
                                    )
                                )}
                          </TableCell>
                          <TableCell>
                            {key.screenshot !== "" ? (
                              <img
                                onClick={() =>
                                  openScreenshotModal(
                                    `data:image/png;base64,${key.screenshot}`
                                  )
                                }
                                src={`data:image/png;base64,${key.screenshot}`}
                                className="cursor-pointer"
                                style={{ width: "200px", height: "100px" }}
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
                              <Button layout="link" size="icon">
                                <AiFillSecurityScan
                                  onClick={() => handleSeeUrls(key.url)}
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="text-sm">No data to display</span>
                      </div>
                    )}
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

            <Modal
              isOpen={isScreenshotModalOpen}
              onClose={closeScreenshotModal}
            >
              <ModalBody style={{ maxHeight: screenSize.height - 300 }}>
                <img
                  src={screenshot}
                  alt="preview"
                  className="object-fill h-48 w-96 p-3"
                />
              </ModalBody>
            </Modal>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <ModalHeader>Add a Subdomain</ModalHeader>
              <ModalBody>
                {programState && programState.programs && (
                  <Label className="pt-5">
                    <span>Program</span>
                    <Select
                      value={program}
                      isSearchable={true}
                      placeholder="Filter by program"
                      onChange={(value) => setProgram(value)}
                      options={programSelect}
                    />
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
                    <Button onClick={() => handleUpdateSubdomain()}>
                      Update
                    </Button>
                  ) : (
                    <Button onClick={() => handleCreateSubdomain()}>Add</Button>
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
      )}
    </>
  );
}

export default Subdomain;
