import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import Welcome from '../components/Welcome';

const Contacts = ({contacts,currentUser,changeChat}) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
        if(currentUser){
            setCurrentUserAvatar(currentUser.avatar);
            setCurrentUserName(currentUser.username);
        }
    },[currentUser]);
    const changeCurrentChat = (index,contact) => {
        currentSelected === index ? setCurrentSelected(undefined) : setCurrentSelected(index);
        changeChat(contact);
    }
    return (
        <>
          {currentUserAvatar && currentUserName && (
            <Container>
              <div className="brand">
                <img src={logo} alt="logo" />
                <h3>technochat</h3>
              </div>
              <div className="contacts">
                {contacts.map((contact, index) => {
                  return (
                    <div
                      key={index}
                      className={`contact ${
                        index === currentSelected ? "selected" : ""
                      }`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatar}`}
                          alt=""
                        />
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="current-user">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentUserAvatar}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
              </div>
              <Welcome />
            </Container>
          )}
        </>
      );
};

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #ff1493;
.brand {
  display: flex;
  align-items: center;
  justify-content: left;
  img {
    height: 5rem;
    margin-left: 5rem;
  }
  h3 {
    color: white;
  }
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact {
    background-color: #ffffff34;
    min-height: 5rem;
    cursor: pointer;
    width: 90%;
    border-radius: 0.2rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
  .selected {
    background-color: #0d0d30;
  }
}

.current-user {
  background-color: #0d0d30;
  display: flex;
  justify-content: left;
  align-items: center;
    gap: 2rem;
  .avatar {
    img {
      height: 4rem;
      max-inline-size: 100%;
      margin-left: 3rem;
    }
  }
  .username {
    h2 {
      color: white;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
}
`;

export default Contacts;