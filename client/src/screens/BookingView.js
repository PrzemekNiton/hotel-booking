import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BookingView() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hotel, setHotel] = useState(null);

    const { hotelid } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:5000/api/hotels/getHotelById', { hotelid }, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    },
                });
                setLoading(false);
                setHotel(response.data);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        };

        fetchData();
    }, [hotelid]);

    return (
        <div>
        {loading ? (
            <h1>Loading...</h1>
        ) : error ? (
            <h1>Error...</h1>
        ) : hotel ? (
            <div className='m-5'>
                <div className="row justify-content-center mt-5 bs">
                <div className="col-md-5 bs justify-content-center" style={{ textAlign: 'center', borderRadius: '5px' }}>
                        <h1>{hotel.name}</h1>
                        <img src={hotel.imageUrls[0]} className='bigImg' style={{borderRadius: '5px'}}/>
                    </div>
                    <div className="col-md-5 bs">
                       
                       <div style={{textAlign:"right"}}>
                       <h1>Booking Information</h1>
                       <hr/>

                       <p>Your Name : </p>
                       <p>From Date :</p>
                       <p>To Date :</p>
                       <p>Max Count: {hotel.maxGuests}</p>
                       </div>

                    <div style={{textAlign:"right"}}>
                    <h1>Amount</h1>
                    <hr/>
                    <p>Total days : </p>
                    <p>Rent per day: {hotel.pricePerNight} €</p>
                    <p>Total Amount</p>
                    </div>

                    <div style={{float: 'right'}}>
                        <button className='btn btn-primary'>Pay Now</button>
                    </div>

                    </div>
                </div>
            </div>
        ) : null}
    </div>
);
}