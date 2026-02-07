import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'
import { Loader2, UserPlus, User, Mail, Phone, Lock } from 'lucide-react'
import { userRegister, type RegisterPayload } from '@/api/auth.api'
import type { AxiosError } from 'axios'

/* =============================== component ================================ */

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterPayload>({ mode: 'onBlur' })

  /* =============================== mutation ================================ */

  const registerMutation = useMutation({
    mutationFn: userRegister,
    onSuccess: (res) => {
      toast.success(res.message)
      reset()
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.message || 'Registration failed')
    },
  })

  /* =============================== submit handler ================================ */

  const onSubmit: SubmitHandler<RegisterPayload> = (data) => {
    registerMutation.mutate(data)
  }

  /* =============================== jsx ================================ */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />

      <div className="relative w-full max-w-md">
        {/* Background glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 space-y-6 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-2">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Join ChatHub
            </h1>
            <p className="text-gray-400 text-sm">Create your account and start chatting</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <div className="relative">
                <input
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  className="w-full px-4 py-3 pl-11 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                  placeholder="John Doe"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {errors.name && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="w-full px-4 py-3 pl-11 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                  placeholder="you@example.com"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <div className="relative">
                <input
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message: 'Enter a valid Bangladeshi phone number',
                    },
                  })}
                  className="w-full px-4 py-3 pl-11 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                  placeholder="01XXXXXXXXX"
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  {errors.phone.message}
                </p>
              )}
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
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type="password"
                  className="w-full px-4 py-3 pl-11 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {errors.password && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={registerMutation.isPending}
            className="w-full relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                     disabled:opacity-60 disabled:cursor-not-allowed py-3.5 rounded-xl font-semibold text-white 
                     transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/25"
            type="submit"
          >
            {registerMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-400 pt-4 border-t border-gray-800">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
