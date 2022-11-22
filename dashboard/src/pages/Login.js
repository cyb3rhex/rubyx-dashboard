import React, { useEffect, useState } from 'react'
import { login } from '../actions/user'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Label, Input, Button } from '@windmill/react-ui'

function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const userState = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(login(email, pass))
  }

  useEffect(() => {
    console.log(userState)
    if (userState.token) {
      history.push("/app/dashboard")
    }
  }, [userState])

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 w-full">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              {userState.error != "" && (<p className='text-red-700'>{userState.error}</p>)}
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" placeholder="***************" value={pass} onChange={(e) => setPass(e.target.value)} />
              </Label>

              <Button className="mt-4" block onClick={() => handleLogin()}>
                Log in
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
