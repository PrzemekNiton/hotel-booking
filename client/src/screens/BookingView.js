// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function BookingView() {

//     const [loading, setLoading] = useState()
//     const [error, setError] = useState()
//     const [hotel, setHotel] = useState()


//     useEffect(async () => {
//         try {
//             setLoading(true)
//             const response = await axios.post('http://localhost:5000/api/hotels/getHotelById', {hotelid: matchMedia.params.hotelid}, {
//                 headers: {
//                     'Access-Control-Allow-Origin': '*',
//                     'Access-Control-Allow-Methods': 'POST',
//                     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//                 },
//             });
//             setLoading(false)
//             setHotel(response.data);

//         } catch (error) {
//             setLoading(false)
//             setError(true)
//         }
//     }, [])

//     const { hotelid } = useParams();

//     return (
//         <div>
//             <h1>Book screen</h1>
//             <h1>Hotel id = {hotelid}</h1>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BookingView() {

    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [hotel, setHotel] = useState()

    const { hotelid } = useParams();

    useEffect(async () => {
        try {
            setLoading(true)
            const response = await axios.post('http://localhost:5000/api/hotels/getHotelById', {hotelid}, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                },
            });
            setLoading(false)
            setHotel(response.data);

        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }, [])

    return (
        <div>
            <h1>Book screen</h1>
            <h1>Hotel id = {hotelid}</h1>
        </div>
    );
}