import React from 'react'
import { Menubar,MenubarMenu,MenubarTrigger} from '@/components/ui/menubar';
import ModeToggle from './mode-toggle';
import Image from 'next/image';
import Link from 'next/link';
import {LayoutDashboard,Plus,LogIn,ShieldCheck,Handshake} from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server';
import { SignInButton,SignedIn,SignedOut,UserButton } from '@clerk/nextjs';
import {Toaster} from 'react-hot-toast';
import AddBusinessButton from '../buttons/add-business-buttons';
import SearchButton from '../buttons/search-buttons';

export default async function TopNav() {
  
     const user = await currentUser();
     const isAdmin = user?.privateMetadata?.role === "admin";
     console.log('is Admin = '+user?.privateMetadata?.role);
     return (
        <>
        <Menubar>
            <div className='flex-none my-15 p-1'>
                <MenubarMenu>
                 <Link href="/">
                   <Image 
                    src="/images/escudo.png" 
                    alt='logo'
                    height={37}
                    width={37}
                    className='hover:cursor-pointer'
                    />
                 </Link>
                </MenubarMenu>
            </div>
           
            <div className='hidden md:flex flex-grow justify-center px-4 max-w-3xl'>
                <SearchButton />
            </div>

             <div className='flex flex-grow items-center justify-end gap-1'>
                  <MenubarMenu>
                        <MenubarTrigger className='text-base font-normal'>
                           <span className='flex items-center'>
                                <Handshake size={16} className='mr-1'/>
                                <Link href="/businesses">
                                <span className='text-sm'>Negocios</span>
                                </Link>
                           </span>
                        </MenubarTrigger>
                    
                    </MenubarMenu>
                <AddBusinessButton/>
                
                {user && (
                     <MenubarMenu>
                        <MenubarTrigger className='text-base font-normal'>
                           <span className='flex items-center'>
                                <LayoutDashboard size={16} className='mr-2'/>
                                <Link href="/businesses">
                                <span className='text-xs'>Panel</span>
                                </Link>
                           </span>
                        </MenubarTrigger>
                    
                    </MenubarMenu>
                        )
                }

                 
                {isAdmin && (
                     <MenubarMenu>
                        <MenubarTrigger className='text-base font-normal'>
                           <span className='flex items-center'>
                                <ShieldCheck size={16} className='mr-1'/>
                                <Link href="/dashboard/admin">
                                <span className='text-xs md:text-sm'>Admin</span>
                                </Link>
                           </span>
                        </MenubarTrigger>
                    
                    </MenubarMenu>
                        )
                }




                    <SignedOut>
                        <span className='flex items-center'>
                        <LogIn size={16}  className='mr-1'/>
                        <SignInButton/>
                        </span>
                    </SignedOut>

                    <SignedIn>
                        <UserButton/>
                    </SignedIn>

                    <MenubarMenu >
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
