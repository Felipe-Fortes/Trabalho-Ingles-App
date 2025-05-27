import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  notes?: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ start, end });
    setIsDialogOpen(true);
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          title: newEvent.title,
          start: newEvent.start,
          end: newEvent.end,
          notes: newEvent.notes,
        },
      ]);
      setIsDialogOpen(false);
      setNewEvent({});
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const EventComponent = ({ event }: { event: Event }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <span>{event.title}</span>
      <Tooltip title="Delete Event">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteEvent(event.id);
          }}
          style={{ padding: '2px' }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <Paper elevation={3} sx={{ p: 2, height: '600px' }}>
      <Box sx={{ height: '100%' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectSlot={handleSelect}
          selectable
          views={['month', 'week', 'day']}
          components={{
            event: EventComponent
          }}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            value={newEvent.title || ''}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Notes (optional)"
            fullWidth
            multiline
            rows={3}
            value={newEvent.notes || ''}
            onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateEvent}
            disabled={!newEvent.title}
            variant="contained"
          >
            Create Event
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Calendar; 