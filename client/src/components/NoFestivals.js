import { useSchedule } from "../contexts/ScheduleContext";
import Loading from "./Loading";
import { useEffect } from "react";

function NoFestivals() {
  const { isLoading, fetchMyFestival } = useSchedule();

  useEffect(() => {
    fetchMyFestival();
  }, [fetchMyFestival]);

  if (isLoading) {
    return <Loading />;
  }

  return <p>No festival</p>;
}

export default NoFestivals;
