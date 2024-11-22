import { signUp } from "@/utils/apiCalls";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const signUpSchema = z
  .object({
    userName: z.string().min(2, {
      message: "Username must have least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "password should be at least six character long",
    }),
    confirmPassword: z.string().min(6, {
      message: "password should be at least six character long",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password must match!",
      path: ["confirmPassword"],
    }
  );

type signUpSchema = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpSchema) => {
    const createUser = {
      email: data.email,
      userName: data.userName,
      password: data.password,
    };
    setServerError(null);

    try {
      const response = await signUp(createUser);
      if (response.message) {
        reset();
        navigate("/");
      }
    } catch (err: any) {
      setServerError(err.message);
      console.log(serverError);
    }

    // Handle your login logic here
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <section className="bg-accent px-4 py-6 rounded-lg mt-2 w-full max-w-sm space-y-4">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight">
          {" "}
          Create An Account
        </h1>
        {serverError && (
          <p className="text-red-500 text-sm text-center capitalize">
            {serverError}
          </p>
        )}
        <div className="space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="example@mail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="userName">User Name</Label>
              <Input
                {...register("userName")}
                type="userName"
                placeholder="johny95"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="min 6 characters"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prevPassword) => !prevPassword)
                  }
                  className="p-0 absolute right-2 top-1/2 transform -translate-y-1/2 text-lg opacity-50 hover:opacity-100"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 ">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  placeholder="min 6 characters"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prevPassword) => !prevPassword)
                  }
                  className="p-0 absolute right-2 top-1/2 transform -translate-y-1/2 text-lg opacity-50 hover:opacity-100"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full max-w-sm font-semibold text-lg text-foreground"
              disabled={isSubmitting} // Disable button while submitting
            >
               {isSubmitting ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  <span>creating account...</span>
                </>
              ) : (
              <span>Create Account</span>
              )}
            </Button>
          </form>
          <div className="flex items-center gap-1 px-2">
            <div className="flex-grow border-b border-muted-foreground"></div>
            <span> OR</span>
            <div className="flex-grow border-b border-muted-foreground"></div>
          </div>
          <span className="block text-center">
            <span>Already have an account?</span>
            <Button asChild variant={"link"} className="text-lg px-1 py-0">
              <Link to={"/"}>Log-in</Link>
            </Button>
          </span>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
