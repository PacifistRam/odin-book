import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type signUpSchema = z.infer<typeof signUpSchema>

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpSchema) => {
    console.log(data);
    reset();
    // Handle your login logic here
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <section className="bg-accent px-4 py-6 rounded-lg mt-2 w-full max-w-sm space-y-4">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight">
          {" "}
          Create An Account
        </h1>
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
              <Input
                {...register("password")}
                type="password"
                placeholder="min 6 characters"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
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

export default SignUp;
