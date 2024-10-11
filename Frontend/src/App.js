import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'https://g1jd0yuxs1.execute-api.us-east-1.amazonaws.com/activity';

function App() {
    const [notes, setNotes] = useState([]); // State to store the list of notes
    const [noteContent, setNoteContent] = useState(''); // State to store the note content
    const [noteId, setNoteId] = useState(''); // State to store the note ID
    const [editMode, setEditMode] = useState(false); // State to manage edit mode

    useEffect(() => {
        fetchNotes(); // Fetch notes when the component mounts
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/notes`); // Fetch all notes from the API
            setNotes(JSON.parse(response.data.body)); // Update the notes state
            console.log('Notes fetched:', notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const addNote = async () => {
        try {
            await axios.post(`${apiUrl}/add`, { noteId, content: noteContent }); // Add a new note via the API
            console.log('Note added successfully!');
            fetchNotes(); // Refresh the list of notes
            setNoteContent(''); // Clear the note content input
            setNoteId(''); // Clear the note ID input
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const updateNote = async (id, content) => {
        try {
            await axios.put(`${apiUrl}/notes`, { noteId: id, content }); // Update an existing note via the API
            fetchNotes(); // Refresh the list of notes
            setEditMode(false); // Exit edit mode
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.post(`${apiUrl}/notes`,{noteId: id}); // Delete a note via the API
            fetchNotes(); // Refresh the list of notes
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="app-container">
            <h1> TODO App</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Note ID"
                    value={noteId}
                    onChange={(e) => setNoteId(e.target.value)} // Update note ID state on input change
                />
                <textarea
                    placeholder="Note Content"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)} // Update note content state on input change
                />
                <button onClick={addNote}>Add Note</button> 
            </div>
            <ul className="notes-list">
                {notes.map((note) => (
                    <li key={note.noteId} className="note-item">
                        <div className="note-header">
                            <span className="note-id">{note.noteId}</span>
                            <div className="note-actions">
                                <button
                                    className="edit-button"
                                    onClick={() => {
                                        setNoteId(note.noteId);
                                        setNoteContent(note.content);
                                        setEditMode(true); // Enter edit mode
                                    }}
                                >
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => deleteNote(note.noteId)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                        {editMode && noteId === note.noteId ? (
                            <div className="edit-container">
                                <textarea
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)} // Update note content state on input change
                                />
                                <button
                                    className="save-button"
                                    onClick={() => {
                                        updateNote(note.noteId, noteContent); // Save updated note content
                                        setNoteId('');
                                        setNoteContent('');
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <p className="note-content">{note.content}</p> // Display note content
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
