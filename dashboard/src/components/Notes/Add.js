import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from "@windmill/react-ui";
import { createNote, updateNote } from "../../actions/notes";
import { useDispatch } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import Select from "react-tailwindcss-select";
import Input from "../Input";

function Add({
  seeModal,
  setSeeModal,
  closeModal,
  editMode,
  setEditMode,
  currentNote,
  programs,
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [program, setProgram] = useState();

  useEffect(() => {
    if (editMode) {
      setTitle(currentNote.title ? currentNote.title : "");
      setContent(currentNote.content ? currentNote.content : "");
      setTag(currentNote.tag ? currentNote.tag : "");
      setProgram(currentNote.program_id ? currentNote.program_id : "");
    } else {
      setTitle("");
      setContent("");
      setTag("");
      setProgram("");
    }
  }, [editMode]);

  const handleCreateNote = () => {
    setSeeModal(false);

    let note = {
      title: title,
      content: content,
      program_id: parseInt(program.value),
      tag: tag,
    };

    dispatch(createNote(note));

    setTitle("");
    setContent("");
    setTag("");
  };

  const handleUpdateNote = () => {
    setSeeModal(false);
    setEditMode(false);

    dispatch(
      updateNote(
        parseInt(currentNote.id),
        title,
        parseInt(program.value),
        content,
        tag
      )
    );

    setTitle("");
    setContent("");
    setTag("");
  };

  return (
    <Modal isOpen={seeModal} onClose={closeModal}>
      <ModalHeader>Add a Note</ModalHeader>
      <ModalBody>
        {programs && (
          <Label className="pt-5">
            <span>Program</span>
            <Select
              value={program}
              isSearchable={true}
              placeholder="Program"
              onChange={(e) => setProgram(e)}
              options={programs}
            />
          </Label>
        )}
        <Label className="pt-5">
          <span>Title</span>
          <Input
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Label>
        <Label className="pt-5">
          <span>Tag</span>
          <Input
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
  );
}

export default Add;
