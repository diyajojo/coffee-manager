import React from 'react'
import {Link} from 'react-router-dom';
import supabase from "./supabaseclient";


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
    <div className='card'>
        <h3>{item.name}</h3>
      <p>{item.ingredients}</p>
     <div className='rating'>
      <p>{item.rating}</p>
     </div>
     <Link to={'/update/'+item.id}>
     <i className='icons'>edit</i>
     </Link>
     <i className='icons' onClick={handleDelete}>delete</i>
    </div>
  )
}

export default Template;