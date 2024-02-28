import "./App.css";
import { Routes, Route, Navigate } from "react-router";

//components
import Lineup from "./pages/Lineup";
import Schedule from "./pages/Schedule";
import Navigation from "./components/Navigation";
import FullSchedule from "./pages/FullSchedule";
import MySchedule from "./pages/MySchedule";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";

function App() {
  const homeRoutes = [
    {
      routeLink: "/",
      routeName: "Lineup",
    },
    {
      routeLink: "schedule",
      routeName: "Schedule",
    },
  ];
  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Lineup />} />
        <Route path="schedule" element={<Schedule />}>
          <Route index element={<Navigate to="music" replace />} />
          <Route path="music" element={<FullSchedule />} />
          <Route path="my-schedule" element={<MySchedule />} />
        </Route>
      </Routes>
      <Navigation routes={homeRoutes} type="bottom-nav" />
    </Wrapper>
  );
}

export default App;
