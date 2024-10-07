import { calculateAge } from '@/lib/util'
import { Card, CardFooter, Image } from '@nextui-org/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
    member: Member
}

export default function MemberCard({member}: Props) {
  return (
    <Card fullWidth
        as={Link}
        href={`/members/${member.userId}`}
        isPressable
    >
        <Image
            width={300}
            isZoomed
            alt={member.name}
            src={member.image || '/images/user.png'}
            className='aspect-square object-cover'
        />
        <CardFooter className='text-white justify-start absolute overflow-hidden bottom-0 z-10 bg-dark-gradient'>
            <div className='flex flex-col'>
                <span className='font-semibold'>{member.name}, {calculateAge(member.dateOfBirth)}</span>
                <span className='text-sm'>{member.city}</span>
            </div>
        </CardFooter>
    </Card>
  )
}
