import { useContext, useEffect, useState } from 'react';
import './MyCartOrder.css';
import { StorageContext } from '../../context/StorageContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyCartOrder = () => {
    const { url, token } = useContext(StorageContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {order.items && order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            <p> ${order.amount}.00</p>
                            <p>Items: {order.items?.length || 0}</p> {/* Fixing the length issue */}
                            <p><span> &#x25cf; </span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MyCartOrder;
