"use client";

import { useEffect, useRef } from "react";
import TelemetryCard from "./TelemetryCard";
import { useTelemetryContext } from "../context/TelemetryContext";
import { getSocket } from "../services/socket";

export default function TelemetryTracker() {
  const { telemetry, setTelemetry } = useTelemetryContext();
  const lastInteraction = useRef(Date.now());
  const lastClick = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const markInteraction = () => {
      lastInteraction.current = Date.now();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const dt = Math.max(now - lastMouse.current.time, 1);
      const velocity = Math.round(Math.sqrt(dx * dx + dy * dy) / (dt / 1000));

      lastMouse.current = { x: e.clientX, y: e.clientY, time: now };
      markInteraction();

      setTelemetry((prev) => ({
        ...prev,
        mouseX: e.clientX,
        mouseY: e.clientY,
        velocity: Math.min(2000, velocity),
      }));
    };

    const handleClick = () => {
      const now = Date.now();
      const rapid = lastClick.current > 0 && now - lastClick.current < 350;
      lastClick.current = now;
      markInteraction();

      setTelemetry((prev) => ({
        ...prev,
        clicks: prev.clicks + 1,
        rapidClicks: rapid ? prev.rapidClicks + 1 : prev.rapidClicks,
      }));
    };

    const handleScroll = () => {
      markInteraction();
      setTelemetry((prev) => ({
        ...prev,
        scrollCount: prev.scrollCount + 1,
      }));
    };

    const handleKeyDown = () => {
      markInteraction();
      setTelemetry((prev) => ({
        ...prev,
        keyPresses: prev.keyPresses + 1,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    const timer = window.setInterval(() => {
      const hesitationSeconds = Math.min(
        Math.round((Date.now() - lastInteraction.current) / 1000),
        30
      );

      setTelemetry((prev) => ({
        ...prev,
        hesitationTime: hesitationSeconds,
      }));
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.clearInterval(timer);
    };
  }, [setTelemetry]);

  const telemetryRef = useRef(telemetry);

  useEffect(() => {
    telemetryRef.current = telemetry;
  }, [telemetry]);

  useEffect(() => {
    const socket = getSocket();
    const sendTelemetry = () => {
      if (socket.connected) {
        socket.emit("telemetry", telemetryRef.current);
      }
    };

    sendTelemetry();
    const interval = window.setInterval(sendTelemetry, 1000);
    return () => window.clearInterval(interval);
  }, []);

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
