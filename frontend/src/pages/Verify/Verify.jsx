import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css';
import { useContext, useEffect } from 'react';
import { StorageContext } from '../../context/StorageContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StorageContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log('Verifying payment...');
      console.log('Success:', success, 'Order ID:', orderId);
      console.log('API URL:', url);  // Log the base URL
  
      if (!orderId || !success) {
        console.error('Missing orderId or success parameter');
        navigate('/');
        return;
      }
  
      const response = await axios.post(url + "/api/order/verify", { success, orderId });  
      if (response.data.success && success === "true") {
        navigate("/mycartorder");

      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
