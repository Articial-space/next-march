import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { RiNextjsFill } from 'react-icons/ri'
import NavLink from './NavLink'

export default function TopNav() {
  return (
    <Navbar maxWidth='xl' 
    className='bg-gradient-to-r from-blue-400 to-blue-700' 
    classNames={{item : [
        'text-base',
        'text-white',
        'uppercase',
        'data-[active=true]:text-yellow-200'
    ]}}>
        <NavbarBrand as={Link} href='/'>
            <RiNextjsFill size={40}/>
            <NavbarItem className='text-2xl font-bold'>
                <span>DEMO</span>
                <span className='text-black'>JS</span>
            </NavbarItem>
            
        </NavbarBrand>
        <NavbarContent justify='center'>
            <NavLink href='/members' label='Members'/>
            <NavLink href='/lists' label='Lists'/>
            <NavLink href='/messages' label='Message'/>
        </NavbarContent>
        <NavbarContent justify='end'>
            <NavbarItem className='space-x-3'>
                <Button as={Link} href='/login' color='primary' variant='bordered' className='text-white font-bold'>
                    Login
                </Button>
                <Button as={Link} href='/register' color='primary' variant='bordered' className='text-white font-bold'>
                    Register
                </Button>
            </NavbarItem>
        </NavbarContent>
    </Navbar>
  )
}
