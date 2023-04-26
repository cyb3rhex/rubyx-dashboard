import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changePassword, changeEmail } from '../actions/user'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import Input from "../components/Input";
import {  Label } from '@windmill/react-ui'
import { Button } from '@windmill/react-ui'

function MyAccount() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user)

  useEffect(() => {
    if (userState.data && userState.data.email){
      setEmail(userState.data.email)
    }
  }, [userState])

  const [pass, setPass] = useState("")
  const [email, setEmail] = useState("")

  const handleChangePassword = () => {
    dispatch(changePassword(pass))
    setPass("")
  }

  const handleChangeEmail = () => {
    dispatch(changeEmail(email))
    setEmail("")
  }

  return (
    <>
      <PageTitle>My Account</PageTitle>
      <SectionTitle>Update Email</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Email</span>
          <Input className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" type="text" value={email} onChange={(e) => setEmail(e.target.value) }/>
        </Label>

        <div className="py-3">
          <Button onClick={() => handleChangeEmail()}>
            Update
          </Button>
        </div>

      </div>
      <SectionTitle>Update Password</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Password</span>
          <Input className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" type="password" value={pass} onChange={(e) => setPass(e.target.value) }/>
        </Label>

        <div className="py-3">
          <Button onClick={() => handleChangePassword()}>
            Update
          </Button>
        </div>

      </div>


    </>
  )
}

export default MyAccount
