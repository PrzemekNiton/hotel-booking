import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';

export default function BookingView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hotel, setHotel] = useState(null);
  const { hotelId, fromDate, toDate } = useParams();
  const totalDays = moment(toDate, 'DD-MM-YYYY').diff(moment(fromDate, 'DD-MM-YYYY'), 'days') + 1;
  const [totalAmount, setTotalAmount] = useState();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:5000/api/hotels/getHotelById',
          { hotelId },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
          }
        );
        setLoading(false);
        setHotel(response.data);
        setTotalAmount(response.data.pricePerNight * totalDays);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [hotelId, totalDays]);

  async function onToken(token) {
    console.log(token);

    const bookingDetails = {
      hotel,
      userId: currentUser._id,
      fromDate,
      toDate,
      token,
      totalAmount,
      totalDays,
    };

    try {
      const result = await axios.post('http://localhost:5000/api/bookings/bookHotel', bookingDetails);
    } catch (error) {
      // Handle the error
    }
  }

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Error />
      ) : hotel ? (
        <div className='m-5'>
          <div className='row justify-content-center mt-5 bs'>
            <div className='col-md-5 bs' style={{ textAlign: 'center', borderRadius: '5px' }}>
              <h1>{hotel.name}</h1>
              <div>
                <img src={hotel.imageUrls[0]} className='bigImg' style={{ borderRadius: '5px' }} alt="Hotel" />
              </div>
            </div>
            <div className='col-md-5 bs'>
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Information</h1>
                <hr />
                <p>Your Name: {currentUser && currentUser.name}</p>
                <p>From Date: {fromDate}</p>
                <p>To Date: {toDate}</p>
                <p>Max Count: {hotel.maxGuests}</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <h1>Amount</h1>
                <hr />
                <p>Total days: {totalDays}</p>
                <p>Rent per day: {hotel.pricePerNight} €</p>
                <p style={{fontWeight: 'bold'}}>Total Amount: {totalAmount} €</p>
              </div>

              <div style={{ float: 'right' }}>
                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency='EUR'
                  stripeKey="pk_test_51NHNsGD4TiwA6UHXLgLXrqohYgiFKsJYKKdmYSGjvs0kPRDTAFNLcUvNVt7jMgztbrQUDV5qArEnANFAUg8eN4SN00AGXWUYK2"
                >
                  <button className='btn btn-primary'>Pay Now</button>
                </StripeCheckout>

</div>

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
