import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubdomains, getUniqueTechnologies } from "../actions/subdomain";
import PageTitle from "../components/Typography/PageTitle";
import { AiFillSecurityScan } from "react-icons/ai";
import ModalImage from "react-modal-image";
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
} from "@windmill/react-ui";
import ClipLoader from "react-spinners/ClipLoader";
import Input from "../components/Input";
import { getPrograms } from "../actions/program";
import Select from "react-tailwindcss-select";
import { getProgramName } from "../utils/misc";
import Url from "../components/Subdomain/Url";

function Subdomain() {
  const dispatch = useDispatch();
  const subdomainState = useSelector((state) => state.subdomain);
  const programState = useSelector((state) => state.program);

  const [seeUrls, setSeeUrls] = useState(false);
  const [url, setUrl] = useState("");

  const [programSelect, setProgramSelect] = useState([]);
  const [technologiesSelect, setTechnologiesSelect] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState(0);
  const [filterTechnology, setFilterTechnology] = useState([]);

  const resultsPerPage = 30;

  function onPageChangeTable(p) {
    let technologies = filterTechnology
      ? filterTechnology.map((option) => option.value).join(",")
      : "";
      let program = filterProgram.value ? filterProgram.value : 0;
    dispatch(
      getSubdomains(
        p,
        resultsPerPage,
        searchTerm,
        program,
        technologies
      )
    );
  }

  useEffect(() => {
    dispatch(getPrograms());
    dispatch(getUniqueTechnologies());
    dispatch(
      getSubdomains(1, resultsPerPage, searchTerm, 0, "")
    );
  }, []);

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
    let technologies = filterTechnology
      ? filterTechnology.map((option) => option.value).join(",")
      : "";
      let program = filterProgram.value ? filterProgram.value : 0;
    dispatch(
      getSubdomains(
        1,
        resultsPerPage,
        searchTerm,
        program,
        technologies
      )
    );
  }, [searchTerm, filterProgram, filterTechnology]);

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

  const handleSeeUrls = (subdomain) => {
    setUrl(subdomain);
    setSeeUrls(true);
  };

  return (
    <>
      {seeUrls ? (
        <Url setSeeUrls={setSeeUrls} url={url} />
      ) : (
        <>
          <PageTitle>Subdomains</PageTitle>

          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center mb-4 space-x-4">
              <Input
                className="text-gray-700"
                placeholder="Search for subdomain"
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Select
                value={filterProgram}
                isSearchable={true}
                placeholder="Filter by program"
                onChange={(e) => setFilterProgram(e)}
                options={programSelect}
              />

              <Select
                value={filterTechnology}
                isSearchable={true}
                isMultiple={true}
                placeholder="Filter by technology"
                onChange={(e) => setFilterTechnology(e)}
                options={technologiesSelect}
              />
            </div>

            {subdomainState.loading && (
              <div className="flex justify-center items-center center">
                <ClipLoader color="#0f172a" loading={true} size={50} />
              </div>
            )}

            {subdomainState.total && subdomainState.total > 0 ? (
              <TableContainer
                className={`mb-8 ${subdomainState.loading && "hidden"}`}
              >
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
                    {subdomainState.subdomains &&
                      subdomainState.subdomains.map((key, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <span className="text-sm">
                              <a href={key.url} target="__blank">
                                {key.url}
                              </a>
                            </span>
                            <br />
                            {key.title !== "" && (
                              <span class="bg-sky-700 text-white text-xs font-medium mr-2 px-4 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                                {key.title}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {getProgramName(
                                programState.programs,
                                key.program_id
                              )}
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
                            {key.technologies !== "" &&
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
                              <ModalImage
                                small={`data:image/png;base64,${key.screenshot}`}
                                medium={`data:image/png;base64,${key.screenshot}`}
                                large={`data:image/png;base64,${key.screenshot}`}
                                className="max-h-14"
                                hideRotateButton={true}
                                hideZoomButton={true}
                                alt={key.url}
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
                      ))}
                  </TableBody>
                </Table>
                <TableFooter>
                  <Pagination
                    totalResults={
                      subdomainState.total ? subdomainState.total : 0
                    }
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
        </>
      )}
    </>
  );
}

export default Subdomain;
