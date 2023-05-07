import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, getNotes } from "../actions/notes";
import PageTitle from "../components/Typography/PageTitle";
import { getPrograms } from "../actions/program";
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
} from "@windmill/react-ui";
import Input from "../components/Input";
import ClipLoader from "react-spinners/ClipLoader";
import Select from "react-tailwindcss-select";
import { getProgramName } from "../utils/misc";
import Read from "../components/Notes/Read";
import Add from "../components/Notes/Add";

function Note() {
  const dispatch = useDispatch();
  const noteState = useSelector((state) => state.notes);
  const programState = useSelector((state) => state.program);
  const [currentNote, setCurrentNote] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [seeNote, setSeeNote] = useState(false);
  const [programSelect, setProgramSelect] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState(0);

  const resultsPerPage = 30;
  const totalResults = noteState.total ? noteState.total : 0;

  const handleAddNote = () => {
    setEditMode(false);
    setCurrentNote({});
    setIsModalOpen(true);
  }

  const closeModal = () => {
    if (editMode) {
      setCurrentNote({});
    }

    setIsModalOpen(false);
  }

  const closeSeeNote = () => {
    setCurrentNote({});
    setSeeNote(false);
  }

  useEffect(() => {
    dispatch(getPrograms());
    dispatch(getNotes(1, resultsPerPage, searchTerm, "", 0));
  }, []);

  useEffect(() => {
    let program = filterProgram.value ? filterProgram.value : 0;
    dispatch(getNotes(1, resultsPerPage, searchTerm, "", program));
  }, [searchTerm, filterProgram]);

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

  const handleOpenSeeNote = (note) => {
    setCurrentNote(note);
    setSeeNote(true);
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  function onPageChangeTable(p) {
    let program = filterProgram.value ? filterProgram.value : 0;
    dispatch(getNotes(p, resultsPerPage, searchTerm, "", program));
  }

  return (
    <>
      <PageTitle>Notes</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col md:flex-row justify-center items-center mb-4 space-x-4">
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
          <Button onClick={handleAddNote}>Add</Button>
        </div>

        {noteState.loading && (
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

        {totalResults > 0 ? (
          <TableContainer className={`mb-8 ${noteState.loading && "hidden"}`}>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Title</TableCell>
                  <TableCell>Tag</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {noteState.notes &&
                  noteState.notes.map((key, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span
                          onClick={() => handleOpenSeeNote(key)}
                          className="text-sm"
                        >
                          {key.title}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          onClick={() => handleOpenSeeNote(key)}
                          className="text-sm"
                        >
                          {key.tag}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          onClick={() => handleOpenSeeNote(key)}
                          className="text-sm"
                        >
                          {getProgramName(
                            programState.programs,
                            key.program_id
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Delete">
                            <TrashIcon
                              onClick={() => handleDeleteNote(key.id)}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button layout="link" size="icon" aria-label="Delete">
                            <EditIcon
                              onClick={() => handleEditNote(key)}
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

        <Read
          seeModal={seeNote}
          closeModal={closeSeeNote}
          title={currentNote.title}
          content={currentNote.content}
        />
        <Add
          seeModal={isModalOpen}
          setSeeModal={setIsModalOpen}
          setEditMode={setEditMode}
          closeModal={closeModal}
          editMode={editMode}
          currentNote={currentNote}
          programs={programSelect}
        />
      </div>
    </>
  );
}

export default Note;
