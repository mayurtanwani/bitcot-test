import React from "react";

const Backdrop = ({ sidebar, closesidebar }) => {
  return (
    <div
      className={sidebar ? "backdrop backdropopen" : "backdrop"}
      onClick={closesidebar}
    ></div>
  );
};

export default Backdrop;
