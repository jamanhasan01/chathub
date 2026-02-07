import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Mail, Lock, Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'

import { userLogin, type ILoginPayload } from '@/api/auth.api'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

/* =============================== component ================================ */

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({ mode: 'onBlur' })

  const navigate = useNavigate()

  /* =============================== mutation ================================ */

  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (res) => {
      toast.success(res.message)
      // 🔐 example: store token
      localStorage.setItem('accessToken', res.token)
      navigate('/')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.message || 'Login failed')
    },
  })

  /* =============================== submit handler ================================ */

  const onSubmit: SubmitHandler<ILoginPayload> = (data) => {
    loginMutation.mutate(data)
  }

  /* =============================== jsx ================================ */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 space-y-6 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-2">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">Sign in to your account</p>
          </div>

          {/* Fields */}
          <div className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  className="w-full px-4 py-3 pl-11 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  placeholder="you@example.com"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                  })}
                  type="password"
                  className="w-full px-4 py-3 pl-11 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
            disabled:opacity-60 py-3.5 rounded-xl font-semibold text-white transition flex justify-center"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 pt-4 border-t border-gray-800">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
