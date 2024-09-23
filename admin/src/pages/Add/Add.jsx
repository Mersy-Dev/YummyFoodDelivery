import { useState } from 'react';
import { assets } from '../../assets/assets';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';



const Add = () => {
    const url = 'http://localhost:9000';
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        category: '',
        price: ''
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(
            data => ({ ...data, [name]: value })
        )

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', data.price);
        formData.append('image', image);

        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: '',
                description: '',
                category: 'salad',
                price: ''
            })
            setImage(false)
            toast.success("Food added successfully"); 

        } else {
            toast.error("Failed to add food");            
        }
    }

        return (
            <div className="add">
                <form className="flex-col" onSubmit={onSubmitHandler}>
                    <div className="add-img-upload flex-col">
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="image" hidden required />
                    </div>
                    <div className="add-product-name flex-col">
                        <p>Product Name</p>
                        <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder="Enter Product Name" />
                    </div>
                    <div className="add-product-description flex-col">
                        <p>Product Description</p>
                        <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder="Enter Product Description" />
                    </div>
                    <div className="add-category-price">
                        <div className="add-category flex-col">
                            <p>Product Category</p>
                            <select onChange={onChangeHandler} name="category">
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Deserts">Deserts</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Cake">Cake</option>
                                <option value="Pure Vegs">Pure Vegs</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>
                        <div className="add-price flex-col">
                            <p>Product Price</p>
                            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder="$30" />
                        </div>
                    </div>
                    <button type='submit' className='add-btn' >ADD</button>
                </form>
            </div>
        )
    }

    export default Add
