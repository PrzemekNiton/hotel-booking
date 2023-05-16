import React from 'react'

function Hotel({hotel}) {
    return (
<div className='row bs'>
     <div className="col-md-4">
        <img src={hotel.imageUrls[0]} className='smallImg'/>
     
     </div>
     <div className="col-md-7">
        <h1>{hotel.name}</h1>
        <p>Max Guests: {hotel.maxGuests}</p>
        <p>Country: {hotel.country}</p>
        <p>Hotel Type: {hotel.typeOfHotel}</p>

        <div style={{float: 'right'}}>
            <button className='btn btn-primary'>More details</button>
        </div>

    </div>
</div>
    )
}

export default Hotel