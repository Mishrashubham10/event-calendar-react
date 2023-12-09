/* eslint-disable react/prop-types */
import clsx from 'clsx';
// import './calender.css';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  isToday,
} from 'date-fns';
import { useMemo } from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = ({ events }) => {
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, event) => {
      const dateKey = format(event.date, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  const startingDayIndex = getDay(firstDayOfMonth);

  return (
    <div className="container max-auto p-4">
      <div className="mb-4">
        <h2 className="header text-center font-bold mb-2">{format(currentDate, 'MMMM yyyy')}</h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => {
          return (
            <div className="day font-bold text-center" key={day}>
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div className="date" key={`empty-${index}`} />;
        })}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <div
              className={clsx('border rounded-md p-2 text-center date', {
                'bd-gray-200': isToday(day),
                'text-gray-900': isToday(day),
              })}
              key={index}
            >
              {format(day, 'd')}
              {todaysEvents.map((event) => {
                return (
                  <div
                    className="bg-green-500 rounded-md text-gray-900 event"
                    key={event.title}
                  >
                    {event.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;