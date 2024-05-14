import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

/**
 * Represents an alert component to display success or error messages.
 * @param {Object} props - Component props.
 * @param {string} props.condition - The condition determining the type of alert (error or success).
 * @param {string} props.message - The message to display in the alert.
 * @param {boolean} props.showAlert - Whether to show the alert or not.
 * @returns {JSX.Element} A React component for displaying alerts.
 */
const AlertDemo = ({ conditon, message, showAlert }) => {
  return (
    <div data-testId="alert-message">
      <Stack
        sx={{
          width: "97%",
          position: "absolute",
          top: "60px",
          left: "1.4%",
          zIndex: 40,
          transition: "all 0.5s ease-in-out",
          opacity: showAlert ? 1 : 0,
          transform: showAlert ? "translateY(0)" : "translateY(-20px)",
        }}
        spacing={2}
      >
        {conditon == "error" && (
          <Alert variant="filled" severity="error">
            {message}
          </Alert>
        )}
        {conditon == "success" && (
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        )}
      </Stack>
    </div>
  );
};

export default AlertDemo;
