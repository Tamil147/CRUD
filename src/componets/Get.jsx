import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Get = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const API_URL = 'https://687907f963f24f1fdca08dd3.mockapi.io/user';

    useEffect(() => {
        axios.get(API_URL).then(res => setUsers(res.data));
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h2>User Details</h2>
           
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button onClick={() => navigate(`/update/${user.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />

             <button onClick={() => navigate('/post')}>Add User</button>
        </div>
    );
};

export default Get;
