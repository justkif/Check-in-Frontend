import { useState, useEffect } from 'react';

export default function Error({ error }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setVisible(true);
      }, 10);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [error]);
  return (
    <div
      className={`absolute top-15 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 px-4 py-3 rounded shadow-md z-20 w-auto text-center transition-all duration-300 font-semibold
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
    >{error}
    </div>
  );
}
