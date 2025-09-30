import React from 'react';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <p className="contact-email">
          contact for Any Info At :- dostmera643@gmail.com
        </p>
        
        <div className="whatsapp-section">
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="whatsapp-icon"
            />
        </div>

        <div className="links-section">
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/terms-conditions" className="footer-link">Terms & Conditions</a>
        </div>

        <div className="copyright-section">
          © 2025 Satta Kendra :: ALL RIGHTS RESERVED
        </div>

        <div className="disclaimer-section">
          <p className="disclaimer-text">
            !! DISCLAIMER:- https://Satta Kendra.com is a non-commercial website. Viewing This Website Is Your Own Risk, All The Information Shown On Website Is Sponsored And We Warn You That Matka Gambling/Satta May Be Banned Or Illegal In Your Country..., We Are Not Responsible For Any Issues Or Scam..., We Respect All Country Rules/Laws... If You Not Agree With Our Site Disclaimer... Please Quit Our Site Right Now. Thank You.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;