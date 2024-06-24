import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import {useState , useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const {password, username} = user;
            const {data} = await axios.post(loginRoute, {username, password});
            if(data.status) {
                localStorage.setItem('users', JSON.stringify(data.user));
                navigate('/');
            } else {
                toast.error(data.message,toastOptions);
            }
        }
    };
    const handleValidation = () => {
        if(user.username === '' || user.password === '') {
            toast.error('All fields are required',toastOptions);
            return false;
        }
        return true;
    };
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };
    return (
        <>
        <FormContainer>
            <form onSubmit={(event)=> handleSubmit(event)}>
                <div className='brand'>
                    <img src={Logo} alt="logo" />
                    <h1>technochat</h1>
                </div>
                <input 
                    type="text"
                    placeholder='Username'
                    name = 'username'
                    onChange={(event) => handleChange(event)} 
                    min={3}
                />
                <input 
                    type="password"
                    placeholder='Password'
                    name = 'password'
                    onChange={(event) => handleChange(event)} 
                    min = {6}
                />
                <button type='submit'>Login User</button>
                <span>
                    Don't have an account ? <Link to="/register">Register</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer />
        </>
    );
};

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fce4ec;
    form {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: pink; 
    }
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        img {
            width: 100px;
            margin-right: 1rem;
        }
        h1 {
            font-size: 2rem;
            margin-right: 5rem;
            color: #333;
        }
    }
    input {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    button {
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-radius: 5px;
        background-color: #ff69b4; /* Added pink shade */
        color: #fff;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: #ff1493; /* Changed to darker pink shade */
        }
    }
    span {
        margin-top: 1rem;
        display: block;
        text-align: center;
        font-weight: bold;
        a {
            color: #ff1493;
            text-decoration: none;
        }
    }
`;

export default Login;