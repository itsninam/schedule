import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { ScheduleProvider } from "./contexts/ScheduleContext";
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
import DayTwoSchedule from "./pages/DayTwoSchedule";

function App() {
  return (
    <ScheduleProvider>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Lineup />} />
          <Route path="schedule" element={<Schedule />}>
            <Route index element={<Navigate to="music" replace />} />
            <Route path="music" element={<FullSchedule />}>
              <Route index element={<Navigate to="day-1" replace />} />
              <Route path="day-1" element={<DayOneSchedule />} />
              <Route path="day-2" element={<DayTwoSchedule />} />
            </Route>
            <Route path="my-schedule" element={<MySchedule />} />
          </Route>
        </Routes>
        <Navigation routes={homeRoutes} type="bottom-nav" />
      </Wrapper>
    </ScheduleProvider>
  );
}

export default App;
