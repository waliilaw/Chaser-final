'use client'
import Back from "@/components/background"
import { LoginForm } from "../../components/login-form"
import {motion} from 'framer-motion'
import { useRouter } from "next/navigation"

export default function LoginPage() {

  return (<>
 <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 bg-neutral-100">

    <div className="w-full max-w-sm relative z-10">
      <LoginForm />
    </div>
    <Back  />
    </div>

    </>
  )
}

