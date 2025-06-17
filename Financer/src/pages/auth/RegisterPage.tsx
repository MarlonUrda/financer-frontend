import "../../index.css";
import { Link } from "@tanstack/react-router";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Eye, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { PasswordStrength } from "../../components/app/password-strength";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-center min-h-screen"
    >
      <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-amber-50 text-center">
            Register
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Sign up for Financer so you can keep track of your finances!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.form
            layout
            onSubmit={(e) => {
              e.preventDefault();
              // handle submit
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@gmail.com"
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Label
                    htmlFor="firstName"
                    className="text-gray-300 font-medium"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <Label
                    htmlFor="secondName"
                    className="text-gray-300 font-medium"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="secondName"
                    type="text"
                    placeholder="Last Name"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={visible ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Eye
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              </div>
              <PasswordStrength password={password} />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-gray-300 font-medium"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirm-password"
                  type={visible ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                  required
                />
                <Eye
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="border-gray-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-gray-300 text-sm cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-medium text-yellow-400 hover:text-gray-300 underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
