import React, { createContext, useContext, useEffect, useState } from "react";
import concertData from "../data/scheduleData";
import formatDate from "../helpers/formatDate";
import { useLocation, useNavigate } from "react-router";

const ScheduleContext = createContext();

function ScheduleProvider({ children }) {
  const [scheduleData, setScheduleData] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [isEventAddedToSchedule, setIsEventAddedToSchedule] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setScheduleData(concertData);
  }, []);

  const dayOneSchedule = formatDate(concertData[0].day, "long");

  //sort days in my schedule
  const myScheduleSortedDays =
    mySchedule.length > 0
      ? mySchedule.sort(function (a, b) {
          return new Date(a.day) - new Date(b.day);
        })
      : null;

  const myScheduleDayOne =
    mySchedule.length > 0
      ? formatDate(myScheduleSortedDays[0].day, "long")
      : null;

  const handleRemoveItem = (selectedEvent) => {
    if (location.pathname.includes("my-schedule")) {
      const updatedSchedule = mySchedule.map((schedule) => ({
        ...schedule,
        timeSlot: schedule.timeSlot.map((slot) => ({
          ...slot,
          events: slot.events.filter((event) => event.title !== selectedEvent),
        })),
      }));

      setMySchedule(updatedSchedule);
    }
  };

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

    setIsEventAddedToSchedule({
      ...isEventAddedToSchedule,
      [selectedEvent.title]: !isEventAddedToSchedule[selectedEvent.title],
    });
  };

  return (
    <ScheduleContext.Provider
      value={{
        scheduleData,
        dayOneSchedule,
        handleAddEventToSchedule,
        myScheduleDayOne,
        mySchedule,
        isEventAddedToSchedule,
        handleRemoveItem,
      }}
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
