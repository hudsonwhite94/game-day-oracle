import { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await axios.get('https://www.thesportsdb.com/api/v1/json/YOUR_API_KEY/eventsnextleague.php?id=4391');
      const formatted = res.data.events.map(e => ({
        title: `${e.strEvent}`,
        date: e.dateEvent
      }));
      setEvents(formatted);
    };

    fetchGames();
  }, []);

  return (
    <div className="App">
      <h1>Game Day Oracle 🏈</h1>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
    </div>
  );
}

export default App;
