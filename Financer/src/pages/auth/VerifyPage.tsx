import "../../index.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useRouter } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";
import { OtpInput } from "../../components/app/OtpInput";
import { motion } from "framer-motion";

export default function VerifyPage() {
  const handleOtpChange = (otp: string) => {
    console.log("OTP entered:", otp);
  };
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
        <CardHeader className="space-y-1 pb-1">
          <CardTitle className="text-2xl font-bold text-amber-50 text-center">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Please enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.form
            layout
            onSubmit={(e) => {
              e.preventDefault();
              router.navigate({ to: "/auth/change-password" });
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <OtpInput length={6} onChange={handleOtpChange} />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Verify Code
            </Button>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
