import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Select,
} from "@windmill/react-ui";
import { useDispatch } from "react-redux";
import { createProgram, updateProgram } from "../../actions/program";
import Input from "../Input";

function Add({
  seeModal,
  setSeeModal,
  closeModal,
  editMode,
  setEditMode,
  currentProgram,
  platforms,
  resultsPerPage,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("public");
  const [platform, setPlatform] = useState();
  const [vdp, setVdp] = useState(false);

  useEffect(() => {
    if (editMode) {
      setName(currentProgram.name);
      setType(currentProgram.type);
      setPlatform(currentProgram.platform);
      setUrl(currentProgram.url);
      setVdp(currentProgram.vdp);
    } else {
      setName("");
      setType("public");
      setPlatform(0);
      setUrl("");
      setVdp(false);
    }
  }, [editMode]);

  const handleCreateProgram = () => {
    setSeeModal(false);

    dispatch(createProgram(parseInt(platform), name, url, type, vdp, resultsPerPage));

    setName("");
    setType("public");
    setPlatform(0);
    setUrl("");
    setVdp(false);
  };

  const handleUpdateProgram = () => {
    setSeeModal(false);
    setEditMode(false);

    dispatch(
      updateProgram(parseInt(currentProgram.id), parseInt(platform), name, url, type, vdp, resultsPerPage)
    );

    setName("");
    setType("public");
    setPlatform(0);
    setUrl("");
    setVdp(false);
  };

  return (
    <Modal isOpen={seeModal} onClose={closeModal}>
      <ModalHeader>Add a Program</ModalHeader>
      <ModalBody>
        {platforms && (
          <Label className="pt-5">
            <span>Platform</span>
            <Select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select a Platform</option>
              {platforms.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
          </Label>
        )}
        <Label className="pt-5">
          <span>Name</span>
          <Input
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>

        <Label className="pt-5">
          <span>Url</span>
          <Input
            placeholder=""
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Label>

        <Label className="pt-5">
          <span>VDP</span>
          <input
            type="checkbox"
            checked={vdp}
            onChange={(e) => setVdp(e.target.checked)}
          />
        </Label>

        <Label className="pt-5">
          <span>Type</span>
          <Select
            value={type}
            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setType(e.target.value)}
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
            <Button block size="large" onClick={() => handleUpdateProgram()}>
              Update
            </Button>
          ) : (
            <Button block size="large" onClick={() => handleCreateProgram()}>
              Add
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default Add;
