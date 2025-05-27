import React, { useState } from 'react';
import { Paper, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import { Delete, Mic, Stop } from '@mui/icons-material';
import { useReactMediaRecorder } from 'react-media-recorder';

interface VoiceNote {
  id: number;
  url: string;
  date: Date;
}

const VoiceNotes: React.FC = () => {
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      if (blobUrl) {
        setVoiceNotes([
          ...voiceNotes,
          {
            id: Date.now(),
            url: blobUrl,
            date: new Date(),
          },
        ]);
      }
    },
  });

  const handleDeleteNote = (id: number) => {
    setVoiceNotes(voiceNotes.filter(note => note.id !== id));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: '50%' }}>
      <Typography variant="h6" gutterBottom>
        Voice Notes
      </Typography>
      <Button
        variant="contained"
        color={status === 'recording' ? 'error' : 'primary'}
        startIcon={status === 'recording' ? <Stop /> : <Mic />}
        onClick={status === 'recording' ? stopRecording : startRecording}
        sx={{ mb: 2 }}
      >
        {status === 'recording' ? 'Stop Recording' : 'Start Recording'}
      </Button>
      <List>
        {voiceNotes.map((note) => (
          <ListItem key={note.id} divider>
            <ListItemText
              primary={
                <audio controls src={note.url}>
                  Your browser does not support the audio element.
                </audio>
              }
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

export default VoiceNotes; 