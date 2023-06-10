import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Hotel({ hotel, fromDate, toDate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [duplicateHotels, setDuplicateHotels] = useState([]);
  
  return (
      <div className="card" style={{width: 350}}>
          <img className="card-img-top smallImg " src={hotel.imageUrls[0]} alt="Hotel" />
        <div className="card-body">
            <div><h5 className="card-title">{hotel.name}</h5>
              <p className="mb-0">Max Guests: {hotel.maxGuests}</p>
              <p className="mb-0">Country: {hotel.country}</p>
             <p className="mb-0">Hotel Type: {hotel.typeOfHotel}</p>
            </div>
            <div className="mt-3 text-center ">

              {(fromDate && toDate) &&(
                 <Link to={`/book/${hotel._id}/${fromDate}/${toDate}`}>
                 <button className="btn btn-primary m-2">Book Hotel</button>
                 </Link>
              )}
              <button className="btn btn-primary m-2" onClick={handleShow}>
                More Details
              </button>
            </div>
          
        </div>


        <Modal style={{width : '1200px'}} size='lg' show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{hotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
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