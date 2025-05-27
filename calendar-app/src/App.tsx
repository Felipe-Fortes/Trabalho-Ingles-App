import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Calendar from './components/Calendar';
import Notes from './components/Notes';
import VoiceNotes from './components/VoiceNotes';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Calendar App
            </Typography>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>
          <Calendar />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Notes />
            <VoiceNotes />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App; 