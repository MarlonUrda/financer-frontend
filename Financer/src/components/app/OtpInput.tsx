import { useState, useRef } from "react";
import { Input } from "../ui/input";

interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
}

export function OtpInput({ length, onChange }: OtpInputProps) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };  

  return (
    <div className="flex flex-row gap-5 p-4">
      {otp.map((value, index) => (
        <Input
          key={index}
          type="text"
          value={value}
          ref={el => { inputsRef.current[index] = el; }}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          className="w-12 h-12 text-center text-white border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
          maxLength={1}
        />
      ))}
    </div>
  );
}
