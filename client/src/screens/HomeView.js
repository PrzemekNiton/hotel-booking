import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hotel from '../components/Hotel'

const HomeView = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/api/hotels/getAllHotels', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
        });
        setLoading(false)
        setHotels(response.data);
      } catch (error) {
        setError(true)
        console.error(error.message)
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className="row justify-content-center mt-5">
        {loading ? (<h1>Loading....</h1>) : error ? (<h1>Error</h1>) : (hotels.map((hotel) => (
          <div className="col-md-9 mt-2" key={hotel.id}>
            <Hotel hotel={hotel}/>
          </div>
        )))}
      </div>
    </div>
  );
};

export default HomeView;