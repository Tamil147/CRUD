import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const API_URL = 'https://687907f963f24f1fdca08dd3.mockapi.io/user';

    const handleSubmit = async () => {
        if (name !== "" && age !== "" && email) {
            await axios.post(API_URL, { name, age, email, phone });
            navigate('/');
        }
        console.log("plese Enter user name...!");
    };

    return (
        <div>
            <h2>Add User</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />
            <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
};

export default Post;
