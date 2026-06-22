import { useState } from 'react';

export default function Toggleable({ expandButtonText, hideButtonText, children }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <div style={{ display: isVisible ? '' : 'none' }}>
        {children}
        <button onClick={handleToggle}>{hideButtonText}</button>
      </div>
      <div style={{ display: isVisible ? 'none' : '' }}>
        <button onClick={handleToggle}>{expandButtonText}</button>
      </div>
    </div>
  );
}
