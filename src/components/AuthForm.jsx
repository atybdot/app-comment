import { Eye, EyeOff, X } from "lucide-react"
import { forwardRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { emailLogin, emailSignup, getUser } from "../lib/appwrite"
import useComment from "../store/commentContext"
import { Loading, onInvalid, onSucess } from "../utils/utils"
import CustomToast from "./CustomToast"

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { updateUser, updateLoginState } = useComment()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm()

  const sumbitForm = async (data) => {
    const d = document.querySelector("#auth-dialoge")
    try {
      isValid &&
        (await emailSignup(data.name, data.email, data.password).then(
          async (res) => {
            onSucess("user created")
            await emailLogin(data.email,data.password)
            updateUser({ id: res.$id, name: res.name })
            updateLoginState(true)
            d.close()
          },
        ))
    } catch (err) {
      onInvalid(err.message)
    }
  }

  const handleError = (data) => {
    if (data.name) {
      onInvalid(data.name.message)
    }
    if (data.email) {
      onInvalid(data.email.message)
    }
    if (data.password) {
      onInvalid(data.password.message)
    }
  }

  return (
    <form
      id="signupcom"
      className="mt-8 space-y-6"
      onSubmit={handleSubmit(sumbitForm, handleError)}
    >
      <CustomToast />
      <div className={" rounded-md shadow-sm -space-y-px"}>
        <div>
          <label htmlFor="name" className="sr-only">
            name
          </label>
          <input
            type="text"
            className={
              "appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-zinc-500 text-zinc-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            }
            placeholder="name"
            {...register("name", {
              required: { value: true, message: "name is required" },
              minLength: { value: 4, message: "name must be of 4 characters" },
              maxLength: {
                value: 48,
                message: "name cannot be longer than 48 characters",
              },
            })}
          />
        </div>

        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            autoComplete="email"
            className={
              "appearance-none relative block w-full px-3 py-2 border placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            }
            placeholder="Email address"
            {...register("email", {
              required: { value: true, message: "email is required" },
              pattern: {
                value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
                message: "email is not valid",
              },
            })}
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className={
              "appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-zinc-500 text-zinc-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm "
            }
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password must be atleast 8 characters",
              },
              maxLength: {
                value: 48,
                message: "password cannot be longer than 48 characters",
              },
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-zinc-400" />
            ) : (
              <Eye className="h-5 w-5 text-zinc-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? <Loading /> : "Signup"}
        </button>
      </div>
    </form>
  )
}

const LoginForm = () => {
  const { updateLoginState, updateUser } = useComment()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm()

  const sumbitForm = async (data) => {
    const d = document.querySelector("#auth-dialoge")
    try {
      isValid &&
        (await toast.promise(
          emailLogin(data.email, data.password),
          {
            loading: "logging...",
            success: "login successful",
            error: "unable to login",
          },
          {
            style: {
              background: "hsl(120,100%,90%)",
            },
          },
        ))

      await getUser().then((data) => {
        updateUser({ name: data.name, id: data.$id })
        updateLoginState(true)
        d.close()
      })
    } catch (err) {
      onInvalid(err.message)
    }
  }

  const handleError = (data) => {
    if (data.email) {
      onInvalid(data.email.message)
    }
    if (data.password) {
      onInvalid(data.password.message)
    }
  }

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit(sumbitForm, handleError)}
    >
      <CustomToast />
      <div className="rounded-md shadow-sm -space-y-px">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          autoComplete="email"
          className={
            "appearance-none relative block w-full px-3 py-2 border placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm rounded-t-md"
          }
          placeholder="Email address"
          {...register("email", {
            required: { value: true, message: "email is required" },
            pattern: {
              value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
              message: "email is not valid",
            },
          })}
        />

        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className={
              "appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-zinc-500 text-zinc-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm "
            }
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password must be atleast 8 characters",
              },
              maxLength: {
                value: 48,
                message: "password cannot be longer than 48 characters",
              },
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-zinc-400" />
            ) : (
              <Eye className="h-5 w-5 text-zinc-400" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isSubmitting ? <Loading /> : "Sign in"}
      </button>
    </form>
  )
}

const AuthForm = forwardRef((props, ref) => {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    ref.current.close()
  }, [])
  return (
    <dialog
      id="auth-dialoge"
      className="w-fit rounded-md bg-zinc-100 dark:bg-zinc-800 py-12 px-3 sm:px-5 lg:px-7 relative drop-shadow"
      ref={ref}
    >
      <button
        type="button"
        onClick={() => ref.current.close()}
        className="text-sm absolute top-0 right-0 m-4 dark:text-zinc-100 text-zinc-900 hover:text-blue-500"
      >
        <X className="w-4 h-4 " />{" "}
      </button>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        {isLogin ? <LoginForm /> : <SignupForm />}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-zinc-50 text-zinc-900 rounded">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium text-zinc-500 hover:bg-blue-200 transition-colors duration-200"
              >
                <span className="sr-only">Sign in with Google</span>
                <img
                  alt="google img"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  className="w-5 h-5"
                />
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium text-zinc-500 hover:bg-blue-200 transition-colors duration-200"
              >
                <span className="sr-only">Sign in with GitHub</span>

                <img
                  alt="github img"
                  className="w-5 h-5"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-blue-500 dark:text-blue-500">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium hover:text-blue-600"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </dialog>
  )
})

export default AuthForm
