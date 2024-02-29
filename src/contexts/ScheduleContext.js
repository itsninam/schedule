import React, { createContext, useContext, useEffect, useState } from "react";
import concertData from "../data/scheduleData";

const ScheduleContext = createContext();

function ScheduleProvider({ children }) {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    setScheduleData(concertData);
  }, []);

  // const thursdayData = scheduleData.filter((event) => event.day === "Thursday");
  return (
    <ScheduleContext.Provider value={{ scheduleData }}>
      {children}
    </ScheduleContext.Provider>
  );
}

function useSchedule() {
  const context = useContext(ScheduleContext);
  return context;
}
export { ScheduleProvider, useSchedule };
