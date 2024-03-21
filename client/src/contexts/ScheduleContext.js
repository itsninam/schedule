import React, { createContext, useContext, useEffect, useState } from "react";
import formatDate from "../helpers/formatDate";
import { useLocation } from "react-router";
import axios from "axios";
import getDayRoutes from "../helpers/getDayRoutes";
import getTimeSlotCategories from "../helpers/getTimeSlotCategories";

const ScheduleContext = createContext();

function ScheduleProvider({ children }) {
  const [scheduleData, setScheduleData] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [isEventAddedToSchedule, setIsEventAddedToSchedule] = useState({});

  const location = useLocation();
  const isMySchedulePath = location.pathname.includes("my-schedule");

  const query = "Veld";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/festival?festivalName=${query}`
      );
      setScheduleData(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dayRoutes = getDayRoutes(scheduleData);

  const dayOneSchedule =
    scheduleData &&
    scheduleData.length > 0 &&
    formatDate(scheduleData[0].festivalData[0].day, "long");

  const handleTimeSlotCategories = (selectedDay) => {
    const category = getTimeSlotCategories(selectedDay);

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

  const handleAddEventToSchedule = (day, selectedDays, selectedEvent) => {
    const festivalName = selectedDays.find(
      (day) => day.festivalName
    ).festivalName;

    const festivalExists = mySchedule.find(
      (day) => day.festivalName === festivalName
    );

    if (festivalExists) {
      const dayExists = festivalExists.festivalData.find(
        (data) => data.day === day.day
      );

      if (dayExists) {
        const eventExists = dayExists.timeSlot.find(
          (slot) => slot.title === selectedEvent.title
        );

        if (!eventExists) {
          dayExists.timeSlot.push(selectedEvent);
        } else {
          if (!isMySchedulePath) {
            filterEvents(selectedEvent);
          }
        }
      } else {
        festivalExists.festivalData.push({
          id: day.id,
          day: day.day,
          timeSlot: [selectedEvent],
        });
      }
    } else {
      setMySchedule([
        ...mySchedule,
        {
          festivalName: selectedDays[0].festivalName,
          festivalImage: selectedDays[0].festivalImage,
          festivalData: [
            {
              id: day.id,
              day: day.day,
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
        dayRoutes,
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
