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
  const isMySchedulePath = location.pathname.includes("my-schedule");

  useEffect(() => {
    setScheduleData(concertData);
  }, []);

  const dayOneSchedule = formatDate(concertData[0].festivalData[0].day, "long");

  const handleTimeSlotCategories = (selectedDay) => {
    const category = [
      ...new Set(
        selectedDay
          .flatMap((day) => day.timeSlot)
          .map((day) => day.category)
          .sort((a, b) => a - b)
      ),
    ];

    return category;
  };

  const filterEvents = (selectedEvent) => {
    const updatedSchedule = mySchedule.map((festival) => ({
      ...festival,
      festivalData: festival.festivalData.map((day) => ({
        ...day,
        timeSlot: day.timeSlot.filter(
          (slot) => slot.title !== selectedEvent.title
        ),
      })),
    }));

    setTimeout(() => {
      setMySchedule(updatedSchedule);
    }, 500);
  };

  const handleSelectCheckmark = (selectedEvent) => {
    setIsEventAddedToSchedule({
      ...isEventAddedToSchedule,
      [selectedEvent.title]: !isEventAddedToSchedule[selectedEvent.title],
    });
  };

  const handleRemoveEvent = (selectedEvent, eventItemRef = 0) => {
    filterEvents(selectedEvent);
    handleSelectCheckmark(selectedEvent);

    eventItemRef.current.classList.add("remove-slide-left");
  };

  const handleAddEventToSchedule = (selectedDay, selectedEvent) => {
    const dayExists = mySchedule.find((festival) =>
      festival.festivalData.some(
        (day) => day.day.toDateString() === selectedDay.day.toDateString()
      )
    );

    if (dayExists) {
      const eventExists = dayExists.festivalData.some((day) =>
        day.timeSlot.some((event) => event.title === selectedEvent.title)
      );

      if (eventExists) {
        if (!isMySchedulePath) {
          filterEvents(selectedEvent);
        }
      } else {
        setMySchedule(
          mySchedule.map((festival) => ({
            ...festival,
            festivalData: festival.festivalData.map((day) =>
              day.day.toDateString() === selectedDay.day.toDateString()
                ? { ...day, timeSlot: [...day.timeSlot, selectedEvent] }
                : day
            ),
          }))
        );
      }
    } else {
      setMySchedule([
        ...mySchedule,
        {
          festivalName: "Electric Forest", // Replace with actual festival name
          festivalData: [
            {
              day: selectedDay.day,
              timeSlot: [selectedEvent],
            },
          ],
        },
      ]);
    }

    handleSelectCheckmark(selectedEvent);
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
        isMySchedulePath,
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
