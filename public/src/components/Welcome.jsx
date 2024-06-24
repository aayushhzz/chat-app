import React,{useEffect,useState} from "react";
import styled from "styled-components";
import Hello from "../assets/techno.gif";

const Welcome = ({currentUser}) => {
    return (
        <Container>
                <img src={Hello} alt="hello" />
                <h1>Welcome    <span>{currentUser?.username}</span> </h1>
                <h2>Click on a Chat to Message!</h2>
        </Container>
    );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: #1820c4;
flex-direction: column;
img {
  height: 30rem;
}
span {
  color: #db120b;
}
`;

export default Welcome;