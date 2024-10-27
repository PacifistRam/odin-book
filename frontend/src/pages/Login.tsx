import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import 

const Login = () => {
  return (
    <div className="h-full w-full flex fle-col justify-center items-center">
      <section className="bg-accent px-4 py-6 rounded-lg mt-2 w-full max-w-sm space-y-4">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight">Sign in to your account</h1>
        <div className="space-y-4">
          <form className="space-y-4 md:space-y-6 " >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="example@mail.com" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="min 6 characters" />
            </div>
            <Button type="submit" className="w-full max-w-sm font-semibold text-lg text-foreground" >Log-in </Button>
          </form>
          <div className="flex items-center gap-1 px-2">
            <div className=" flex-grow border-b border-muted-foreground " ></div>
            <span> OR</span>
            <div className="flex-grow border-b  border-muted-foreground"></div>
          </div>
          
        </div>
      </section>
    </div>
  )
}

export default Login