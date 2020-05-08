import React, { useState, useRef, useEffect } from 'react';
import User from '../../interfaces/user';
import AddButton from './Buttons/AddButton';
import SubmitButton from './Buttons/SubmitButton';
import Card from '../Card/Card';
import './style.css';
import { checkEmail } from '../../util';

const NEW_USER = {
    name: '',
    email: '',
    gender: '',
    react: false,
    typescript: false,
    graphql: false,
    node: false,
    other: false,
}

interface Users extends Array<User>{}

const CardsList: React.FC = () => {
    const [users, setUsers] = useState<Users>([{...NEW_USER}]);
    const [lengthChanged, setLengthChanged] = useState<Boolean>(false);
    const lastCardRef = useRef<HTMLDivElement>(null);

    //If card was added/removed, then scroll
    useEffect(() => {
        if (!lastCardRef.current) return;
        if (lengthChanged === true){
            lastCardRef.current.scrollIntoView();
            setLengthChanged(false);
        }
        
    }, [lengthChanged])

    const handleAdd = () => {
        let newUser: User = {...NEW_USER}
        setUsers([...users, newUser]);
        setLengthChanged(true);
    }

    const handleDelete = (userIdx: number) => {
        setUsers(users.filter((user, idx) => {
            return userIdx !== idx;
        }))
        setLengthChanged(true);
    }

    const handleUserChange = (changedUser: User, changeIdx: number) => {
        setUsers(users.map((user, idx) => {
            return idx === changeIdx ? changedUser : user;
        }))
    }

    const handleSubmit = () => {
        
    }

    const renderCards = () => {
        return users.map((user, idx) => {
            return (
                <div className='card-container' ref={idx === users.length - 1 ? lastCardRef : null}>
                    <Card 
                        idx={idx} 
                        user={user}
                        handleUserChange={handleUserChange}
                        handleDelete={handleDelete}
                    />
                </div>
            )
        })
    }

    return (
        <div className="list">
            {renderCards()}
            
            <div className='button-container'>
                <AddButton onClick={handleAdd}/>
                <SubmitButton onClick={handleSubmit}/>
            </div>
        </div>
    );
}

export default CardsList;
