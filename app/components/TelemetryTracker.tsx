"use client";

import { useEffect, useState } from "react";
import TelemetryCard from "./TelemetryCard";

export default function TelemetryTracker() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [velocity, setVelocity] = useState(0);

  const [clicks, setClicks] = useState(0);

  const [rapidClicks, setRapidClicks] = useState(0);

  const [hesitationTime, setHesitationTime] = useState(0);

  const [scrollCount, setScrollCount] = useState(0);

  const [keyPresses, setKeyPresses] = useState(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);

      const now = Date.now();

      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) +
        Math.pow(e.clientY - lastY, 2)
      );

      const deltaTime = now - lastTime;

      if (deltaTime > 0) {
        setVelocity(Math.round(distance / (deltaTime / 1000)));
      }

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let lastClick = 0;

    const handleClick = () => {
      setClicks((prev) => prev + 1);

      const now = Date.now();

      if (now - lastClick < 300) {
        setRapidClicks((prev) => prev + 1);
      }

      lastClick = now;
    };

    window.addEventListener("click", handleClick);

    return () =>
      window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollCount((prev) => prev + 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = () => {
      setKeyPresses((prev) => prev + 1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHesitationTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TelemetryCard
      mouseX={mouseX}
      mouseY={mouseY}
      velocity={velocity}
      clicks={clicks}
      rapidClicks={rapidClicks}
      hesitationTime={hesitationTime}
      scrollCount={scrollCount}
      keyPresses={keyPresses}
    />
  );
}