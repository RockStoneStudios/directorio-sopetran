
import React from 'react'
import {
        Menubar,
        MenubarContent,
        MenubarItem,
        MenubarMenu,
        MenubarSeparator,
        MenubarShortcut,
        MenubarTrigger,
        
       } 

from '@/components/ui/menubar';
import ModeToggle from './mode-toggle';
import Image from 'next/image';
import Link from 'next/link';
import {LayoutDashboard,Plus,LogIn,} from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server';
import { SignInButton,SignedIn,SignedOut,UserButton } from '@clerk/nextjs';
import {Toaster} from 'react-hot-toast';
import AddBusinessButton from '../buttons/add-business-buttons';
import SearchButton from '../buttons/search-buttons';

export default async function TopNav() {
  
     const user = await currentUser();
     return (
        <>
        <Menubar>
            <div className='flex-none my-10'>
                <MenubarMenu>
                 <Link href="/">
                   <Image 
                    src="/logo.svg" 
                    alt='logo'
                    height={60}
                    width={60}
                    className='hover:cursor-pointer'
                    />
                 </Link>
                </MenubarMenu>
            </div>
           
            <div className='hidden md:flex flex-grow justify-center px-4 max-w-3xl'>
                <SearchButton />
            </div>

             <div className='flex flex-grow items-center justify-end gap-1'>
                <AddBusinessButton/>
                
                {user && (
                     <MenubarMenu>
                        <MenubarTrigger className='text-base font-normal'>
                           <span className='flex items-center'>
                                <LayoutDashboard size={16} className='mr-2'/>
                                <Link href="/dashboard">
                                <span>Dashboard</span>
                                </Link>
                           </span>
                        </MenubarTrigger>
                    
                    </MenubarMenu>
                        )
                }

                    <SignedOut>
                        <span className='flex items-center'>
                        <LogIn size={16}  className='mr-2'/>
                        <SignInButton/>
                        </span>
                    </SignedOut>

                    <SignedIn>
                        <UserButton/>
                    </SignedIn>

                    <MenubarMenu>
                        <ModeToggle/>
                    </MenubarMenu>
                </div>
                <Toaster/>
        </Menubar>

         <div className='md:hidden w-full flex justify-center px-4 my-1'>
            <SearchButton />
        </div>

        </>
     )
  
}
