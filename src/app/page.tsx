'use client'
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";


export default function Home() {
  return (
    <div className="flex">
      <h1 className="text-3xl">Hello World!</h1>
      <Button as={Link} href="/members" color="primary" startContent={<FaRegSmile size={20}/>}>Click Me!</Button>
    </div>
  );
}
