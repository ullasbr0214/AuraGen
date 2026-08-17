"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error) {
    console.error("Dynamic Renderer Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <h2 className="text-xl font-bold text-red-400">
            Component Rendering Failed
          </h2>

          <p className="mt-2 text-slate-300">
            AuraGen automatically prevented the dashboard from crashing.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}