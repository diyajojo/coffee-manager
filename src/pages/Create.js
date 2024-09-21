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
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
    <div className="card bg-white rounded shadow-md p-4 md:p-6 lg:p-8 max-w-md mx-auto">
      <div className="card-header py-4 px-6">
        <h2 className="text-2xl text-gray-700 text-center font-primary font-bold mb-0">CREATE COFFEE RECIPE</h2>
      </div>
      <div className="card-body p-4 md:p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Coffee Name:</span>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 bg-white focus:outline-none focus:border-pink-400 focus:bg-white"
            />
          </label>
  
          <label className="block mb-4">
            <span className="text-gray-700">Ingredients:</span>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 bg-white focus:outline-none focus:border-pink-400 focus:bg-white"
            />
          </label>
  
          <label className="block mb-4">
            <span className="text-gray-700">Rating:</span>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 bg-white focus:outline-none focus:border-pink-400 focus:bg-white"
            />
          </label>
  
          <button
            type="submit"
            className="bg-gradient-to-br from-[#FFC499] to-[#FFA07A] text-white border-0 rounded p-2 px-3 font-secondary cursor-pointer mx-auto block mt-4 mb-4"
          >
            Create Coffee Recipe
          </button>
  
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  </div>

  )
}

export default Create