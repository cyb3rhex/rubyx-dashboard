import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword, changeEmail } from "../actions/user";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { Label } from "@windmill/react-ui";
import { Button } from "@windmill/react-ui";

function MyAccount() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (userState.data && userState.data.email) {
      setEmail(userState.data.email);
    }
  }, [userState]);

  const [previousPass, setPreviousPass] = useState("");
  const [previousPassEmail, setPreviousPassEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [email, setEmail] = useState("");

  const handleChangePassword = () => {
    if (
      newPass.length > 0 &&
      previousPass.length > 0 &&
      newPass === confirmNewPass
    ) {
      dispatch(changePassword(previousPass, newPass));
      setPreviousPass("");
      setNewPass("");
      setConfirmNewPass("");
    } else {
      toast.error("Passwords don't match", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
      return;
    }
  };

  const handleChangeEmail = () => {
    dispatch(changeEmail(email, previousPassEmail));
    setEmail("");
    setPreviousPassEmail("");
  };

  return (
    <>
      <PageTitle>My Account</PageTitle>
      <SectionTitle>Update Email</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Email</span>
          <Input
            placeholder=""
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>

        <div className="py-3">
          <Label>
            <span>Password</span>
            <Input
              placeholder=""
              type="password"
              value={previousPassEmail}
              onChange={(e) => setPreviousPassEmail(e.target.value)}
            />
          </Label>
        </div>

        <div className="py-3">
          <Button onClick={() => handleChangeEmail()}>Update</Button>
        </div>
      </div>
      <SectionTitle>Update Password</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Label>
            <span>Previous Password</span>
            <Input
              placeholder=""
              type="password"
              value={previousPass}
              onChange={(e) => setPreviousPass(e.target.value)}
            />
          </Label>
        </div>
        <div className="py-3">
          <Label>
            <span>New Password</span>
            <Input
              placeholder=""
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </Label>
        </div>
        <div className="py-3">
          <Label>
            <span>Confirm Password</span>
            <Input
              placeholder=""
              type="password"
              value={confirmNewPass}
              onChange={(e) => setConfirmNewPass(e.target.value)}
            />
          </Label>
        </div>

        <div className="py-3">
          <Button onClick={() => handleChangePassword()}>Update</Button>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
