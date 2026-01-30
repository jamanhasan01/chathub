import { useForm, type SubmitHandler } from 'react-hook-form'
import { userRegister } from '@/service/auth.api'
import type { IUser } from '@/types/user.types'

/* =============================== component ================================ */

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<IUser>()

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('password', data.password)
    formData.append('file', data.file[0])

    try {
      console.log('API URL:', import.meta.env.VITE_API_URL)

      const res = await userRegister(formData)
      console.log('Success:', res.data.message)
    } catch (error: any) {
      console.error('Error:', error.message || error)
    }
  }

  return (
    <div className="bg-black w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[500px] bg-gray-900 grid grid-cols-2 p-4 gap-3 text-white rounded-lg"
      >
        <h1 className="text-2xl col-span-2 text-center">ChatHub</h1>

        <input {...register('name', { required: true })} placeholder="Name" />
        <input {...register('email', { required: true })} type="email" placeholder="Email" />
        <input {...register('phone', { required: true })} placeholder="Phone" />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
        />
        <input {...register('file', { required: true })} type="file" />

        <button className="col-span-2 bg-blue-700 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}

export default RegisterForm
