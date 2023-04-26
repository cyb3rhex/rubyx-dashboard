import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNote, deleteNote, getNotes, updateNote } from "../actions/notes";
import PageTitle from "../components/Typography/PageTitle";
import { getPrograms } from "../actions/program";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
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

function Note() {
  const dispatch = useDispatch();
  const noteState = useSelector((state) => state.notes);
  const programState = useSelector((state) => state.program);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [program, setProgram] = useState();
  const [editId, setEditId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [seeNote, setSeeNote] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setEditMode(false);
    setIsModalOpen(true);
  }

  function closeModal() {
    if (editMode) {
      setContent("");
      setTitle("");
      setTag("");
      setProgram("");
    }

    setIsModalOpen(false);
  }

  function closeSeeNote() {
    setContent("");
    setTitle("");
    setTag("");
    setProgram("");
    setSeeNote(false);
  }

  useEffect(() => {
    dispatch(getPrograms());
    dispatch(getNotes());
  }, []);

  const handleCreateNote = () => {
    setIsModalOpen(false);

    let note = {
      title: title,
      content: content,
      program_id: parseInt(program),
      tag: tag,
    };

    dispatch(createNote(note));

    setTitle("");
    setContent("");
    setTag("");
  };

  const getProgramName = (id) => {
    if (programState && programState.programs) {
      var potential = programState.programs.find(
        (item) => item.id === parseInt(id)
      );
      if (potential) {
        return potential.name;
      } else {
        return "";
      }
    }
  };

  const openSeeNote = (note) => {
    setContent(note.content);
    setTitle(note.title);
    setTag(note.tag);
    setProgram(note.program_id);
    setSeeNote(true);
  };

  const handleUpdateNote = () => {
    setIsModalOpen(false);
    setEditMode(false);

    dispatch(
      updateNote(parseInt(editId), title, parseInt(program), content, tag)
    );

    setTitle("");
    setContent("");
    setTag("");
    setEditId(0);
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setProgram(note.program_id);
    setTag(note.tag);
    setEditId(note.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = noteState.notes ? noteState.notes.length : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  useEffect(() => {
    setDataTable(
      noteState.notes &&
        noteState.notes.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, noteState]);

  return (
    <>
      <PageTitle>Notes</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Button onClick={openModal}>Add a Note</Button>
        </div>

        {totalResults > 0 && (
          <TableContainer className="mb-8">
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
                {dataTable &&
                  dataTable.map((key, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span
                          onClick={() => openSeeNote(key)}
                          className="text-sm"
                        >
                          {key.title}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          onClick={() => openSeeNote(key)}
                          className="text-sm"
                        >
                          {key.tag}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          onClick={() => openSeeNote(key)}
                          className="text-sm"
                        >
                          {getProgramName(key.program_id)}
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
        )}

        <Modal isOpen={seeNote} onClose={closeSeeNote}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <div data-color-mode="light">
              <MDEditor.Markdown
                source={content}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeSeeNote}>
                Close
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button
                block
                size="large"
                layout="outline"
                onClick={closeSeeNote}
              >
                Cancel
              </Button>
            </div>
          </ModalFooter>
        </Modal>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Add a Note</ModalHeader>
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
              <span>Title</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Label>
            <Label className="pt-5">
              <span>Tag</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </Label>
            <Label className="pt-5">
              <span>Content</span>
              <div data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={setContent}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                />
              </div>
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
                <Button onClick={() => handleUpdateNote()}>Update</Button>
              ) : (
                <Button onClick={() => handleCreateNote()}>Add</Button>
              )}
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              {editMode ? (
                <Button block size="large" onClick={() => handleUpdateNote()}>
                  Update
                </Button>
              ) : (
                <Button block size="large" onClick={() => handleCreateNote()}>
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

export default Note;
