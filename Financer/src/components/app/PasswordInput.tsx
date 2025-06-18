import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Lock, Eye } from "lucide-react";

interface PasswordFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: string | boolean;
  validate?: any;
  className?: string;
}

export function PasswordField({
  name,
  label,
  placeholder = "••••••••",
  required,
  validate,
  className = "",
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1 relative">
      <Label htmlFor={name} className="text-gray-300 font-medium">
        {label}
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          id={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className={`pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200 ${className}`}
          {...register(name, { required, validate })}
        />
        <Eye
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
          onClick={() => setVisible((v) => !v)}
        />
      </div>
      {errors[name] && (
        <span className="text-red-400 text-xs">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
