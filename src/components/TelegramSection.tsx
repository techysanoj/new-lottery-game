// components/TelegramSection.jsx
import "./SocialSection.css";

const TelegramSection = () => {
  return (
    <div className="social-box">
      <p className="blink-text">
        अब टेलीग्राम के players भी जल्दी रिजल्ट पाने के लिए हमारे टेलीग्राम के चैनल को Join करे और Superfast रिजल्ट पाए
      </p>
      <a
        href="https://t.me/yourchannel" // replace with your Telegram link
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-btn"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
          alt="Telegram"
          className="icon"
        />
        Join Telegram
      </a>
    </div>
  );
};

export default TelegramSection;
