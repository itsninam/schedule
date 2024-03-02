import React, { createContext, useContext, useEffect, useState } from "react";
import concertData from "../data/scheduleData";
import formatDate from "../helpers/formatDate";

const ScheduleContext = createContext();

function ScheduleProvider({ children }) {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    setScheduleData(concertData);
  }, []);

  const dayOneSchedule = formatDate(concertData[0].day, "long");

  return (
    <ScheduleContext.Provider value={{ scheduleData, dayOneSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
}

function useSchedule() {
  const context = useContext(ScheduleContext);
  return context;
}
export { ScheduleProvider, useSchedule };
