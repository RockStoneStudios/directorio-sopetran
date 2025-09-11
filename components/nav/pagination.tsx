import Link from "next/link";
import { Button } from "../ui/button";
import {ChevronRight,ChevronLeft} from 'lucide-react'
interface BusinessPaginationProps {
    page : number;
    totalPages : number;
}

const Pagination = ({page,totalPages} : BusinessPaginationProps) => {
  return (
     
      <ul className="flex justify-center space-x-2 my-5">
           {page>1 && (
             <li className="page-item">
               <Link href={`?page= ${page-1}`}><ChevronLeft/></Link>
             </li>
           )}
            {Array.from({length : totalPages},(_,index)=>{
              const p = index +1
              return (
                <li key={p}>
                   <Link href={`/?pages${p}`}>
                     <Button variant={`${page == p ? 'secondary' : 'ghost'}`}>
                        {p}
                     </Button>
                   </Link>
                </li>
              )
            })}

            {page< totalPages && (
             <li className="page-item">
               <Link href={`?page= ${page+1}`} >
                <Button variant={"outline"}><ChevronRight/></Button>
               </Link>
             </li>
           )}
      </ul>
      
  )
}

export default Pagination;