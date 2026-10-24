import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./OTP.module.css";

const OTP_LENGTH = 6;

type OTPProps = {
  onComplete?: (code: string) => void;
};

export default function OTP({ onComplete }: OTPProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const references = useRef<(HTMLInputElement | null)[]>(
    Array(OTP_LENGTH).fill(null),
  );

  const focusInput = (index: number) => {
    references.current[index]?.focus();
    references.current[index]?.select();
  };

  const handleOnChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;

    const startIndex = value.length >= OTP_LENGTH ? 0 : index;
    const digits = value.slice(0, OTP_LENGTH - startIndex).split("");
    const newOtp = [...otp];
    if (!value) {
      newOtp[index] = "";
    } else {
      digits.forEach((digit, offset) => {
        newOtp[startIndex + offset] = digit;
      });
    }
    setOtp(newOtp);

    if (value) {
      focusInput(Math.min(startIndex + digits.length, OTP_LENGTH - 1));
    }
    if (
      newOtp.every((digit) => /^[0-9]$/.test(digit)) &&
      newOtp.join("") !== otp.join("")
    ) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    switch (event.key) {
      case "Backspace":
        event.preventDefault();
        if (otp[index]) {
          handleOnChange(index, "");
        } else if (index > 0) {
          handleOnChange(index - 1, "");
          focusInput(index - 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        handleOnChange(index, "");
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusInput(Math.max(0, index - 1));
        break;
      case "ArrowRight":
        event.preventDefault();
        focusInput(Math.min(OTP_LENGTH - 1, index + 1));
        break;
    }
  };

  return (
    <div className={styles.container}>
      {otp.map((_, index) => {
        return (
          <input
            key={index}
            type="text"
            name={`otp-digit-${index + 1}`}
            aria-label={`OTP digit ${index + 1} of ${OTP_LENGTH}`}
            className={styles.field}
            maxLength={OTP_LENGTH}
            value={otp[index]}
            ref={(el) => {
              references.current[index] = el;
            }}
            onChange={(e) => handleOnChange(index, e.target.value)}
            onFocus={(event) => event.currentTarget.select()}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => {
              event.preventDefault();
              handleOnChange(index, event.clipboardData.getData("text").trim());
            }}
          ></input>
        );
      })}
    </div>
  );
}
