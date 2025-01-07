"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  selectedQuiz: any;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<any>>;
  quizResponse: any;
  setQuizResponse: React.Dispatch<React.SetStateAction<any>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<any>({});
  const [quizResponse, setQuizResponse] = useState<any>({});

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        selectedQuiz,
        setSelectedQuiz,
        quizResponse,
        setQuizResponse,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
