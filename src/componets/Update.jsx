import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const API_URL = 'https://687907f963f24f1fdca08dd3.mockapi.io/user';

    useEffect(() => {
        axios.get(`${API_URL}/${id}`).then(res => {
            setName(res.data.name);
            setAge(res.data.age);
            setEmail(res.data.email);
            setPhone(res.data.phone);
        });
    }, [id]);

    const handleUpdate = async () => {
        await axios.put(`${API_URL}/${id}`, { name, age, email, phone });
        navigate('/');
         setName("");
            setAge("");
            setEmail("");
            setPhone("");
    };

    return (
        <div>
            <h2>Update User</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
            <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default Update;
