"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type GeneratedComponent = {
  id: number;
  title: string;
  description: string;
  jsx: string;
};

type AuraContextType = {
  // Prompt
  prompt: string;
  setPrompt: (value: string) => void;

  // AI Response
  response: string;
  setResponse: (value: string) => void;

  // Generated Code
  generatedCode: string;
  setGeneratedCode: (value: string) => void;

  // AI Status
  aiStatus: string;
  setAiStatus: (value: string) => void;

  // Cognitive Metrics
  cognitiveLoad: number;
  setCognitiveLoad: (value: number) => void;

  stressLevel: string;
  setStressLevel: (value: string) => void;

  focusScore: number;
  setFocusScore: (value: number) => void;

  // Generated Components
  generatedComponents: GeneratedComponent[];
  setGeneratedComponents: (
    value: GeneratedComponent[]
  ) => void;

  addGeneratedComponent: (
    component: GeneratedComponent
  ) => void;
};

const AuraContext = createContext<AuraContextType | undefined>(
  undefined
);

export function AuraProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [prompt, setPrompt] = useState("");

  const [response, setResponse] = useState(
    "👋 Welcome to AuraGen."
  );

const [generatedCode, _setGeneratedCode] = useState("");

const setGeneratedCode = (value: string) => {
  console.log("========== AuraContext ==========");
  console.log("Saving Generated JSX:");
  console.log(value);
  console.log("=================================");

  _setGeneratedCode(value);
};

  const [aiStatus, setAiStatus] = useState("Ready");

  const [cognitiveLoad, setCognitiveLoad] = useState(0);

  const [stressLevel, setStressLevel] =
    useState("Unknown");

  const [focusScore, setFocusScore] =
    useState(0);

  const [generatedComponents, setGeneratedComponents] =
    useState<GeneratedComponent[]>([]);

  const addGeneratedComponent = (
    component: GeneratedComponent
  ) => {
    setGeneratedComponents((prev) => [
      component,
      ...prev,
    ]);
  };

  return (
    <AuraContext.Provider
      value={{
        prompt,
        setPrompt,

        response,
        setResponse,

        generatedCode,
        setGeneratedCode,

        aiStatus,
        setAiStatus,

        cognitiveLoad,
        setCognitiveLoad,

        stressLevel,
        setStressLevel,

        focusScore,
        setFocusScore,

        generatedComponents,
        setGeneratedComponents,

        addGeneratedComponent,
      }}
    >
      {children}
    </AuraContext.Provider>
  );
}

export function useAura() {
  const context = useContext(AuraContext);

  if (!context) {
    throw new Error(
      "useAura must be used inside AuraProvider"
    );
  }

  return context;
}