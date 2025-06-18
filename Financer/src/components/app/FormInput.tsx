import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { motion } from "framer-motion"

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  required?: boolean | string;
  validate?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  name,
  label,
  type = "text",
  placeholder,
  icon,
  className = "",
  required,
  validate,
  value,
  onChange,
}: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <motion.div className="space-y-1">
      <Label htmlFor={name} className="text-gray-300 font-medium">
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <motion.span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4">
            {icon}
          </motion.span>
        )}
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200 ${className}`}
          {...register(name, { required, validate })}
          value={value}
          onChange={onChange}
        />
      </div>
      {errors[name] && (
        <motion.span className="text-red-400 text-xs">
          {errors[name]?.message as string}
        </motion.span>
      )}
    </motion.div>
  );
}
