import supabase from "../supabaseclient";
import { useEffect, useState } from 'react';
import Template from "../template";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [coffeeData, setCoffeeData] = useState(null);
  // 'created_at' is default supabase ppty to arrange data as per time creation
  const [orderBy, setOrderBy] = useState('created_at');

  const handleDelete = (id) => {
    setCoffeeData(prevCoffeeData => {
      // fliters or removes when condition is
      return prevCoffeeData.filter(item => item.id !== id)
    })
  }


  //runs everytime page reload and not for initial loading
  useEffect(() => {
    const fetchData= async () => {
      const { data, error } = await supabase
        .from('coffeelist') // supabase table name
        .select() // all columns returned
        .order(orderBy, {ascending:false}) // arrange data

      if (error) 
        {
        setCoffeeData(null);
        console.log("Couldn't fetch coffee details");
        console.log(error);
        setFetchError(error.message); // set error message
      }
      if (data) 
        {
        setCoffeeData(data);
        setFetchError(null);
      }
    };
    fetchData();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {coffeeData && (
        <div className="coffee">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('name')}>Name</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
          <div className="coffee-grid">
          {coffeeData.map(item => (
            <Template key={item.id} item={item} onDelete={handleDelete}/>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;