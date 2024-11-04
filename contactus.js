import React, { useState } from 'react';
import './contactus.css'; // Import the CSS for styling

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contactus-1">
      <div className="info-container-1">
        <h1>Contact Us</h1>
        <p>
          We value your feedback and inquiries! If you have any suggestions or
          need assistance, please don't hesitate to reach out to us.
        </p>
        <br />
        <span>Phone: +1 234 567 890</span>
        <br />
        <span>Email: hi@fashion.com</span>
        <br />
      </div>

      <div className="contact-container-1">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="line-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              className="line-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="line-input"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-button">
            <button type="submit">Contact Us</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
