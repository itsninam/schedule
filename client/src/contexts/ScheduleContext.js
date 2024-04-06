import React, { createContext, useContext, useState, useEffect } from "react";
import formatDate from "../helpers/formatDate";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import getDayRoutes from "../helpers/getDayRoutes";
import getTimeSlotCategories from "../helpers/getTimeSlotCategories";

const ScheduleContext = createContext();

function ScheduleProvider({ children }) {
  const [scheduleData, setScheduleData] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [myFestival, setMyFestival] = useState([]);
  const [selectedFestival, setSelectedFestival] = useState([]);
  const [isEventAddedToSchedule, setIsEventAddedToSchedule] = useState({});
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isMySchedulePath = location.pathname.includes("my-schedule");
  const selectedFestId = selectedFestival.find((festival) => festival._id)?._id;

  useEffect(() => {
    fetchMyFestival();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchData();
    setUserInput("");
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/festival?festivalName=${userInput}`
      );
      setErrorMessage("");
      navigate("/lineup");
      setScheduleData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const fetchMyFestival = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:8000/myFestival");
      setErrorMessage("");
      setIsLoading(false);
      setMyFestival(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const dayRoutes = getDayRoutes(selectedFestival);
  console.log(dayRoutes, selectedFestival, "day");

  const dayOneSchedule =
    selectedFestival &&
    selectedFestival.length > 0 &&
    formatDate(selectedFestival[0].festivalData[0].day, "long");

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

  const addMyFestival = (data) => {
    const festivalExists = myFestival.some(
      (festival) => festival._id === data._id
    );

    if (!festivalExists) {
      // setMyFestival([...myFestival, data]);
    }

    const newFestival = {
      festivalName: data.festivalName,
      festivalImage: data.festivalImage,
      festivalDates: data.festivalDates,
      festivalLocation: data.festivalLocation,
      festivalThumbnail: data.festivalThumbnail,
      festivalData: data.festivalData,
    };

    axios
      .post("http://localhost:8000/addMyFestival", newFestival)
      .then((response) => {
        console.log("festival created");
      });
  };

  const handleSelectFestival = (festivalSelection) => {
    setSelectedFestival(
      myFestival.filter((festival) => festival._id === festivalSelection)
    );
  };

  const handleRemoveFestival = (festival) => {
    const filteredFestivals = myFestival.filter(
      (fest) => fest._id !== festival._id
    );
    setMyFestival(filteredFestivals);
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
        userInput,
        setUserInput,
        handleSubmit,
        isLoading,
        setIsLoading,
        errorMessage,
        addMyFestival,
        myFestival,
        handleSelectFestival,
        selectedFestival,
        selectedFestId,
        handleRemoveFestival,
        fetchMyFestival,
        setSelectedFestival,
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
