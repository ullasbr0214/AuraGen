"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuraContextType = {
  prompt: string;
  setPrompt: (value: string) => void;

  response: string;
  setResponse: (value: string) => void;

  generatedCode: string;
  setGeneratedCode: (value: string) => void;
};

const AuraContext = createContext<AuraContextType | undefined>(undefined);

export function AuraProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(
    "👋 Welcome to AuraGen."
  );

  const [generatedCode, setGeneratedCode] = useState(
`// Start coding here...

function hello() {
  console.log("Hello AuraGen!");
}`
  );

  return (
    <AuraContext.Provider
      value={{
        prompt,
        setPrompt,
        response,
        setResponse,
        generatedCode,
        setGeneratedCode,
      }}
    >
      {children}
    </AuraContext.Provider>
  );
}

export function useAura() {
  const context = useContext(AuraContext);

  if (!context) {
    throw new Error("useAura must be used inside AuraProvider");
  }

  return context;
}