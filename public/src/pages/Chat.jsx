import React, {useState , useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {allUsersRoute,host} from '../utils/APIRoutes';
import {useNavigate} from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';

function Chats() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUsers] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    function handleChatChange(contact){
        setCurrentChat(contact);
    }
    async function getCurrentUser(){
        if(!localStorage.getItem('users')) {
            navigate('/login');
        }
        else{
            const user = await JSON.parse(localStorage.getItem('users'));
            setCurrentUsers(user);
            setIsLoaded(true);
        }
    }
    async function getContacts(){
        if(currentUser) {
            if(!currentUser.isAvatarSet) {
                navigate('/setAvatar');
            }
            else{
                const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(data);
            }
        }
    }
    useEffect(() => {
        getCurrentUser();
    },[]);
    useEffect(() => {
        if(currentUser){
            socket.current = io(host);
            socket.current.emit('add-user', currentUser._id);
        }
    },[currentUser]);
    useEffect(() => {
        getContacts();
    },[currentUser]);
    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser = {currentUser} changeChat={handleChatChange}/>
                {
                    isLoaded && currentChat === undefined ? (
                    <Welcome currentUser = {currentUser}/>
                    ):(
                        currentChat !== undefined ? (
                        <ChatContainer currentChat = {currentChat} currentUser = {currentUser}
                        socket = {socket}
                        />
                        ):(<></>
                        )
                    )
                }
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fdd5df;
    gap: 1rem;
    .container {
        height: 80vh;
        width: 80vw;
        display: grid;
        grid-template-columns: 1fr 3fr;
        background-color: #ffa2b9;
    }
`;


export default Chats;