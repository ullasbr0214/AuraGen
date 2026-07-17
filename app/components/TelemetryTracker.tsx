"use client";

import { useEffect } from "react";
import TelemetryCard from "./TelemetryCard";
import { useTelemetryContext } from "../context/TelemetryContext";
import { getSocket } from "../services/socket";

export default function TelemetryTracker() {
  const { telemetry, setTelemetry } = useTelemetryContext();

  // Initialize socket once
  useEffect(() => {
    getSocket();
  }, []);

  // Mouse Movement
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) +
          Math.pow(e.clientY - lastY, 2)
      );

      const deltaTime = now - lastTime;

      const velocity =
        deltaTime > 0
          ? Math.round(distance / (deltaTime / 1000))
          : 0;

      setTelemetry((prev) => ({
        ...prev,
        mouseX: e.clientX,
        mouseY: e.clientY,
        velocity,
      }));

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, [setTelemetry]);

  // Click Tracking
  useEffect(() => {
    let lastClick = 0;

    const handleClick = () => {
      const now = Date.now();

      setTelemetry((prev) => ({
        ...prev,
        clicks: prev.clicks + 1,
        rapidClicks:
          now - lastClick < 300
            ? prev.rapidClicks + 1
            : prev.rapidClicks,
      }));

      lastClick = now;
    };

    window.addEventListener("click", handleClick);

    return () =>
      window.removeEventListener(
        "click",
        handleClick
      );
  }, [setTelemetry]);

  // Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      setTelemetry((prev) => ({
        ...prev,
        scrollCount: prev.scrollCount + 1,
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [setTelemetry]);

  // Keyboard Tracking
  useEffect(() => {
    const handleKeyDown = () => {
      setTelemetry((prev) => ({
        ...prev,
        keyPresses: prev.keyPresses + 1,
      }));
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [setTelemetry]);

  // Hesitation Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        hesitationTime: prev.hesitationTime + 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [setTelemetry]);

  // Send telemetry to backend every second
  useEffect(() => {
    const socket = getSocket();

    const interval = setInterval(() => {
      socket.emit("telemetry", {
        hesitation: telemetry.hesitationTime,
        clicks: telemetry.clicks,
        prompt: "Adaptive Dashboard",
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [telemetry]);

  return (
    <TelemetryCard
      mouseX={telemetry.mouseX}
      mouseY={telemetry.mouseY}
      velocity={telemetry.velocity}
      clicks={telemetry.clicks}
      rapidClicks={telemetry.rapidClicks}
      hesitationTime={telemetry.hesitationTime}
      scrollCount={telemetry.scrollCount}
      keyPresses={telemetry.keyPresses}
    />
  );
}