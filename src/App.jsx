import Calendar from './pages/calendar/Calendar';
import { addDays, subDays } from 'date-fns';

const App = () => {
  return (
    <div className='bg-black text-white h-[100vh] w-full flex justify-center'>
      <Calendar events={[
        { date: subDays(new Date(), 1), title: "Coding" },
        { date: subDays(new Date(), 3), title: "Reading" },
        { date: addDays(new Date(), 6), title: "Exploring" },
      ]} />
    </div>
  );
};

export default App;
