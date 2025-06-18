import "../../index.css";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useRouter } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthController from "../../api/AuthController";
import { InputField } from "../../components/app/FormInput";

export default function SendRecoverPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const sendEmailMutation = useMutation({
    mutationFn: AuthController.SendEmail,
    onSuccess: (data) => {
      console.log(data);
      router.navigate({ to: "/auth/verify/$email", params: { email } });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

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
            Recover Your Account
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Please submit your email, so we can send you the recover code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.form
            layout
            onSubmit={(e) => {
              e.preventDefault();
              sendEmailMutation.mutate({ email });
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="your@gmail.com"
                icon={
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Send Code
            </Button>
          </motion.form>

          <div className="text-center pt-4">
            <p className="text-gray-400">
              You remember the password?{" "}
              <Link
                to={"/auth/login"}
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                Go back and sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
