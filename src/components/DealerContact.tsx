// components/DealerContact.tsx
import React from "react";
import "./DealerContact.css";

interface DealerContactProps {
  name: string;
  whatsappLink: string;
}

const DealerContact: React.FC<DealerContactProps> = ({ name, whatsappLink }) => {
  return (
    <div className="dealer-contact">
      <p className="dealer-text">नमस्कार साथियो</p>
      <p className="dealer-text">
        अपनी गेम का रिजल्ट हमारी web साइट पर लगवाने के लिए संपर्क करें।
      </p>
      <h3 className="dealer-name">{name}</h3>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
        WhatsApp Click to chat
      </a>

      <p className="note">
        NOTE: इस नंबर पर लीक गेम लेने वाले भाई कॉल या मैसेज न करें।
      </p>
    </div>
  );
};

export default DealerContact;
