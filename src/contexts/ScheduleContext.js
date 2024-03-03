import React, { createContext, useContext, useEffect, useState } from "react";
import concertData from "../data/scheduleData";
import formatDate from "../helpers/formatDate";

const ScheduleContext = createContext();

function ScheduleProvider({ children }) {
  const [scheduleData, setScheduleData] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);

  useEffect(() => {
    setScheduleData(concertData);
  }, []);

  const dayOneSchedule = formatDate(concertData[0].day, "long");

  const handleAddEventToSchedule = (
    selectedDay,
    selectedTimeSlot,
    selectedEvent
  ) => {
    const dayExists = mySchedule.find(
      (scheduledDay) => scheduledDay.day === selectedDay.day
    );

    if (dayExists) {
      const hourExists = dayExists.timeSlot.find(
        (hour) => hour.hour === selectedTimeSlot.hour
      );

      if (hourExists) {
        const eventExists = hourExists.events.find(
          (event) => event.title === selectedEvent.title
        );

        if (!eventExists) {
          hourExists.events.push(selectedEvent);
        }
      } else {
        dayExists.timeSlot.push({
          hour: selectedTimeSlot.hour,
          events: [selectedEvent],
        });
      }

      setMySchedule([...mySchedule]);
    } else {
      setMySchedule([
        ...mySchedule,
        {
          day: selectedDay.day,
          timeSlot: [{ hour: selectedTimeSlot.hour, events: [selectedEvent] }],
        },
      ]);
    }
  };

  return (
    <ScheduleContext.Provider
      value={{ scheduleData, dayOneSchedule, handleAddEventToSchedule }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

function useSchedule() {
  const context = useContext(ScheduleContext);
  return context;
}
export { ScheduleProvider, useSchedule };
