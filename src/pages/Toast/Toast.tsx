import type { ToastType } from "./ToastContainer";
import styles from "./Toast.module.css";
import { useEffect } from "react";

const Toast = ({
  toast,
  onRemove,
}: {
  toast: ToastType;
  onRemove: () => void;
}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onRemove();
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);
  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <span>{toast.message}</span>
      <button className={styles.button} onClick={onRemove}>
        X
      </button>
    </div>
  );
};

export default Toast;
