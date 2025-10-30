'use server';

import db from '@/utils/db';
import Business from '@/models/business';
import { currentUser } from '@clerk/nextjs/server';
import { BusinessState } from '@/utils/types/business';
import {nanoid} from 'nanoid';
import slugify from 'slugify';
import { count } from 'console';




const checkOwnerShip = async (businnessId : string) => {
    try{
      await db();
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0]?.emailAddress;

      const isAdmin = user?.privateMetadata?.role === "admin";

      if(!userEmail) throw new Error("User not found");

      //find business by id
      const business = await Business.findById(businnessId);

      if(!business){
         throw new Error("Negocio no encontrado");
      }

    //   if(business.userEmail !== userEmail){
    //     throw new Error("You are not authorized to perform this action");
    //   }
    //   return true;
     // allow access if the user is an admin or the owner of the business
     if(isAdmin || business.userEmail === userEmail){
        return true;
     }

    }catch(error : any) {
        throw new Error(error);
    }
}

export const saveBusinessToDb = async (data: BusinessState)=>{
    try{
       await db();
       const user = await currentUser();
       const userEmail = user?.emailAddresses[0]?.emailAddress;
       const {_id,...rest} = data;
       const slug = slugify(`${rest.category}-${rest.name}-${rest.address}-${nanoid(6)}`);
       const business = await Business.create({...rest,slug,userEmail});
       return JSON.parse(JSON.stringify(business));
    }catch(error : any){
        throw new Error(error);
    }
};



export const getUserBusinessFromDb = async() => {
    try{
         await db();
         const user = await currentUser();
         const userEmail = user?.emailAddresses[0]?.emailAddress;
         const business = await Business.find({userEmail}).sort({
            createdAt : -1
         });
         
         return JSON.parse(JSON.stringify(business));
    }catch(error:any){
        throw new Error(error);
    }
}


export const getBusinessFromDb = async (_id:string)=>{
    try{
        await db();
        const business = await Business.findById(_id);
        return JSON.parse(JSON.stringify(business));
    }catch(error:any){
        throw new Error(error);
    }
}


export const updateBusinessInDb = async(data : BusinessState) => {
   try{
       await db();
       const {_id, ...rest} = data;
        await checkOwnerShip(_id);
       const business = await Business.findByIdAndUpdate(_id,rest,{
        new : true,
       });
       return JSON.parse(JSON.stringify(business));
   }catch(error : any){
     throw new Error(error);
   }
}


export const togglePublishInDb = async (_id: string) => {
    try{
       await db();
       try{
       await checkOwnerShip(_id);
       const business = await Business.findById(_id);
       if(!business){
         throw new Error("Business not found");
       }
       business.published = !business.published;
       await business.save();
       return JSON.parse(JSON.stringify(business));
       
     }catch(error : any){
        throw new Error(error);
     }
    }catch(err : any){
        throw new Error(err);
    }

}


export const getLatestBusinessesFromDb = async (page : number, limit : number) => {
    try{
       await db();
       const [businesses,totalCount] = await Promise.all([
          Business.find({
            published: true
          }).sort({createdAt : -1})
            .skip((page -1) * limit)
            .limit(limit),
            Business.countDocuments({published : true})
       ]);
       return {businesses : JSON.parse(JSON.stringify(businesses)), totalCount}
    }catch(error : any) {
        throw new Error(error);
    }
};



export const getBusinessBySlugFromDb = async (slug : string) =>{
    try{
       await db();
       const business = await Business.findOne({slug });
       return JSON.parse(JSON.stringify(business));
    }catch(error:any){
        throw new Error(error);
    }
}


export const searchBusinessesFromDb = async (query:string) => {
    try{
      
          //create regex pattern for partial text search
          const regexQuery = new RegExp(query, "i");
          const businesses = await Business.find({
            $or:[
                {name : regexQuery},
                {category: regexQuery},
                {address : regexQuery}
            ],
             published : true,
          });
          return JSON.parse(JSON.stringify(businesses));
    }catch(error :any){
        throw new Error(error)
    }
}

export const getUniqueCategoriesAndAddresses = async() => {
     try{
        await db();
          const aggregationPipeline = [
              {
                  $group: {
                      _id: null,
                      uniqueCategories: { $addToSet: { $toLower: "$category" } },
                      uniqueAddresses: { $addToSet: { $toLower: "$address" } },
                  },
              },
              {
                  $project: {
                      _id: 0,
                      uniqueCategories: 1,
                      uniqueAddresses: 1,
                  },
              },
          ];
      const result = await Business.aggregate(aggregationPipeline);
      if(result.length >0){
        return {
            uniqueCategories : result[0].uniqueCategories,
            uniqueAddresses : result[0].uniqueAddresses,
        }
      }else {
         return {uniqueCategories:[], uniqueAddresses:[]}
      }
     }catch(error : any) {
        throw new Error(error);
     }
}


export const getAllBusinessesFromDb = async(page : number, limit : number) => {
    try{
       await db();
       const[businesses,totalCount] = await Promise.all([
        Business.find()
         .sort({createdAt : -1})
         .skip((page-1)*limit)
         .limit(limit),
         Business.countDocuments()
       ]);
       return {businesses : JSON.parse(JSON.stringify(businesses)),totalCount}
    }catch(error:any){
        throw new Error(error);
    }
     
}




export const deleteBusinessFromDb = async (_id:string) =>{
    try{ 
      await db();
      await checkOwnerShip(_id);
      const business = await Business.findByIdAndDelete(_id);
      return JSON.parse(JSON.stringify(business));
    }catch(error:any){
        throw new Error(error);
    }
}

export const getUniquePublishedCategories = async () => {
  try {
    await db();

    const result = await Business.aggregate([
      { $match: { published: true } }, // ✅ Solo negocios publicados
      {
        $group: {
          _id: null,
          uniqueCategories: { $addToSet: { $toLower: "$category" } },
        },
      },
      {
        $project: {
          _id: 0,
          uniqueCategories: 1,
        },
      },
    ]);

    if (result.length > 0) {
      return { uniqueCategories: result[0].uniqueCategories };
    } else {
      return { uniqueCategories: [] };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
