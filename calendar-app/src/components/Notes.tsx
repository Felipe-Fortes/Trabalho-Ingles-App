import React, { useState } from 'react';
import { Paper, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface Note {
  id: number;
  text: string;
  date: Date;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text: newNote,
          date: new Date(),
        },
      ]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: '50%' }}>
      <Typography variant="h6" gutterBottom>
        Written Notes
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write your note here..."
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNote}
        disabled={!newNote.trim()}
        sx={{ mb: 2 }}
      >
        Add Note
      </Button>
      <List>
        {notes.map((note) => (
          <ListItem key={note.id} divider>
            <ListItemText
              primary={note.text}
              secondary={note.date.toLocaleString()}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteNote(note.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Notes; 