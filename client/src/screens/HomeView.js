import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hotel from '../components/Hotel';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;



const HomeView = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(4);
  const [userName, setUserName] = useState('');

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/hotels/getAllHotels', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
        });
        setLoading(false);
        setHotels(response.data);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setUserName(user.name);
    }
  }, []);

  // Logic for pagination
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterByDate = (dates) => { 
  
    //TEST
    // console.log(moment(dates[0]).format('DD-MM-YYYY'));
    // console.log(moment(dates[1]).format('DD-MM-YYYY'));
    // setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
    // setToDate(moment(dates[1]).format('DD-MM-YYYY'));
    const from = moment(dates[0].$d).format('DD-MM-YYYY');
    const to = moment(dates[1].$d).format('DD-MM-YYYY');
    setFromDate(from);
    setToDate(to);

  }

  return (
    <div className="container">
      {userName && (
        <div>
          <h3>Hi {userName}!</h3>
          <p>Choose your dream hotel</p>
        </div>
      )}

    <div className="row mt-5">
<div className="col-md=3">

<RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
</div>
</div>
  
  
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 justify-content-start mt-5">
        {loading ? (
          <h1>Loading....</h1>
        ) : error ? (
          <Error />
        ) : (
          currentHotels.map((hotel) => (
            <div className="col-md-6 mb-4" key={hotel.id}>
              {/* <Hotel hotel={hotel} fromDate={fromDate} toDate={toDate} /> */}
              <Hotel hotel={hotel} fromDate={fromDate} toDate={toDate} key={hotel.id} />

            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(hotels.length / hotelsPerPage) }, (_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeView;
