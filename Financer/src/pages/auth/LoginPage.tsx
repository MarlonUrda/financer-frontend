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
import { ArrowRight } from "lucide-react";

import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../components/app/FormInput";
import { PasswordField } from "../../components/app/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import AuthController from "../../api/AuthController";

interface LoginInputs {
  email: string,
  password: string,
}

export default function LoginPage() {

  const form = useForm<LoginInputs>();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: AuthController.login,
    onSuccess: (data) => {
      console.log(data);
      router.navigate({ to: "/auth/login" });
    },
    onError: (error) => {
      console.error(error);
    }
  })

  const onSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm shadow-2xl">
      <CardHeader className="space-y-1 pb-1">
        <CardTitle className="text-2xl font-bold text-amber-50 text-center">
          Log In
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Sign in to Financer so you can keep track of your finances!
        </CardDescription> 
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="your@gmail.com"
                required="Please enter your email."
              />
            </div>

            <div className="space-y-2">
              <PasswordField
                name="password"
                label="Password"
                placeholder="••••••••"
                required="Please enter your password."
              />
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
                  to="/auth/sendRecover"
                  className="text-medium text-yellow-400 hover:text-gray-300 font-bold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Log In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </FormProvider>
        <div className="relative mt-7">
          <Separator className="bg-gray-700" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gray-900 px-3 text-sm text-gray-400">
              o continúa con
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-8">
          <Button
            type="button"
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>
        </div>

        <div className="text-center pt-4">
          <p className="text-gray-400">
            You don't have an account?{" "}
            <Link to={"/auth/register"} className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
