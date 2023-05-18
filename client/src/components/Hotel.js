// import React, { useState } from 'react'
// import { Modal, Button, Carousel } from 'react-bootstrap'
// import {Link} from 'react-router-dom'

// function Hotel({ hotel }) {

//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
//         <div className='row bs'>
//             <div className="col-md-4">
//                 <img src={hotel.imageUrls[0]} className='smallImg' />

//             </div>
//             <div className="col-md-7">
//                 <h1>{hotel.name}</h1>
//                 <p>Max Guests: {hotel.maxGuests}</p>
//                 <p>Country: {hotel.country}</p>
//                 <p>Hotel Type: {hotel.typeOfHotel}</p>

//                 <div style={{ float: 'right' }}>
//                     <Link to={`/book/${hotel._id}`}>
//                     <button className='btn btn-primary m-2'>Book hotel</button>
//                     </Link>
//                     <button className='btn btn-primary' onClick={handleShow}>More details</button>
//                 </div>

//             </div>
//             <Modal show={show} onHide={handleClose} size='lg'>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{hotel.name}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Carousel>
//                         {hotel.imageUrls.map(url=>{
//                             return(
//                                 <Carousel.Item>
//                                 <img
//                                     className="d-block w-100 bigImg"
//                                     src={url}
//                                     alt="Hotel photos"
//                                 />
//                             </Carousel.Item>
//                             )                         
                           
//                         })}
//                     </Carousel>
//                     <p>{hotel.description}</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// }

// export default Hotel

import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Hotel({ hotel }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={hotel.imageUrls[0]} className="smallImg" />
      </div>
      <div className="col-md-7">
        <h1>{hotel.name}</h1>
        <p>Max Guests: {hotel.maxGuests}</p>
        <p>Country: {hotel.country}</p>
        <p>Hotel Type: {hotel.typeOfHotel}</p>

        <div style={{ float: 'right' }}>
          <Link to={`/book/${hotel._id}`}>
            <button className="btn btn-primary m-2">Book hotel</button>
          </Link>
          <button className="btn btn-primary" onClick={handleShow}>
            More details
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{hotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {hotel.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 bigImg" src={url} alt="Hotel photos" />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{hotel.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Hotel;