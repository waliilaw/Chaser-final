'use client'
import Back from "@/components/background"
import { LoginForm } from "../../components/login-form"
import {motion} from 'framer-motion'
import { useRouter } from "next/navigation"

export default function LoginPage() {
const router = useRouter()
function HomePage(){
    router.push('/')
}

  return (<>
 <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 bg-neutral-100">
<button onClick={HomePage} className="border-2 border-black absolute top-2 left-3 bg-neutral-300 px-4 py-2 font-bold hover:text-white hover:bg-black rounded-full">
Home
</button>
    <div className="w-full max-w-sm">
      </div>
      <Back />
<LoginForm />
    </div>

    </>
  )
}

