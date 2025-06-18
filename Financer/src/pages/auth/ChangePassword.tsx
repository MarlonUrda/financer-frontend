import "../../index.css";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Eye, Lock } from "lucide-react";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { PasswordStrength } from "../../components/app/password-strength";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useRouter } from "@tanstack/react-router";

export default function ChangePasswordPage() {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

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
            Change Password
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Please enter your new password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.form
            layout
            onSubmit={(e) => {
              e.preventDefault();
              router.navigate({ to: "/auth/login" });
            }}
            className="flex flex-col gap-8"
          >
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Change Password
            </Button>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
