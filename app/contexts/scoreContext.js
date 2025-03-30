"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ScoreContext = createContext();

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(null);

  const handleScore = (data) => {
    setScore({
      scores: [
        {
          event: "Logo launch",
          scores: { Atreides: 25, Arrakis: 25, Winterfell: 25, Zephandor: 25 },
        },
        {
          event: "Recitation (Mal)",
          scores: { Atreides: 6, Arrakis: 0, Winterfell: 0, Zephandor: 3 },
        },
        {
          event: "Extempore (Mal)",
          scores: { Atreides: 0, Arrakis: 1, Winterfell: 0, Zephandor: 8 },
        },
        {
          event: "Pencil Drawing",
          scores: { Atreides: 3, Arrakis: 6, Winterfell: 0, Zephandor: 3 },
        },
        {
          event: "Debate (Eng)",
          scores: { Atreides: 10, Arrakis: 3, Winterfell: 0, Zephandor: 5 },
        },
        {
          event: "Painting",
          scores: { Atreides: 8, Arrakis: 0, Winterfell: 0, Zephandor: 1 },
        },
        {
          event: "Mehendi",
          scores: { Atreides: 4, Arrakis: 1, Winterfell: 5, Zephandor: 3 },
        },
        {
          event: "Face Painting",
          scores: { Atreides: 1, Arrakis: 5, Winterfell: 3, Zephandor: 4 },
        },
        {
          event: "JAM (Mal)",
          scores: { Atreides: 2, Arrakis: 0, Winterfell: 0, Zephandor: 8 },
        },
        {
          event: "Recitation (Hindi)",
          scores: { Atreides: 7, Arrakis: 5, Winterfell: 0, Zephandor: 0 },
        },
        {
          event: "Recitation (Eng)",
          scores: { Atreides: 8, Arrakis: 0, Winterfell: 1, Zephandor: 0 },
        },
        {
          event: "Extempore(Eng)",
          scores: { Atreides: 5, Arrakis: 5, Winterfell: 0, Zephandor: 0 },
        },
        {
          event: "JAM (Eng)",
          scores: { Atreides: 6, Arrakis: 6, Winterfell: 0, Zephandor: 1 },
        },
        {
          event: "Poetry (Hindi)",
          scores: { Atreides: 3, Arrakis: 1, Winterfell: 5, Zephandor: 0 },
        },
        {
          event: "Poetry (Mal)",
          scores: { Atreides: 0, Arrakis: 1, Winterfell: 3, Zephandor: 5 },
        },
        {
          event: "Clay Modelling ",
          scores: { Atreides: 10, Arrakis: 5, Winterfell: 3, Zephandor: 3 },
        },
        {
          event: "Collage ",
          scores: { Atreides: 2, Arrakis: 3, Winterfell: 5, Zephandor: 0 },
        },
        {
          event: "Short Story (Mal)",
          scores: { Atreides: 5, Arrakis: 0, Winterfell: 3, Zephandor: 1 },
        },
        {
          event: "Essay (Mal)",
          scores: { Atreides: 0, Arrakis: 3, Winterfell: 0, Zephandor: 6 },
        },
        {
          event: "Debate (Mal)",
          scores: { Atreides: 5, Arrakis: 3, Winterfell: 0, Zephandor: 10 },
        },
        {
          event: "Poetry (Eng)",
          scores: { Atreides: 3, Arrakis: 5, Winterfell: 0, Zephandor: 1 },
        },
        {
          event: "Mappilapattu",
          scores: { Atreides: 0, Arrakis: 8, Winterfell: 10, Zephandor: 0 },
        },
        {
          event: "Vattapattu",
          scores: { Atreides: 10, Arrakis: 5, Winterfell: 3, Zephandor: 0 },
        },
        {
          event: "Step and Syncro (B)",
          scores: { Atreides: 20, Arrakis: 10, Winterfell: 0, Zephandor: 5 },
        },
        {
          event: "DOC (B)",
          scores: { Atreides: 0, Arrakis: 40, Winterfell: 20, Zephandor: 0 },
        },
        {
          event: "Fancy Dress",
          scores: { Atreides: 0, Arrakis: 3, Winterfell: 5, Zephandor: 13 },
        },
        {
          event: "Eastern Group Dance",
          scores: { Atreides: 3, Arrakis: 5, Winterfell: 3, Zephandor: 10 },
        },
        {
          event: "Carricature",
          scores: { Atreides: 0, Arrakis: 3, Winterfell: 6, Zephandor: 1 },
        },
        {
          event: "Spot Dubbing",
          scores: { Atreides: 8, Arrakis: 0, Winterfell: 10, Zephandor: 0 },
        },
        {
          event: "Mimicry",
          scores: { Atreides: 4, Arrakis: 0, Winterfell: 0, Zephandor: 5 },
        },
        {
          event: "Wall Painting",
          scores: { Atreides: 5, Arrakis: 3, Winterfell: 10, Zephandor: 0 },
        },
        {
          event: "Beat Box",
          scores: { Atreides: 9, Arrakis: 0, Winterfell: 0, Zephandor: 1 },
        },
        {
          event: "Thiruvathira",
          scores: { Atreides: 3, Arrakis: 5, Winterfell: 10, Zephandor: 5 },
        },
        {
          event: "Short Film",
          scores: { Atreides: 10, Arrakis: 0, Winterfell: 0, Zephandor: 20 },
        },
        {
          event: "Oppana",
          scores: { Atreides: 3, Arrakis: 5, Winterfell: 10, Zephandor: 5 },
        },
        {
          event: "Essay (Eng)",
          scores: { Atreides: 4, Arrakis: 0, Winterfell: 0, Zephandor: 5 },
        },
        {
          event: "Love Letter (Mal)",
          scores: { Atreides: 7, Arrakis: 0, Winterfell: 0, Zephandor: 3 },
        },
        {
          event: "Keyboard",
          scores: { Atreides: 1, Arrakis: 3, Winterfell: 0, Zephandor: 5 },
        },
        {
          event: "Guitar",
          scores: { Atreides: 0, Arrakis: 1, Winterfell: 0, Zephandor: 8 },
        },
        {
          event: "Couple Portrait",
          scores: { Atreides: 2, Arrakis: 0, Winterfell: 5, Zephandor: 6 },
        },
        {
          event: "Classical Solo Dance",
          scores: { Atreides: 8, Arrakis: 0, Winterfell: 3, Zephandor: 10 },
        },
        {
          event: "Eastern Group Song",
          scores: { Atreides: 5, Arrakis: 10, Winterfell: 0, Zephandor: 0 },
        },
        {
          event: "AOC (B)",
          scores: { Atreides: 0, Arrakis: 20, Winterfell: 40, Zephandor: 20 },
        },
        {
          event: "Love Letter (Eng)",
          scores: { Atreides: 3, Arrakis: 0, Winterfell: 0, Zephandor: 6 },
        },
        {
          event: "Short Story (Eng)",
          scores: { Atreides: 1, Arrakis: 1, Winterfell: 0, Zephandor: 8 },
        },
        {
          event: "Duet Song",
          scores: { Atreides: 5, Arrakis: 3, Winterfell: 0, Zephandor: 10 },
        },
        {
          event: "Classical Solo Song",
          scores: { Atreides: 3, Arrakis: 5, Winterfell: 10, Zephandor: 0 },
        },
        {
          event: "Western Solo Song",
          scores: { Atreides: 10, Arrakis: 15, Winterfell: 0, Zephandor: 3 },
        },
        {
          event: "Step and Syncro (B&G)",
          scores: { Atreides: 10, Arrakis: 25, Winterfell: 0, Zephandor: 0 },
        },
        {
          event: "Step and Syncro (G)",
          scores: { Atreides: 0, Arrakis: 5, Winterfell: 0, Zephandor: 30 },
        },
        {
          event: "VOC (G)",
          scores: { Atreides: 0, Arrakis: 10, Winterfell: 20, Zephandor: 30 },
        },
        {
          event: "Band",
          scores: { Atreides: 10, Arrakis: 3, Winterfell: 3, Zephandor: 5 },
        },
        {
          event: "Choreo Night",
          scores: { Atreides: 10, Arrakis: 20, Winterfell: 0, Zephandor: 5 },
        },
      ],
      totalScores: {
        totalAtredies: 267,
        totalArrakis: 286,
        totalWinterfell: 221,
        totalZephandor: 306,
      },
    });
  };

  useEffect(() => {
    handleScore();
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
