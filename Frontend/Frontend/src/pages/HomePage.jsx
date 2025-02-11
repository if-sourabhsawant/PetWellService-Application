import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="img/ReFUR-a-Friend-1600x600-HP-banner.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Welcome to Pet Well Services</h1>
                <p className="opacity-75">Your one-stop solution for all pet care needs!</p>
                <p>
                  <Link className="btn btn-lg btn-primary" href="#">
                    Get Started
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="img/houston-best-groomer.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Grooming Services</h1>
                <p>Find expert groomers to make your pets look their best!</p>
                <p>
                  <Link className="btn btn-lg btn-primary" to={"groomers"}>
                    Book a Grooming Appointment
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="img/cropped-image-handsome-male-veterinarian-600nw-2140114091.jpg"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
            />
            <div className="container">
              <div className="carousel-caption text-start text-black">
                <h1>Veterinary Care</h1>
                <p>Get the best veterinary services for your pets' health!</p>
                <p>
                  <Link className="btn btn-lg btn-primary" to={"veterinarians"}>
                    Book a Vet Appointment
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container marketing my-5">
        <h2>Our Services</h2>
        <p>Explore the variety of services we offer for your pet's well-being:</p>
        <div className="row mt-5 gap-5">
          <div className="col border rounded-4 p-4 shadow-sm text-center d-flex flex-column align-items-center">
            <img src="img/svgexport-4.svg" className="bd-placeholder-img rounded-circle" alt="Grooming" width={"60%"} height={"60%"} />
            <h3>Grooming</h3>
            <p>Find expert groomers near you for your pet's grooming needs. We offer full-service grooming packages.</p>
            <p>
              <Link className="btn btn-secondary" to="groomers-learnmore">
                Learn More &raquo;
              </Link>
            </p>
          </div>
          <div className="col border rounded-4 p-4 shadow-sm text-center d-flex flex-column align-items-center">
            <img src="img/svgexport-15.svg" className="bd-placeholder-img rounded-circle" alt="Sitter" width={"60%"} height={"60%"} />
            <h3>Sitter</h3>
            <p>Book a sitter for your pet while you're away. Trustworthy sitters ensure your pet's comfort and safety.</p>
            <p>
              <Link className="btn btn-secondary" to="sitterslearnmore">
                Learn More &raquo;
              </Link>
            </p>
          </div>
          <div className="col border rounded-4 p-4 shadow-sm text-center d-flex flex-column align-items-center">
            <img src="img/svgexport-16.svg" className="bd-placeholder-img rounded-circle" alt="Sitter" width={"60%"} height={"60%"} />
            <h3>Veterinary Care</h3>
            <p>Access top-notch veterinary care for routine check-ups, vaccinations, and emergency care.</p>
            <p>
              <Link className="btn btn-secondary" to="veterinarianslearnmore">
                Learn More &raquo;
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="container py-2 my-5">
        <h2>What Our Clients Say</h2>
        <div className="row mt-5 gap-2 align-items-center">
          <div className="col p-2 border rounded">
            <blockquote className="blockquote">
              <p className="mb-0">
                "Pet Well Services made it so easy for me to find a reliable groomer for my dog. I highly recommend their services!"
              </p>
              <footer className="blockquote-footer mt-3">Prerna Pol, Pet Parent</footer>
            </blockquote>
          </div>
          <div className="col p-2 border rounded">
            <blockquote className="blockquote">
              <p className="mb-0">"I booked a vet appointment for my cat, and the experience was smooth and quick. Their staff is amazing!"</p>
              <footer className="blockquote-footer mt-3">Sonal Patil, Cat Owner</footer>
            </blockquote>
          </div>
          <div className="col p-2 border rounded">
            <blockquote className="blockquote">
              <p className="mb-0">"Had a great vet visit for my cat! Smooth process, and the staff was kind and professional."</p>
              <footer className="blockquote-footer mt-3">Shivraj Sankpal, Cat Owner</footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="container text-center py-5 my-5">
        <h3>Ready to take your pet's care to the next level?</h3>
        <p>Get started with Pet Well Services today and find trusted pet care professionals in your area!</p>
        <p>
          <Link className="btn btn-lg btn-primary" to="register">
            Sign Up Now
          </Link>
        </p>
      </div>
      <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row w-100">
          <div className="col-12 col-md align-content-center">
            <small className="d-block mb-3 text-muted text-center text-body-secondary">&copy; 2025 Pet Well Services, All rights reserved.</small>
          </div>
        </div>
      </footer>
    </main>
  );
}
