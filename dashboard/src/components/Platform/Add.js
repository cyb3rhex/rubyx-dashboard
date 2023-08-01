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
import { createPlatform, updatePlatform } from "../../actions/platform";
import Input from "../Input";

function Add({
  seeModal,
  setSeeModal,
  closeModal,
  editMode,
  setEditMode,
  currentPlatform,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("yeswehack");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [type, setType] = useState("public");

  useEffect(() => {
    if (editMode) {
      setName(currentPlatform.name);
      setEmail(currentPlatform.email);
      setPassword("");
      setOtp("");
      setType(currentPlatform.type);
    } else {
      setName("yeswehack");
      setType("public");
      setEmail("");
      setPassword("");
      setOtp("");
    }
  }, [editMode, currentPlatform]);

  const handleCreatePlatform = () => {
    setSeeModal(false);

    dispatch(createPlatform(name, email, password, otp, type));

    setName("yeswehack");
    setType("public");
    setEmail("");
    setPassword("");
    setOtp("");
  };

  const handleUpdatePlatform = () => {
    setSeeModal(false);
    setEditMode(false);

    dispatch(
      updatePlatform(
        parseInt(currentPlatform.id),
        name,
        email,
        password,
        otp,
        type
      )
    );

    setName("yeswehack");
    setType("public");
    setEmail("");
    setPassword("");
    setOtp("");
  };

  return (
    <Modal isOpen={seeModal} onClose={closeModal}>
      <ModalHeader>Add a Platform</ModalHeader>
      <ModalBody>
        <Label className="pt-5">
          <span>Name</span>
          <Select
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="yeswehack">YesWeHack</option>
            <option value="hackerone">HackerOne</option>
          </Select>
        </Label>

        {name === "yeswehack" && (
          <>
            <Label className="pt-5">
              <span>Email</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>

            <Label className="pt-5">
              <span>Password</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Label>

            <Label className="pt-5">
              <span>TOTP Code</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Label>
          </>
        )}

        {name === "hackerone" && (
          <>
            <Label className="pt-5">
              <span>Username</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>

            <Label className="pt-5">
              <span>API Key</span>
              <Input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Label>
          </>
        )}

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
            <Button onClick={() => handleUpdatePlatform()}>Update</Button>
          ) : (
            <Button onClick={() => handleCreatePlatform()}>Add</Button>
          )}
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          {editMode ? (
            <Button block size="large" onClick={() => handleUpdatePlatform()}>
              Update
            </Button>
          ) : (
            <Button block size="large" onClick={() => handleCreatePlatform()}>
              Add
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default Add;
