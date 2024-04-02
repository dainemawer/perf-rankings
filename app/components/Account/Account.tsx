'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { login, signup } from '@/utils/auth/actions'
import { EmailRegex } from '@/utils/regex'

type Inputs = {
  email: string
  password: string
}

type AccountProps = {
  type: 'login' | 'signup'
}

export default function Account({ type }: AccountProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (type === 'signup') {
      signup(data)
    } else {
      login(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="prose w-96 p-8 border border-gray-300 rounded-md">
      <div className="text-center flex items-center flex-col">
        <svg className="mb-4" width="48" height="48" viewBox="0 0 158 158" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M78.7321 0.000111102C65.4635 -0.0221957 52.4052 3.31489 40.7741 9.70038C29.1429 16.0859 19.3177 25.3119 12.2138 36.5187C5.10998 47.7256 0.958818 60.5484 0.147197 73.7922C-0.664423 87.036 1.88991 100.27 7.57215 112.26L8.39215 113.12L57.0421 64.4701L41.7422 49.1801H108.302V115.74L93.0022 100.44L44.0822 149.36C54.7207 154.585 66.4017 157.339 78.2537 157.418C90.1056 157.497 101.822 154.899 112.53 149.817C123.237 144.734 132.658 137.3 140.09 128.067C147.523 118.835 152.774 108.043 155.452 96.4976C158.131 84.9521 158.167 72.9506 155.559 61.389C152.951 49.8273 147.765 39.004 140.389 29.7266C133.013 20.4492 123.637 12.9574 112.961 7.81012C102.285 2.66287 90.5843 -0.00687474 78.7321 0.000111102Z" fill="#DF2B26" />
        </svg>
        <h1>{type === 'signup' ? 'Sign up' : 'Log in'}</h1>
      </div>
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
        <button type="button" className="text-xs">Forgot Password?</button>
      </div>
    </form>
  )
}