import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(logout());
        navigate('/login');
    }       
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};      

export default Logout;