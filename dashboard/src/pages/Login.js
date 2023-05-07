import React, { useEffect, useState, useRef } from "react";
import { login } from "../actions/user";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/Input";
import { Label, Button } from "@windmill/react-ui";

function Login() {
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, pass));
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter" && formRef.current !== null) {
      handleLogin(event);
    }
  };

  useEffect(() => {
    if (userState.token) {
      history.push("/app/dashboard");
    }
  }, [userState]);

  return (
    <div className="flex items-center min-h-screen p-6 bg-zinc-100 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 w-full">
            <div className="w-full">
              <form ref={formRef} onSubmit={(e) => handleLogin(e)}>
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                {userState.error !== "" && (
                  <p className="text-red-700">{userState.error}</p>
                )}
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="email"
                    placeholder="john@doe.com"
                    value={email}
                    onKeyPress={handleInputKeyPress}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="password"
                    placeholder="***************"
                    value={pass}
                    onKeyPress={handleInputKeyPress}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </Label>

                <Button className="mt-4" block onClick={(e) => handleLogin(e)}>
                  Log in
                </Button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
