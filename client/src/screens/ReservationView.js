import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import { TabPane as BootstrapTabPane } from 'react-bootstrap';
import ProfileView from './ProfileView';

const { TabPane } = Tabs;

function ReservationView() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

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
        } catch (error) {
          console.error(error);
        }
      };

      fetchReservations();
    }, [user]);

    return (
      <div>
        <h1>My reservations</h1>
      </div>
    );
  }
}

export default ReservationView;
