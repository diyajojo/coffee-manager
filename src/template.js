import React from 'react'
import {Link} from 'react-router-dom';
import supabase from "./supabaseclient";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Template({item,onDelete}) {
  

  const handleDelete = async()=>{

  const {data,error} =await supabase
  .from('coffeelist')
  .delete()
  .eq('id',item.id)
  .select() // needed for version 2 to return deleted record to data 

  if(data)
  {
    console.log('record deleted')
    onDelete(item.id);
  }
  if(error)
  {
    console.log('record not deleted')
  }
  }
  return (
  
    <div className="w-full h-80 p-4 bg-gradient-to-br from-[#FFD7BE] to-[#FFE4E1] rounded-md relative shadow-md border border-gray-200 font-primary ">
        <h3 className='mb-5 mt-5 text-4xl font-bold text-gray-800'>{item.name.toUpperCase()}</h3>
      <p className='mb-4 text-xl font-thin  text-gray-800'>{item.ingredients.toLowerCase()}</p>
      <div className="rating text-lg font-thin  text-gray-800">
        <p >{item.rating}</p>
     </div>
     <div className='mt-20 w-full  '>
  <i className='material-icons text-4xl  text-gray-800 ml-10  p-6  rounded-full cursor-pointer text-right' onClick={handleDelete}>
    delete
  </i>
  <i className='material-icons text-4xl text-gray-800 ml-5 p-6  rounded-full cursor-pointer text-right'>
    <Link to={'/update/'+item.id}>
      edit
    </Link>
  </i>
</div>
    </div>
  )
}

export default Template;