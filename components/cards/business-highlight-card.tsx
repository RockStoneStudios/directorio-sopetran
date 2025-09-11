"use client";

import { BusinessState } from '@/utils/types/business'
import { Clock,Globe,Mail,Phone,MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';


export default function BusinessHighlightCard({business} : {business : BusinessState}) {
  
  const handleCopy = (text:string,field : string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copied to clipboard`);
  }
  
  return (
    <div className='space-y-4 p-4 rounded-lg border shadow-md'>
      
       <h2 className='text-xl font-bold'>{business.name}</h2>
        <span className='text-sm text-muted-foreground'>
           Informacion de Negocio
        </span>

        <Button 
          onClick={()=> business.address  && window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            business.address)}`,"_blank", "noopener noreferrer")}
          variant= "outline"
           className='w-full justify-start' >
           <MapPin size={16} />
           <span className='ml-2'>{business.address || "Direccion"}</span>
        </Button>   
        <Button 
            onClick={()=> business.website && window.open(formatUrl(business.website),"_blank", "noopener noreferrer")}
            variant="outline" className='w-full justify-start' >
              <Globe size={16} />
            <span className='ml-2'>{business.website || "Sitio Web"}</span>
        </Button>

        <Button 
        onClick={() => {
            // Copiamos al portapapeles como ya lo tienes
            handleCopy(business.phone, "Phone");

            // Abrimos WhatsApp en otra pestaña
            if (business.phone) {
              const phoneNumber = business.phone.replace(/\D/g, ""); // elimina caracteres no numéricos
              window.open(`https://wa.me/${business.phone}`, "_blank");
            }
          }}
        variant="destructive" className='w-full justify-start'>
           <Phone size={16} />
           <span className='ml-2'>{business.phone || "Whatsapp"}</span>
        </Button>

         <Button variant="outline" className='w-full justify-start'>
           <Mail size={16} />
           <span className='ml-2'>{business.email || "Email"}</span>
        </Button>

         <Button 
            onClick={()=> business.name && window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            business.name)} ${business.address}`,"_blank", "noopener noreferrer")}
            variant="outline" className='w-full justify-start' >
            <Clock size={16}/>
            <span className='ml-2'>{business.hours || "Horas"}</span>

          </Button>  
       
    </div>
  )
}


function formatUrl(url : string) : string {
  if(!url) return "";
  if(!/^https?:\/\//i.test(url)){
    return `http://${url}`;
  }
  return url;
}