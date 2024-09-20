import { useState } from "react";
import supabase from "../supabaseclient";
import { useNavigate } from "react-router-dom";


const Create = () => {

const navigate = useNavigate();

const [name, setName] =useState('');
const [ingredients, setIngredients] =useState('');
const [rating, setRating] =useState('');
const [error, setError]= useState(null);

const handleSubmit= async(e) =>{

  e.preventDefault();

  if (!name|| !ingredients || !rating) 
  {
    setError('Please fill in all the fields correctly.')
  }
  
  else 
  {
   const {data,error} = await supabase
   .from('coffeelist')
   .insert({name,ingredients,rating})
   .select(); // version 2 needs

   if(error)
   {
    setError('Please fill in all the fields correctly.')
   }
   if(data)
   {
    setError(null);
    console.log(data)
    navigate('/', { replace: true }); 
   }
  }

}
  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Coffee Name:</label>
        <input 
          type="text" 
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="method">Ingredients:</label>
        <textarea 
          id="method"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Coffee Recipe</button>

        {Error && <p className="error">{Error}</p>}
      </form>
    </div>
  )
}

export default Create