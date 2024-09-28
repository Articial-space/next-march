'use client'


import { signOut } from "@/auth";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";
import { signUserOut } from "./action/authAction";



export default function Home() {

  return (
    <div className="flex">
      <h1 className="text-3xl">Hello World!</h1>
      <form action={() => {signUserOut()}}>
        <Button type="submit" color="primary" startContent={<FaRegSmile size={20}/>}>Click Me!</Button>
      </form>
    </div>
  );
}
