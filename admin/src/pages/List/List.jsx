import './List.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const List = ({url}) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error('Failed to fetch data');
        }
    }

    const removeFood = async (id) => {
        const response = await axios.post(`${url}/api/food/remove`, { id });
        if (response.data.success) {
            fetchList();
            toast.success('Food removed successfully');
        } else {
            toast.error('Failed to remove food');
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='ist add flex-col'>
            <p>All Foods List </p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Images</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Actions</b>
                </div>
                {
                    list.map((item, index) => {
                        return (
                            <div key={index} className="list-table-format">
                                <img src={`http://localhost:9000/images/${item.image}`} alt="" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                            </div>
                        )
                    }

                    )
                }
            </div>
        </div>
    )
}

export default List
