"use client";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";

const uri = "https://ashwa.ddns.net";

const socket = io(uri);

const ScoreContext = createContext();

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(null);

  const handleScore = (data) => {
    setScore(data);
  };

  useEffect(() => {
    socket.on("scoreUpdate", handleScore);
    return () => {
      socket.off("scoreUpdate", handleScore);
    };
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        score,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

const useScore = () => useContext(ScoreContext);

export { ScoreProvider, useScore };
