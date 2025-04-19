import { useState } from "react";

import HomePage from "./home/home-page";
import Header from "./home/header";
import EventsPage from "./events/eventsPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div>
        <EventsPage></EventsPage>
      </div>
    </>
  );
}

export default App;
