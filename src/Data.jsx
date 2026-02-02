import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const Data = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [editId, setEditId] = useState(null);
    const [users, setUsers] = useState([]);
    

    const API_URL = 'https://687907f963f24f1fdca08dd3.mockapi.io/user';

    // ✅ Fetch users
    const apiFetch = async () => {
        

            const res = await axios.get(API_URL);
            setUsers(res.data);
    }
        

    // ✅ Load users on mount
    useEffect(() => {
        apiFetch();
    }, []);

    // ✅ Add new user
    const callApi = async () => {
        
       

            const res = await axios.post(API_URL, {
                name,
                age,
                email,
                phone
            });

            // Append new user to list
            setUsers(prev => [...prev, res.data]);

            // Reset form
            resetForm();
        
    };

    // ✅ Update existing user
    const handelClick = async () => {
        try {
                const res = await axios.put(`${API_URL}/${editId}`, {
                    name,
                    age,
                    email,
                    phone
                });

                const updatedUsers = users.map(user =>
                    user.id === editId ? res.data : user
                );
                setUsers(updatedUsers);

                resetForm();
            } catch (error) {
                console.error("Error updating user:", error);
            }
    };

    // ✅ Delete user
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            const newUser= users.filter(user => user.id !== id)
            setUsers(newUser)
            // setUsers(prev => prev.filter(user => user.id !== id));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    // ✅ Start editing
    const startEdit = (user) => {
        setEditId(user.id);
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
        setPhone(user.phone);
    };

    // ✅ Cancel editing/reset form
    const handleCancel = () => {
        resetForm();
    };

    // ✅ Clear all form fields and reset edit state
    const resetForm = () => {
        setEditId(null);
        setName("");
        setEmail("");
        setAge("");
        setPhone("");
    };

    return (
        <div className='maindiv'>
            <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="number" placeholder='Enter your age' value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder='Enter your Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />

            {editId !== null ? (
                <div>
                    <button onClick={handelClick}>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <button onClick={callApi}>Add</button>
            )}

            <div className='table'>
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
                        { users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button onClick={() => startEdit(user)}>Edit</button>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Data;
