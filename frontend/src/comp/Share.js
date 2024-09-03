import React from 'react';

const Share = ({ message }) => {
  const encodedMessage = encodeURIComponent(message); // Encode message for URLs

  const whatsappUrl = `whatsapp://send?text=${encodedMessage}`; // WhatsApp URL
  const facebookUrl = `fb-messenger://share?link=${window.location.href}&content=${encodedMessage}`; // Facebook Messenger URL with current location and message
  const instagramUrl = `intent://instagram.com/share?text=${encodedMessage}#Intent;scheme=instagram;package=com.instagram.android;end`; // Instagram share intent with message
  const snapchatUrl = `snapchat://share?text=${encodedMessage}&type=snaplink`; // Snapchat share URL with message (limited functionality)

  // Check for app availability before creating links (optional)
  const isWhatsappInstalled = () => {
    const navigatorObj = navigator;
    if (navigatorObj && navigatorObj.userAgent) {
      return /whatsapp/i.test(navigatorObj.userAgent);
    }
    return false;
  };

//   const isFacebookMessengerInstalled = () => {
//     const fbAvailable = typeof FB !== 'undefined' && FB !== null && FB.share !== null;
//     return fbAvailable; // Check for Facebook Messenger SDK
//   };

  // Consider using a library for more robust app detection

  return (
    <div className="share-component">
      <a
        href={isWhatsappInstalled() ? whatsappUrl : '#'}
        className="share-button whatsapp"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa fa-whatsapp"></i> Share on WhatsApp
      </a>
      <a
        href={facebookUrl}
        className="share-button facebook"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa fa-facebook"></i> Share on Facebook Messenger
      </a>
      <a
        href={instagramUrl}
        className="share-button instagram"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa fa-instagram"></i> Share on Instagram
      </a>
      <a
        href={snapchatUrl}
        className="share-button snapchat"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa fa-snapchat"></i> Share on Snapchat (Limited Functionality)
      </a>
    </div>
  );
};

export default Share;
