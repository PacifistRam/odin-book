import { login } from "@/utils/apiCalls";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FaGithub } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useContext, useEffect } from "react";

import { AuthContext } from "@/layout/MainLayout";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Input a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type loginFormSchema = z.infer<typeof loginFormSchema>;

const Login = () => {
  const { setToken, user, userLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/user-home");
    }
  }, [user.isAuthenticated, navigate]);

  const onSubmit = async (data: loginFormSchema) => {
    try {
      setServerError(null);
      const response = await login(data);
      if (response.message) {
        reset();
        setToken(response.token);
        localStorage.setItem("token", response.token);
        console.log(response.token);
      }
    } catch (err: any) {
      setServerError(err.message);
      console.log(serverError);
    }
  };

  if (userLoading) {
    return (
      <div className="h-full flex justify-center items-center text-3xl">
        <p className=" flex gap-1 items-center">
          <span>Verifying user</span>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </p>
      </div>
    );
  }
  if(!user.isAuthenticated) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <section className="bg-accent px-4 py-6 rounded-lg mt-2 w-full max-w-sm space-y-4">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight">
            Sign in to your account
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
                  <p className="text-red-500">{errors.email.message}</p>
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
                  <p className="text-red-500">{errors.password.message}</p>
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
                    <span>Logging you in</span>
                  </>
                ) : (
                  <span>Log In</span>
                )}
              </Button>
            </form>
            <div className="flex items-center gap-1 px-2">
              <div className="flex-grow border-b border-muted-foreground"></div>
              <span> OR</span>
              <div className="flex-grow border-b border-muted-foreground"></div>
            </div>
            <Button
              variant={"outline"}
              size={"lg"}
              className="w-full max-w-sm font-semibold text-md text-foreground"
            >
              <FaGithub /> <span>Log In With Github</span>
            </Button>
            <span className="block text-center">
              <span>Crete new account?</span>
              <Button asChild variant={"link"} className="text-lg px-1 py-0">
                <Link to={"/sign-up"}>Sign Up</Link>
              </Button>
            </span>
          </div>
        </section>
      </div>
    );
  }

  return null;  //will never reach but added a check to avoid flashing
  
};

export default Login;
