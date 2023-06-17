import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Hotel({ hotel, fromDate, toDate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top smallImg img-fluid" src={hotel.imageUrls[0]} alt="Hotel" />
      <div className="card-body">
        <div>
          <h5 className="card-title">{hotel.name}</h5>
          <p className="mb-0">Max Guests: {hotel.maxGuests}</p>
          <p className="mb-0">Country: {hotel.country}</p>
          <p className="mb-0">Hotel Type: {hotel.typeOfHotel}</p>
        </div>
        <div className="mt-3 text-center">
          {fromDate && toDate && (
            <Link to={`/book/${hotel._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-primary m-2">Book Hotel</button>
            </Link>
          )}
          <button className="btn btn-primary m-2" onClick={handleShow}>
            More Details
          </button>
        </div>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{hotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {hotel.imageUrls.map((url, index) => (
              <Carousel.Item className='carousel-item' key={index}>
                <img className="d-block img-fluid carousel-item" src={url} alt="Hotel photos" />
                <div className="carousel-caption d-none d-md-block carousel-item">
                  <h5>...</h5>
                  <p>...</p>
                </div>
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
