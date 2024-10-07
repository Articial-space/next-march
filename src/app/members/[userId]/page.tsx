import { getMemberByUserId } from '@/app/action/memberAction'
import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import { notFound } from 'next/navigation'
import React from 'react'

export default async function MemberDetailedPage({params}: {params: {userId: string}}) {
  const member = await getMemberByUserId(params.userId)
  if (!member) return notFound();
  return (
    <>
      <CardHeader className='text-2xl font-semibold text-primary-400'>
        Profile
      </CardHeader>
      <Divider/>
      <CardBody>
        {member.description}
      </CardBody>
    </>
  )
}
