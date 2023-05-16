import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeView = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotels/getAllHotels', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
        });
        setHotels(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home View</h1>
      <h1>They are {hotels.length} hotels</h1>
    </div>
  );
};

export default HomeView;