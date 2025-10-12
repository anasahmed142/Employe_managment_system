import {   SignupForm} from "@/components/signup"
export default function SignupPage() {
  return (
    <div className="bg-gradient-to-r from-indigo-300 to-sky-100 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  )
}
