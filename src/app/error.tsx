'use client'

import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import { BiSolidError } from "react-icons/bi"

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
 
  return (
    <div className="flex items-center justify-center vertical-center">
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex gap-2 items-center text-primary-400">
                    <BiSolidError size={30}/>
                    <h1 className="font-semibold text-3xl">Error</h1>
                </div>
            </CardHeader>
            <CardBody>
                <div className="text-danger-200 flex justify-center">
                    {error.message}
                </div>
            </CardBody>
            <CardFooter className="flex justify-center">
                <Button onClick={() => reset()} color="primary" variant="bordered">
                    Try Again
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}