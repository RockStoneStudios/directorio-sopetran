'use client';
import { BusinessState } from "@/utils/types/business";
import React, {createContext,useContext,useState,useEffect,ReactNode} from "react";
import { useClerk,useUser } from "@clerk/nextjs";
import { 
     saveBusinessToDb,
     getUserBusinessFromDb,
     getBusinessFromDb,
     updateBusinessInDb,
     togglePublishInDb,
     deleteBusinessFromDb
     } from "@/actions/business";
import toast from "react-hot-toast";
import { useRouter, usePathname, useParams } from "next/navigation";
import { handleLogoAction } from "@/actions/cloudinary";
import {aiGenerateBusinessDescription} from '@/actions/ai';


const initialState : BusinessState = {
    _id : "",
    userEmail : "",
    name : "",
    category : "",
    description: "",
    address: "",
    phone : "",
    email : "",
    website :"",
    instagram : "",
    facebook : "",
    hours : "",
    logo : "",
    slug : "",
    nequi : "",
    bancolombia: "",
    createdAt : "",
    updatedAt : "",
    __v : 0,
};

interface BusinessContextType{
    business : BusinessState;
    setBusiness : React.Dispatch<React.SetStateAction<BusinessState>>;
    loading : boolean;
    setLoading : React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    businesses : BusinessState[];
    setBusinesses : React.Dispatch<React.SetStateAction<BusinessState[]>>; 
    initialState : BusinessState;
    logoUploading : boolean,
    isDashboardPage : boolean;
    generateBusinessDescription: () => void;
    generateDescriptionLoading : boolean;
    updateBusiness : () => void;
    isEditPage : boolean,
    openDescriptionModal : boolean;
    setOpenDescriptionModal : React.Dispatch<React.SetStateAction<boolean>>;
    togglePublished : () => void;
    deleteBusiness : () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(
    undefined
);


export const BusinessProvider : React.FC<{children: ReactNode}> = ({children}) =>{
    const [business,setBusiness] = useState<BusinessState>(initialState);
    const [loading,setLoading] = useState<boolean>(false);
    const [businesses,setBusinesses] = useState<BusinessState[]>([]);
    const [logoUploading,setLogoUploading] = useState<boolean>(false);
    const [generateDescriptionLoading,setGenerateDescriptionLoading] = useState<boolean>(false);
    const [openDescriptionModal,setOpenDescriptionModal] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const {_id} = useParams();


    const {openSignIn} = useClerk();
    const {isSignedIn} = useUser();

    const isDashboardPage = pathname == "/dashboard";
    const isEditPage = pathname.includes("/edit");

    useEffect(()=>{
        const savedBusiness = localStorage.getItem("business");
        if(savedBusiness){
            setBusiness(JSON.parse(savedBusiness));
        }
    },[]);


    useEffect(()=>{
       if(isDashboardPage){
          getUserBusinesses();
       }
    },[isDashboardPage]);

    useEffect(()=>{
      if(_id){
        getBusiness();
      }
    },[_id])

     

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value,files} = event.target;
        if(name === "logo" && files && files[0]){
            await handleLogo(files,name);
        }else {
             setBusiness((prevBusiness: BusinessState)=> {
          const updatedBusiness = {...prevBusiness,[name] : value};
          //Save to Local Storage
          localStorage.setItem("business",JSON.stringify(updatedBusiness));


          return updatedBusiness;
        });
       
        }
    }

    const handleLogo = async (files:FileList,name : string) => {
        const file = files[0];
        setLogoUploading(true);
        //convert image to base64
        const reader = new FileReader();
        return new Promise<void>((resolve,reject)=>{
            reader.onloadend = async () =>{
                const base64Image = reader.result as string;
                try{
                const imageUrl = await handleLogoAction(base64Image);
                 if(imageUrl){
                    setBusiness((prevBusiness)=>{
                        const updatedBusiness = {...prevBusiness,[name]: imageUrl};
                        localStorage.setItem("business",JSON.stringify(updatedBusiness));
                        return updatedBusiness;
                    });
                    resolve();
                 }else {
                    toast.error("❌ Failed to upload logo");
                 }
                }catch(err:any){
                    console.log(err);
                    toast.error("❌ Failed to upload logo");
                }
                finally {
                    setLogoUploading(false);
                }
            }
            reader.onerror = (error) => {
                toast.error("❌ Failed to upload logo");
                reject(error);
            }
            reader.readAsDataURL(file);
        })
    }
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!isSignedIn){
            openSignIn();
            return;
        }else {
            try{
                setLoading(true);
                const savedBusiness = await saveBusinessToDb(business);
                setBusiness(savedBusiness);
                //clear local storage
                localStorage.removeItem("business");
                toast.success("🎉 Negocio guardado correctamente ");
                //redirect to edit page
                router.push(`/dashboard/business/edit/${savedBusiness._id}`);
            }catch(error : any){
                console.log(error);
                toast.error("🟠 Error");
            }finally{
                setLoading(false);
            }
        }
    }

    const getUserBusinesses = async() => {
        setLoading(true);
        try{
           const businesses = await getUserBusinessFromDb();
           console.log(businesses);
           setBusinesses(businesses);
        }catch(error : any){
            console.log(error);
            toast.error("❌ No se logró afectar a las empresas");
        }
        finally{
            setLoading(false);
        }
    };

    const getBusiness = async () =>{
        try{
          const business = await getBusinessFromDb(_id.toString());
          setBusiness(business);
        }catch(error : any){
            console.log(error);
            throw new Error(error);
        }
    }

    const generateBusinessDescription = async () =>{
        setGenerateDescriptionLoading(true);
        const {createdAt,updatedAt,__v, ...businessForAi} = business;
        business.description = "";

        try{
            const description = await aiGenerateBusinessDescription(businessForAi);
            setBusiness((prevBusiness : BusinessState)=>{
                const  updatedBusiness = {...prevBusiness,description};
                //save localstorage
                localStorage.setItem("business",JSON.stringify(updatedBusiness));
                return updatedBusiness;
            });
            toast.success("🎉 Descripcion del Negocio Generada con IA!!")

        }catch(error){
            console.error(error);
            toast.error("❌ Failed to generate business description");
        }finally{
            setGenerateDescriptionLoading(false);
        }
    }


    const updateBusiness = async () =>{
        setLoading(true);
        try{
          const updatedBusiness = await updateBusinessInDb(business);
          setBusiness(updatedBusiness);
          localStorage.removeItem("business");
          toast.success("🎉 Negocio actualizado con exito");

        }catch(error : any) {
            console.error(error);
            toast.error("❌ Fallo la Actualización del Negocio")
        }
        finally{
            setLoading(false);
        }
    }

    const togglePublished = async () => {
        setLoading(true);
        try{
            const updatedBusiness = await togglePublishInDb(_id.toString());
            setBusiness((prevBusiness)=>({
                ...prevBusiness,
                published : updatedBusiness.published
         } ));
             if(updatedBusiness.published){
                 toast.success("🎉 Negocio publicado");
             }else {
                  toast.success("🎉 Negocio no publicado");
             }
            

        }catch(error : any) {
            console.log(error);
            toast.error("Failed to toggle published");
        } finally {
            setLoading(false);
        }
    }

 const deleteBusiness = async() => {
    setLoading(true);
    try{
       await deleteBusinessFromDb(_id.toString());
       toast.success("🎉Negocio eliminado");
       router.push("/dashboard/admin");
    }catch(error){
        console.error(error);
        toast.error("Failed to delete business");
    }finally{
        setLoading(false);
    }
 }
 
 
    return (
        <BusinessContext.Provider value={{
            business,
            setBusiness,
            loading,
            setLoading,
            handleChange,
            handleSubmit,
            businesses,
            setBusinesses,
            initialState,
            logoUploading,
            generateBusinessDescription,
            generateDescriptionLoading,
            updateBusiness,
            isEditPage,
            openDescriptionModal,
            setOpenDescriptionModal,
            isDashboardPage,
            togglePublished,
            deleteBusiness
            }}>
          {children}
        </BusinessContext.Provider>
    )
};

export const useBusiness = () => {
    const context = useContext(BusinessContext);
    if(context === undefined){
        throw new Error("useBusiness must be user within a BusinessProvider");
    }
    return context;
}