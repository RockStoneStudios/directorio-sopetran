'use client';
import { useBusiness } from '@/context/business';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BusinessState } from '@/utils/types/business';
import PreviewCard from '@/components/nav/business/preview/preview-card';
import { Loader2Icon,Send,Brain } from 'lucide-react';
import { usePathname } from 'next/navigation';


interface InputField {
  name : string;
  type : string;
  label : string;
  required? : boolean;
  accept? : string;
};


const inputFields : InputField[] = [
  {
     name : "name",
     label : "Business name",
     type : "text",
     required : true,
  },
  {
     name : "category",
     label : "Categoria (e.j Farmacia, Restaurante)",
     type : "text",
     required : true,
  },

    {
     name : "address",
     label : "Direccion",
     type : "text",
     required : true,
  },
  {
     name : "phone",
     label : "Celular",
     type : "tel",
     required : true,
  },
  {
     name : "email",
     label : "Correo",
     type : "email",
  },
   {
      name :"facebook",
      label : "Facebook",
      type : "url",
      required : false
   },
     {
      name :"instagram",
      label : "Instagram",
      type : "url",
      required : false
   },
    {
      name :"nequi",
      label : "Nequi",
      type : "text",
      required : false
    },
     {
      name :"bancolombia",
      label : "Bancolombia",
      type : "text",
      required : false
    },
  {
     name : "website",
     label : "Website URL",
     type : "url",
  },
  {
     name : "hours",
     label : "Abierto (e.j Lun-Sab 8am - 5pm)",
     type : "text",
  },
   {
     name : "logo",
     label : "Logo Negocio ",
     type : "file",
     accept : "image/*",
  },
  

  

]

function BusinessForm() {
  const {
   business,
   handleChange,
   handleSubmit,
   loading,
   logoUploading,
   generateBusinessDescription,
   generateDescriptionLoading,
   updateBusiness,
   isEditPage
} = useBusiness();


   

  return (
    <div className='flex flex-col lg:flex-row  h-screen'>
       <div className='flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center overflow-y-auto min-h-[354px]'>
         <PreviewCard business={business}/>
       </div>
       <div className='flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex  lg:items-start overflow-y-auto'>
          <h1>Inscribe tu negocio y llega a miles de usuarios</h1>
       
         {inputFields.map((item,index)=>(
           <div key={index} className='my-1 w-full'>
            <label htmlFor={item.name} className='text-xs'>{item.label}</label>
             <Input
               name={item.name}
               type={item.type}
               required={item.required}
               onChange={handleChange}
               value={item.name === "logo" ? "" : ((business[item.name as keyof BusinessState] || "") as string | number)}
               accept={item.accept}
             />
             {logoUploading && item.name === "logo" &&(
              <div className='absolute inset-0 flex items-center justify-center bg-opacity-45 bg-white'>
                 <Loader2Icon className='animate-spin' size={32} />
                 
              </div>
             )}
           </div>
         ))}


    <div className='flex justify-between items-center w-full'>
         <Button 
         variant="destructive"
            onClick={generateBusinessDescription} 
            type='submit'
            className='my-5 '
            disabled = {
               !business?.name || 
               !business?.category ||
                generateDescriptionLoading
               }
            >
           {generateDescriptionLoading? <Loader2Icon className='animate-spin mr-2'/> : <Brain className='mr-2'/>} Generar Descripcion
          </Button>
         <Button 
            onClick={isEditPage ? updateBusiness : handleSubmit} 
            type='submit'
            className='my-5 '
            disabled = {!business?.name || !business?.category || !business?.address || !business.phone || loading || generateDescriptionLoading}
            >
               {loading ? <Loader2Icon className='animate-spin mr-2'/> : <Send className='mr-2'/>} Enviar
          </Button>
         </div>
        
       
       </div>
        
      </div>
  )
}

export default BusinessForm;