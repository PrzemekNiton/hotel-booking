import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import { TabPane as BootstrapTabPane } from 'react-bootstrap';
import Error from '../components/Error';

const { TabPane } = Tabs;

function ProfileView() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  function MyBookings({ user }) {
    useEffect(() => {
      const fetchReservations = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/bookings/getBookingsByUserId', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user._id }),
          });

          const reservations = await response.json();
          console.log(reservations);
          setBookings(reservations);
        } catch (error) {
          console.error(error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchReservations();
    }, [user]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <Error message="Failed to fetch bookings" />;
    }

    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            {bookings.map(booking => (
              <div className='bs' key={booking._id}>
                <p>{booking.hotel}</p>
                <p><b>BookingId:</b> {booking._id}</p> 
                <p><b>CheckIn:</b>{booking.fromDate}</p>
                <p><b>Check out:</b> {booking.toDate}</p>
                <p><b>Amount:</b> {booking.totalAmount}</p>
                <p><b>Status:</b> {booking.status === 'booked' ? 'CONFIRMED' : 'CANCELLED'}</p>

                <div className='text-right'>
                  <button class='btn btn-primary'>CANCEL BOOKING</button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h2>Name: {user.name}</h2>
          <h2>Email: {user.email}</h2>
          <h2>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h2>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings user={user} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileView;
