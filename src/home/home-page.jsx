import React from "react";
import Header from "./header";
import Main from "./main";

const HomePage = () => {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(to bottom, " +
          "#CAF0F8 0%, " +
          "#90E0EF 37%, " +
          "#00B4D8 68%, " +
          "#0077B6 100%)",
      }}
    >
      <Main />
    </div>
  );
};
export default HomePage;
