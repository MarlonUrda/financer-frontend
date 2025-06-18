import "../../index.css";
import { Link, useRouter } from "@tanstack/react-router";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { PasswordStrength } from "../../components/app/password-strength";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { InputField } from "../../components/app/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { PasswordField } from "../../components/app/PasswordInput";
import AuthController from "../../api/AuthController";
import { useMutation } from "@tanstack/react-query";

interface RegisterFormData {
  email: string;
  fname: string;
  lname: string;
  phone: string;
  password: string;
}

export default function RegisterPage() {
  const methods = useForm<RegisterFormData>();
  const password = methods.watch("password");

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: AuthController.register,
    onSuccess: (data) => {
      console.log(data);
      router.navigate({ to: "/auth/login" });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    const { fname, lname, email, phone, password } = data;
    registerMutation.mutate({
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      password: password,
      role_id: 2,
    });
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
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-amber-50 text-center">
            Register
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Sign up for Financer so you can keep track of your finances!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <motion.form
              layout
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="flex flex-col gap-8"
            >
              <div className="space-y-2">
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  icon={
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  }
                  placeholder="your@gmail.com"
                  required="Please enter your email."
                />
                <div className="mt-8 flex space-x-4">
                  <div className="w-1/2">
                    <InputField
                      name="fname"
                      label="First Name"
                      type="text"
                      placeholder="First Name"
                      required="Please enter your first name."
                    />
                  </div>
                  <div className="w-1/2 ">
                    <InputField
                      name="lname"
                      label="Last Name"
                      type="text"
                      placeholder="Last Name"
                      required="Please enter your last name."
                    />
                  </div>
                </div>
                <InputField
                  name="phone"
                  label="Phone"
                  type="tel"
                  icon={
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  }
                  placeholder="(123) 456-7890"
                  required="Please enter your phone number."
                />
              </div>

              <PasswordField
                name="password"
                label="Password"
                placeholder="••••••••"
                required="Password is required"
              />
              <PasswordStrength password={password} />
              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                required="Please confirm your password."
                validate={(value: any) =>
                  value === password || "Passwords do not match"
                }
              />

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    className="border-gray-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                    required
                  />
                  <Label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-300 cursor-pointer leading-relaxed"
                  >
                    I accept the{" "}
                    <Link
                      to={"/our-policy"}
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      terms and conditions
                    </Link>
                    and the{" "}
                    <Link
                      to={"/privacy"}
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      privacy policy.
                    </Link>
                  </Label>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign up
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.form>
          </FormProvider>

          <div className="text-center pt-4">
            <p className="text-gray-400">
              You already have an account?{" "}
              <Link
                to={"/auth/login"}
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
