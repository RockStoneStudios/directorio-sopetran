import { BusinessState } from "@/utils/types/business";
import {MapPin,Phone,Mail,Globe,Clock,ShieldCheck} from 'lucide-react';
import { DescriptionCard } from "./description-card";
import {Card, CardContent ,CardHeader,CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";


export default function SingleBusinessPage ({business} : {business:BusinessState}){
  return (
    <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <div className="w-16 h-16 relative overflow-hidden rounded-md">
               {business?.logo ? (
                  <Image 
                  src={business?.logo}
                  alt={`${business?.name}`}
                  layout="fill"
                  objectFit="cover"
                  />
               ):(
                 <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                     <span className="text-gray-500 text-sm">No Logo</span>
                 </div>
               )}
            </div>

            <div className="flex-1 min-w-0">
               <CardTitle className="text-lg line-clamp-1">{business?.name || "Nombre de Negocio"} </CardTitle>
               <p className="text-sm text-muted-foreground line-clamp-1">{business?.category || "Categoria"}</p>
            </div>
        </CardHeader>
        <CardContent>
           <DescriptionCard description={business?.description} />
             <div className="flex justify-end space-x-3 mt-2">
                       {business?.instagram && (
                         <a
                           href={business.instagram}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="hover:text-pink-600 text-2xl"
                         >
                           <IoLogoInstagram />
                         </a>
                       )}
                       {business?.facebook && (
                         <a
                           href={business.facebook}
                           target="_blank"
                           rel="noopener noreferrer"
                           className=" hover:text-blue-700 text-2xl"
                         >
                           <FaFacebookSquare />
                         </a>
                       )}
                     </div>
        </CardContent>
    </Card>
  )
}

