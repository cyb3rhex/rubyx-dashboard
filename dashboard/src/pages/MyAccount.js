import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changePassword } from '../actions/user'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Button } from '@windmill/react-ui'

function MyAccount() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user)

  const [pass, setPass] = useState("")

  const handleChangePassword = () => {
    setPass("")
    dispatch(changePassword(pass))
  }

  return (
    <>
      <PageTitle>My Account</PageTitle>
      <SectionTitle>Update Password</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Password</span>
          <Input className="mt-1" placeholder="" type="password" value={pass} onChange={(e) => setPass(e.target.value) }/>
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
