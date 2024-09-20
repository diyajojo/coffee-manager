
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
    <div className="page create">
      <form onSubmit={handleSubmit} >
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

        <button >Update Coffee Recipe</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}


export default Update;