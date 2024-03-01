import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { useSchedule } from "./contexts/ScheduleContext";
import homeRoutes from "./data/homeRoutes";

//components
import Lineup from "./pages/Lineup";
import Schedule from "./pages/Schedule";
import Navigation from "./components/Navigation";
import FullSchedule from "./pages/FullSchedule";
import MySchedule from "./pages/MySchedule";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import DayOneSchedule from "./pages/DayOneSchedule";

function App() {
  const { scheduleData, dayOneSchedule } = useSchedule();
  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Lineup />} />
        <Route path="schedule" element={<Schedule />}>
          <Route index element={<Navigate to="music" replace />} />
          <Route path="music" element={<FullSchedule />}>
            <Route index element={<Navigate to={dayOneSchedule} replace />} />
            {scheduleData.map((day) => {
              return (
                <Route
                  key={day.day}
                  path={`/schedule/music/:day`}
                  element={<DayOneSchedule />}
                />
              );
            })}
          </Route>
          <Route path="my-schedule" element={<MySchedule />} />
        </Route>
      </Routes>
      <Navigation routes={homeRoutes} type="bottom-nav" />
    </Wrapper>
  );
}

export default App;
