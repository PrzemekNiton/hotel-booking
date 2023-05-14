import React, { useEffect, useState} from 'react';
import axios from 'axios';

const HomeView = () => {
 
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
 
      try {
        const {data: response} = await axios.get('/api/hotels/getAllHotels');
        setHotels(response);
      } catch (error) {
        console.error(error.message);
      }
  
    }

    fetchData();
  }, []);

  return (
    <div>
    <h1> Home Screen </h1>
      <h1>they are {hotels.length} rooms</h1>

    </div>
  )
}

export default HomeView;