import React from 'react'
import { getUniqueCategoriesAndAddresses } from '@/actions/business'
import FilteredList from '../search/filtered-list';
import { LayoutList,MapPin,MapPinHouse } from 'lucide-react';

export default async function CategoryAddressCard () {
 const {uniqueCategories,uniqueAddresses} = await getUniqueCategoriesAndAddresses();
  
   const categories = Array.isArray(uniqueCategories) ? uniqueCategories : [];
   const addresses = Array.isArray(uniqueAddresses) ? uniqueAddresses : [];

 return (
    <div>
       <aside className='pb-10 mt-5 relative'>
         <div className='m-5 space-y-6'>
          <FilteredList 
            data={categories} 
            title="Categorias"
            icon={<LayoutList/>}
          />
           <FilteredList 
            data={addresses} 
            title="Direcciones"
            icon={<MapPinHouse/>}
          />
         </div>
       </aside>
    </div>
  )
}
