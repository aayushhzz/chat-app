import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../assets/loader.gif';
import {useState , useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

const SetAvatar = () => {
    const api = 'https://api.multiavatar.com/45678954';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
    };
    useEffect(() => {
        if(!localStorage.getItem('users')) {
            navigate('/login');
        }
    },[]);
    const setProfilePicture = async () => {
        if(selectedAvatar === undefined) {
            toast.error('Please select an avatar',toastOptions);
        }
        else{
            const user = JSON.parse(localStorage.getItem('users'));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            if(data.isSet){
                user.isAvatarSet = true;
                user.avatar = data.image;
                localStorage.setItem('users', JSON.stringify(user));
                navigate('/');
            }
            else{
                toast.error('Error in setting profile picture',toastOptions);
            }
        }
    };
    useEffect(() => {
        async function fetchData() {
            const data = [];
            for(let i = 0; i < 4; i++) {
                const image = await axios.get(`
                ${api}/${Math.round(Math.random()*1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString('base64'));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    },[]);
    return (
        <>
        {
            isLoading ? 
            <Container>
                <img src={Loader} alt="loader" /> 
            </Container>
                :
            <Container>
                <div className="title-container">
                    <h1>Choose an Avatar for your Profile Picture</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div key={index} 
                                className={`avatar ${
                                    (selectedAvatar === index) ? "selected" : ""}`}
                                >
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)}/>
                                </div>
                            )
                        })
                    }
                </div>
                <button type = 'submit' className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
        }
        <ToastContainer />
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fce4ec;
    .title-container {
        margin-bottom: 2rem;
        color: #000;
        text-align: center;
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            cursor: pointer;
            border: 1rem solid transparent;
            padding: 0.4rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 10rem;
            }
            &.selected{
                border-color: #c154c1;
            }
        }
    }
    button {
        width: 30%;
        height: 3rem;
        padding: 0.5rem;
        border: none;
        font-size: 1rem;
        border-radius: 5px;
        margin-top: 2rem;
        background-color: #ff69b4; /* Added pink shade */
        color: #fff;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: #ff1493; /* Changed to darker pink shade */
        }
    }
`;



export default SetAvatar;