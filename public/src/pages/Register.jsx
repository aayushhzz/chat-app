import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import {useState , useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
            const {password , confirmPassword, username, email } = user;
            const {data} = await axios.post(registerRoute, { username, email, password, confirmPassword });
            if(data.status) {
                toast.error('User created successfully',toastOptions);
                localStorage.setItem('users', JSON.stringify(data.user));
                navigate('/');
            } else {
                toast.error(data.message,toastOptions);
            }
        }
        

    };
    const handleValidation = () => {
        if(user.username === '' || user.email === '' || user.password === '' || user.confirmPassword === '') {
            toast.error('All fields are required',toastOptions);
            return false;
        } else if(user.password !== user.confirmPassword) {
            toast.error('Passwords do not match',toastOptions);
            return false;
        }else if(user.password.length < 6) {
            toast.error('Password must be at least 6 characters',toastOptions);
            return false;
        }else if(user.username.length < 3) {
            toast.error('Username must be at least 3 characters',toastOptions);
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
                />
                <input 
                    type="email"
                    placeholder='Email'
                    name = 'email'
                    onChange={(event) => handleChange(event)} 
                />
                <input 
                    type="password"
                    placeholder='Password'
                    name = 'password'
                    onChange={(event) => handleChange(event)} 
                />
                <input 
                    type="password"
                    placeholder='Confirm Password'
                    name = 'confirmPassword'
                    onChange={(event) => handleChange(event)} 
                />
                <button type='submit'>Create User</button>
                <span>
                    Already have an account ? <Link to="/login">Login</Link>
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

export default Register;