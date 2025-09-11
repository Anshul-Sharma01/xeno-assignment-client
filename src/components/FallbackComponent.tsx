import React from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div
      style={{
        backgroundColor: "#F2F8FF",
        color: "#0F62FE",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#0F62FE", marginBottom: "16px" }}>Something went wrong</h1>
      <p style={{ color: "#0F62FE", marginBottom: "24px" }}>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        style={{
          backgroundColor: "#0F62FE",
          color: "#D0E2FF",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
