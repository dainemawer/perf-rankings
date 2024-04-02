'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { login } from '@/utils/auth/actions'
import { EmailRegex } from '@/utils/regex'

type Inputs = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="prose">
      <h1>Sign in</h1>
      <p className="text-sm max-w-sm">Welcome to the 10up Performance Ranking Dashboard. Sign in or create an account.</p>
      <div className="mb-6 flex flex-col">
        <label className="mb-1 text-sm" htmlFor="email">Email:</label>
        <input
          aria-invalid={errors.email ? 'true' : 'false'}
          autoComplete="username"
          placeholder="Enter your email address..."
          className="rounded text-sm border-slate-300 w-full"
          id="email"
          type="email"
          {...register("email", {
            required: 'Email is required', pattern: {
              value: EmailRegex,
              message: 'Only @10up.com email addresses allowed'
            }
          })}
        />
        {errors.email && <span className="text-red-500 text-xs mt-2 block">{errors.email.message}</span>}
      </div>
      <div className="mb-6 flex flex-col">
        <label className="mb-1 text-sm" htmlFor="password">Password:</label>
        <input
          aria-invalid={errors.password ? 'true' : 'false'}
          autoComplete="current-password"
          placeholder="Enter your password..."
          className="rounded text-sm border-slate-300 w-full"
          id="password"
          {...register("password", { required: 'Password is required' })}
          type="password"
        />
        {errors.password && <span className="text-red-500 text-xs mt-2 block">{errors.password.message}</span>}
      </div>
      <div className="flex gap-4">
        <button type="submit" className="inline-flex rounded bg-red-500 text-white font-medium text-sm py-2 px-4 whitespace-nowrap">Log in</button>
      </div>
    </form>
  )
}