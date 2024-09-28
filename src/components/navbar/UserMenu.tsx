'use client'

import { signUserOut } from '@/app/action/authAction'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from '@nextui-org/react'
import { Session } from 'next-auth'
import Link from 'next/link'

import React from 'react'


type Props = {
  user: Session['user']
}

export default function UserMenu({user}: Props) {
  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          className='transition-transform'
          color='primary'
          name={user?.name || 'user Avatar'}
          size='sm'
          src={user?.image || '/images/user.png'}
        />
      </DropdownTrigger>
      <DropdownMenu variant='flat' aria-label='user action menu'>
        <DropdownSection showDivider>
          <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='Username'>
            Signed in as {user?.name || 'Undefined'}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href='/members/edit'>
          Edit profile
        </DropdownItem>
        <DropdownItem color='danger'>
          <form action={() => signUserOut()}>
            <Button color='danger' type='submit'>
              Log out
            </Button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
