import { useSchedule } from "../contexts/ScheduleContext";
import Loading from "./Loading";

function NoFestivals() {
  const { isLoading } = useSchedule();

  if (isLoading) {
    return <Loading />;
  }

  return <p>No festival</p>;
}

export default NoFestivals;
