import React, { createContext, useContext, useEffect, useState } from "react";
import concertData from "../data/scheduleData";
import formatDate from "../helpers/formatDate";
import { useLocation } from "react-router";

const ScheduleContext = createContext();

function ScheduleProvider({ children }) {
  const [scheduleData, setScheduleData] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [isEventAddedToSchedule, setIsEventAddedToSchedule] = useState({});

  const location = useLocation();

  useEffect(() => {
    setScheduleData(concertData);
  }, []);

  const dayOneSchedule = formatDate(concertData[0].day, "long");

  const handleTimeSlotCategories = (selectedDay) => {
    const category = [
      ...new Set(
        selectedDay.flatMap((day) => day.timeSlot).map((day) => day.category)
      ),
    ];

    return category;
  };

  const handleRemoveEvent = (selectedEvent) => {
    if (location.pathname.includes("my-schedule")) {
      const updatedSchedule = mySchedule.map((schedule) => ({
        ...schedule,
        timeSlot: schedule.timeSlot.filter(
          (slot) => slot.title !== selectedEvent.title
        ),
      }));

      setMySchedule(updatedSchedule);
    }
  };

  console.log(mySchedule);

  const handleAddEventToSchedule = (selectedDay, selectedEvent) => {
    console.log(selectedDay.id, selectedEvent);

    const dayExists = mySchedule.find(
      (schedule) => schedule.day === selectedDay.day
    );

    if (dayExists) {
      const eventExists = dayExists.timeSlot.find(
        (event) => event.title === selectedEvent.title
      );

      if (!eventExists) {
        setMySchedule(
          mySchedule.map((schedule) =>
            schedule.day === selectedDay.day
              ? { ...schedule, timeSlot: [...schedule.timeSlot, selectedEvent] }
              : schedule
          )
        );
      }
    } else {
      setMySchedule([
        ...mySchedule,
        { day: selectedDay.day, timeSlot: [selectedEvent] },
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
        mySchedule,
        isEventAddedToSchedule,
        handleRemoveEvent,
        handleTimeSlotCategories,
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
