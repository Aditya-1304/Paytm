import { BottomWarning } from "../Components/BottomWarning";
import { Heading } from "../Components/Heading";
import { SubHeading } from "../Components/SubHeading";
import { Button } from "../Components/Button";
import { InputBox } from "../Components/InputBox";
import { useState } from "react";
import { axios } from "axios"

export const Signup = () => {
  const [username, setUserName] = useState("")
  const [fisrtName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading lable={"Sign up"} />
        <SubHeading lable={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value)
        }} placeholder="Aditya" label={"First Name"} />
        <InputBox onChange={e => {
          setLastName(e.target.value)
        }} placeholder="Mandal" label={"Last Name"} />
        <InputBox onChange={e => {
          setUserName(e.target.value)
        }} placeholder="Aditya@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={() => {
            axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              fisrtName,
              lastName,
              password
            })
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}