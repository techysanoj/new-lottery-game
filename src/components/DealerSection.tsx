// components/DealerSection.tsx
import React from "react";
import "./DealerSection.css";

interface DealerSectionProps {
  name: string;
  whatsappLink: string;
}

const DealerSection: React.FC<DealerSectionProps> = ({ name, whatsappLink }) => {
  return (
    <div className="dealer-box">
      <p className="dealer-subtitle">♛♛ सीधे सट्टा कंपनी का No 1 खाईवाल ♛♛</p>
      <h2 className="dealer-title">♛♛ {name} ♛♛</h2>

      <ul className="dealer-timings">
        <li>⏰ सदर बाजार ----------- 1:20 pm</li>
        <li>⏰ ग्वालियर ----------- 2:20 pm</li>
        <li>⏰ दिल्ली बाजार -------- 2:50 pm</li>
        <li>⏰ दिल्ली मटका -------- 3:20 pm</li>
        <li>⏰ श्री गणेश ----------- 4:20 pm</li>
        <li>⏰ आगरा --------------- 5:20 pm</li>
        <li>⏰ फरीदाबाद ----------- 5:50 pm</li>
        <li>⏰ अलवर --------------- 7:20 pm</li>
        <li>⏰ गाज़ियाबाद ----------- 8:50 pm</li>
        <li>⏰ द्वारका -------------- 10:15 pm</li>
        <li>⏰ गली ---------------- 11:20 pm</li>
        <li>⏰ दिसावर ------------- 1:30 am</li>
      </ul>

      <div className="dealer-rates">
        <p>♛♛ जोड़ी रेट ♛♛</p>
        <p>जोड़ी रेट 10 -------- 960</p>
        <p>हारुफ रेट 100 -------- 960</p>
      </div>

      <h2 className="dealer-title">♛♛ {name} ♛♛</h2>

      <p className="play-text">Game Play करने के लिये नीचे लिंक पर क्लिक करे</p>

      <a
        href={whatsappLink}
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

export default DealerSection;
