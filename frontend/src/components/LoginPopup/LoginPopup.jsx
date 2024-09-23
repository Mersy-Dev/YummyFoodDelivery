import { assets } from '../../assets/assets';
import { StorageContext } from '../../context/StorageContext';
import './LoginPopup.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const LoginPopup = ({ setShowLogin }) => {


    const { url, setToken } = useContext(StorageContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    }); 

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
            toast.success("Login Successful");
        }
        else {
            toast.error(response.data.message);
        }

    }

    const onChanngeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {
                        currState === "Login" ? <></> : <input name='name' onChange={onChanngeHandler} value={data.name} type="text" placeholder='your name' required />
                    }
                    <input name='email' onChange={onChanngeHandler} value={data.email} type="email" placeholder='your email' required />
                    <input name='password' onChange={onChanngeHandler} value={data.password} type="password" placeholder='your password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <p>Already have a an account? <span onClick={() => setCurrState("Login")}>Login here </span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
