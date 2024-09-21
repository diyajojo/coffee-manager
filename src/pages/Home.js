import supabase from "../supabaseclient";
import { useEffect, useState } from 'react';
import Template from "../template";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [coffeeData, setCoffeeData] = useState(null);
  // 'created_at' is default supabase ppty to arrange data as per time creation
  const [orderBy, setOrderBy] = useState('created_at');
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

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
        <div className="coffee">
          <div className="order-by ml-5 ">
            <p className="my-5  font-secondary">Order by:</p>
            <button className="mr-10 bg-gradient-to-br from-[#FFC499] to-[#FFA07A] text-white border-0 p-2 px-4 rounded-full  cursor-pointer font-secondary" onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button className="mr-10 bg-gradient-to-br from-[#FFC499] to-[#FFA07A] text-white border-0 p-2 px-4 rounded-full cursor-pointer font-secondeary" onClick={() => setOrderBy('name')}>Name</button>
            <button className="mr-10 bg-gradient-to-br from-[#FFC499] to-[#FFA07A] text-white border-0 p-2 px-4 rounded-full cursor-pointer font-secondary" onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
          <div className="coffee-grid grid-cols-5 gap-4 mx-auto my-10 w-3/5">
            <Slider {...settings}>
            {coffeeData && coffeeData.map(item => (
              <Template key={item.id} item={item} onDelete={handleDelete}/>
          
            ))}
                </Slider>
          </div>
        </div>
    </div>
  );
};

export default Home;