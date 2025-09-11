'use client';
import React, { useEffect, useState } from 'react'
import {Moon,Sun} from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';



export default function ModeToggle(){
    //state
    const [mounted,setMounted] = useState(false);
    const {theme,setTheme} = useTheme();

    useEffect(()=>{
      setMounted(true);
    },[]);

    if(!mounted) return null;
    return (
       
     <Button variant="link" size="icon" onClick={()=> setTheme(theme === "dark" ?  "llight" : "dark")}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18}/>}
     </Button>
   
    )

}