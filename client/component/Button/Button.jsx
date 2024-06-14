import React from 'react';

function Button({ type, className, value, onClick, children, text, image }) {
  return (
    <button type={type} className={`${className} flex items-center justify-center`} onClick={onClick} value={value}>
      {image && <img src={image} alt={text} className="h-6 w-6 mr-2" />}
      <span>{text}</span>
    </button>
  );
}

export default Button;
