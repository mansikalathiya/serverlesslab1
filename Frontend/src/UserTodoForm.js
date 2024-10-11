import React, { useState } from 'react';
import axios from 'axios';

const UserTodoForm = () => {
    const [userName, setUserName] = useState('');
    const [todoTitle, setTodoTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://d2yyl8i298.execute-api.us-east-1.amazonaws.com/users/user', {
                userName,
                todoTitle,
                description
            });
            console.log('Todo list created:', response.data);
            // Clear form
            setUserName('');
            setTodoTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating todo list:', error);
        }
    };

    return (
        <div className="todo-form-container">
            <h2>Create New Todo List</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userName">Your Name:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="todoTitle">Todo List Title:</label>
                    <input
                        type="text"
                        id="todoTitle"
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                    />
                </div>
                <button type="submit">Create Todo List</button>
            </form>
        </div>
    );
};

export default UserTodoForm;