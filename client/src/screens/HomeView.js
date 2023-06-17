import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hotel from '../components/Hotel';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import moment from 'moment';

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
  const [duplicateHotels, setDuplicateHotels] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

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
        setDuplicateHotels(response.data);
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
    const from = moment(dates[0].$d).format('DD-MM-YYYY');
    const to = moment(dates[1].$d).format('DD-MM-YYYY');
    setFromDate(from);
    setToDate(to);
  };

  const filterBySearch = () => {
    setHotels(duplicateHotels); // Przywróć oryginalną tablicę hoteli przed filtrowaniem
    const tempHotels = duplicateHotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setHotels(tempHotels);
  };

  const filterByType = (e) => {
    const selectedType = e.target.value;
    if (selectedType !== 'all') {
      const tempHotels = duplicateHotels.filter(
        (hotel) => hotel.typeOfHotel && hotel.typeOfHotel.toLowerCase() === selectedType.toLowerCase()
      );
      setHotels(tempHotels);
    } else {
      setHotels(duplicateHotels);
    }
    setType(selectedType);
  };

  return (
    <div>
      {userName && (
        <div className="ml-3 mt-2">
          <h3 className="ml-4">Hi {userName}!</h3>
          <p className="ml-4">Choose your dream hotel</p>
        </div>
      )}

      <div className="container">
        <div className="row mt-5 bs">
          <div className="col-md-3">
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="search hotels"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyUp={filterBySearch}
            />
          </div>
          <div className="col-md-4">
            <select className="form-control" value={type} onChange={filterByType}>
              <option value="all">All</option>
              <option value="luxury">Luxury</option>
              <option value="resort">Resort</option>
              <option value="city">City</option>
              <option value="lodge">Lodge</option>
              <option value="inn">Inn</option>
            </select>
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
                <Hotel hotel={hotel} fromDate={fromDate} toDate={toDate} />
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
    </div>
  );
};

export default HomeView;
