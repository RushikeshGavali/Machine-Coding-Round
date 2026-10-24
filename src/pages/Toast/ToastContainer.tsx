import { useState } from "react";
import styles from "./Toast.module.css";
import Toast from "./Toast";

export type ToastType = {
  type: "success" | "warning" | "error";
  message: string;
  id: number;
};

export default function ToastContainer() {
  const [toastList, setToastList] = useState<ToastType[]>([]);

  const handleClick = (
    type: "success" | "warning" | "error",
    message: string,
  ) => {
    setToastList((current) => [
      ...current,
      { type, message, id: new Date().getTime() },
    ]);
  };

  const handleRemove = (id: number) => {
    setToastList((current) => current.filter((tst) => tst.id !== id));
  };

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastListContainer}>
        {toastList.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={() => handleRemove(toast.id)}
          />
        ))}
      </div>
      <button onClick={() => handleClick("success", "Saved Successfully")}>
        Show Success
      </button>
      <button onClick={() => handleClick("error", "Error occured")}>
        Show Error
      </button>
      <button onClick={() => handleClick("warning", "Validation error")}>
        Show Warninig
      </button>
    </div>
  );
}
