// Popup.js
import React from 'react';

const Toast = ({ isOpen, type, content }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={"toast "+type}>
        {content}
        {type==='retry' && <button className='retry-btn'> Retry </button>}
    </div>
  );
};

export default Toast;
