import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Input a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type loginFormSchema = z.infer<typeof loginFormSchema>

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: loginFormSchema) => {
    console.log(data);
    reset();
    // Handle your login logic here
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <section className="bg-accent px-4 py-6 rounded-lg mt-2 w-full max-w-sm space-y-4">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight">
          Sign in to your account
        </h1>
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="example@mail.com"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="min 6 characters"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <Button
              type="submit"
              className="w-full max-w-sm font-semibold text-lg text-foreground"
              disabled={isSubmitting} // Disable button while submitting
            >
              Log in
            </Button>
          </form>
          <div className="flex items-center gap-1 px-2">
            <div className="flex-grow border-b border-muted-foreground"></div>
            <span> OR</span>
            <div className="flex-grow border-b border-muted-foreground"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
