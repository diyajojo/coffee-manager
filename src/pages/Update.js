//useParams helps to access url parameters of current route 
import { useParams ,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import supabase from "../supabaseclient";



const Update = () => {
  // id in route defined in app.js for update page
  const {id} =useParams();
  const navigate = useNavigate();

  const [name, setName] =useState('');
  const [ingredients, setIngredients] =useState('');
  const [rating, setRating] =useState('');
  const [error, setError] = useState(null);


  useEffect(() =>{
   const fetchData = async()=>
   {
    const {data,error}= await supabase
    .from('coffeelist') // tablename
    .select()
    .eq('id',id) // checks if id column of table match useParams id
    .single() // to return the single fetched data
    

    if(error)
    {
      navigate('/', {replace :true})
      console.log(error)
    }
    if(data)
    {
     setName(data.name);
     setIngredients(data.ingredients);
     setRating(data.rating);
     //  console.log(data)
    }
   }

   fetchData();
  },[id,navigate])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !ingredients || !rating) {
      setError('Please fill the form correctly');
      return;
    } 
    else
     {
      try 
      {
        // for update data can be null or contain updated record
        const { data, error } = await supabase
          .from('coffeelist')
          .update({ name, ingredients, rating })
          .eq('id', id)
          .select() // version 2 needs this for returning updated record into data

          // both data and error is null in console
         //  console.log('Response:', data, error);

        if (error)
        {
          setError('Error updating the data');
          console.log(error);
        }
        // for redirection 
        if (data) 
        {
          setError(null);
          console.log(data);
          navigate('/', { replace: true });
        }
      } 
      catch (error) 
      {
        console.error('Error submitting form:', error);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
    <div className="card bg-white rounded shadow-md p-4 md:p-6 lg:p-8 max-w-md mx-auto">
      <div className="card-header py-4 px-6">
        <h2 className="text-2xl text-gray-700 text-center font-primary font-bold mb-0">UPDATE COFFEE RECIPE</h2>
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
  );
}


export default Update;