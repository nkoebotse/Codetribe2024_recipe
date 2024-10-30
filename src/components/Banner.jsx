
import  { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Banner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = Cookies.get('cookieAccepted'); // Check for the cookie
    if (!hasAccepted) {
      setVisible(true); // Show banner if cookie is not set
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieAccepted', 'true', { expires: 30 }); // Set cookie to expire in 30 days
    setVisible(false); // Hide banner
  };

  if (!visible) return null; // Don't render anything if not visible

  return (
    <div style={bannerStyle}>
      <p>This website uses cookies to enhance the user experience.</p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
};

const bannerStyle = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  background: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
};

export default Banner;
