import { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getCachedOrFetch } from './utils/cache';
import { getPrediction } from './utils/gpt';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [prediction, setPrediction] = useState('');

  // ✅ Move this function outside of useEffect
  const handleEventClick = async (info) => {
    const gameDetails = info.event.title;
    setSelectedEvent(info.event);

    const prediction = await getCachedOrFetch(gameDetails, () =>
      getPrediction(gameDetails)
    );
    setPrediction(prediction);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(
          'https://www.thesportsdb.com/api/v1/json/792304/eventsnextleague.php?id=4414'
        );

        const formatted = res.data.events.map((e) => ({
          title: e.strEvent,
          date: e.dateEvent,
        }));

        setEvents(formatted);
      } catch (err) {
        console.error('Error fetching games:', err);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="App">
      <h1>Game Day Oracle 🏈</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
      {selectedEvent && (
        <div
          className="prediction-panel"
          style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '1rem' }}
        >
          <h2>{selectedEvent.title}</h2>
          <p>
            <strong>Prediction:</strong>
          </p>
          <pre>{prediction}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
