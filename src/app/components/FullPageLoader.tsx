"use client";
// REACT //
import React, { useState, useRef, useEffect } from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";

interface FullPageLoaderProps {
  isLoading: boolean;
  text?: string;
  /** When true, shows a password form instead of the spinner */
  requiresPassword?: boolean;
  /** Called with the submitted password; return true if correct */
  onPasswordSubmit?: (password: string) => boolean;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  isLoading,
  text = "Loading profiles...",
  requiresPassword = false,
  onPasswordSubmit,
}) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (requiresPassword) {
      inputRef.current?.focus();
    }
  }, [requiresPassword]);

  if (!isLoading) return null;

  /** Handle password form submission */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = onPasswordSubmit?.(password) ?? false;
    if (correct) {
      setError("");
      setPassword("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-n-50 z-50 flex flex-col items-center justify-center">
      {requiresPassword ? (
        /* ── Password Phase ── */
        <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-n-900 mb-1">
              Billawar Matrimonial
            </h2>
            <p className="text-n-600 text-sm">
              Enter the password to access the app.
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="loader-password"
                className="text-sm font-medium text-n-800"
              >
                Password
              </label>
              <input
                id="loader-password"
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full border border-n-300 rounded-lg px-4 py-2.5 text-n-900 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={password.trim().length === 0}
              className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-n-800 w-full h-11 text-sm font-medium cursor-pointer"
            >
              Unlock App
            </Button>
          </form>

          {/* Decorative dots */}
          <div className="flex gap-2">
            <div
              className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      ) : (
        /* ── Loading Phase ── */
        <>
          {/* Loading Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-yellow-200 border-t-primary-500 rounded-full animate-spin"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary-400 rounded-full animate-spin"
              style={{ animationDelay: "0.1s" }}
            ></div>
          </div>

          {/* Loading Text */}
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-n-800 mb-2">
              Loading Matches
            </h2>
            <p className="text-n-600">{text}</p>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex gap-2">
            <div
              className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default FullPageLoader;
