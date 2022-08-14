import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, FC, ReactNode, useState } from "react";

interface NotificationContextState {
  setNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextState>({
  setNotification: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const setNotification = (value: string) => {
    setMessage(value);
    setOpen(true);
  };
  return (
    <NotificationContext.Provider
      value={{
        setNotification,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};
