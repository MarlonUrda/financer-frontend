import { useMemo } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function PasswordStrength({
  password,
  className = "",
}: PasswordStrengthProps) {
  const requirements = useMemo(() => {
    return [
      {
        label: "Al menos 8 caracteres",
        met: password.length >= 8,
      },
      {
        label: "Una letra mayúscula",
        met: /[A-Z]/.test(password),
      },
      {
        label: "Una letra minúscula",
        met: /[a-z]/.test(password),
      },
      {
        label: "Un número",
        met: /\d/.test(password),
      },
      {
        label: "Un carácter especial",
        met: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
      },
    ];
  }, [password]);

  const strength = requirements.filter((req) => req.met).length;
  const strengthPercentage = (strength / requirements.length) * 100;

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthLabel = () => {
    if (strength <= 2) return "Débil";
    if (strength <= 3) return "Regular";
    if (strength <= 4) return "Buena";
    return "Fuerte";
  };

  return (
    <AnimatePresence>
      {password && (
        <motion.div
          key="password-strength"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`space-y-3 ${className}`}
        >
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Seguridad de la contraseña</span>
              <span className="text-gray-300">{getStrengthLabel()}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${strengthPercentage}%` }}
                layout
              />
            </div>
          </div>

          <div className="space-y-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                {req.met ? (
                  <CheckCircle className="w-3 h-3 text-green-400" />
                ) : (
                  <XCircle className="w-3 h-3 text-gray-500" />
                )}
                <span className={req.met ? "text-green-400" : "text-gray-500"}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
