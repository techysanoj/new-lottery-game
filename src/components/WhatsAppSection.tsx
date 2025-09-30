// components/WhatsAppSection.jsx
import "./SocialSection.css";

const WhatsAppSection = () => {
  return (
    <div className="social-box">
      <p className="blink-text">
        अब WhatsApp के players भी जल्दी रिजल्ट पाने के लिए हमारे WhatsApp के चैनल को Join करे और Superfast रिजल्ट पाए
      </p>
      <a
        href="https://wa.me/1234567890" // replace with your WhatsApp link
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="icon"
        />
        WhatsApp Click to Chat
      </a>
    </div>
  );
};

export default WhatsAppSection;
