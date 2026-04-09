"use client";
// REACT //
import React, { useState, useEffect, useRef } from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";

// CONSTANTS //
const APP_PASSWORD = "Navinchandra14!$";
const SESSION_KEY = "matrimonial_auth";

interface PasswordGateProps {
  children: React.ReactNode;
}

/** Password Gate — blocks access until the correct password is entered */
const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // On mount, check if already authenticated this session
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === "true") {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  // Focus the input when the gate is shown
  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      inputRef.current?.focus();
    }
  }, [isChecking, isAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === APP_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
      inputRef.current?.focus();
    }
  };

  // While checking sessionStorage, render nothing to avoid flash
  if (isChecking) return null;

  // If authenticated, render the children normally
  if (isAuthenticated) return <>{children}</>;

  // Otherwise, show the password gate
  return (
    <div className="fixed inset-0 z-[9999] bg-n-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-10 w-full max-w-md mx-4 flex flex-col items-center gap-6">
        {/* Title */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold text-n-900">
            Billawar Matrimonial
          </h1>
          <p className="text-n-600 text-sm">
            This application is password protected. Please enter the password to
            continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-n-800"
            >
              Password
            </label>
            <input
              id="password"
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              className="w-full border border-n-300 rounded-lg px-4 py-2.5 text-n-900 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-n-800 w-full h-11 text-sm font-medium cursor-pointer"
          >
            Unlock App
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
