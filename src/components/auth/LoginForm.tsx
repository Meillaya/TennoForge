import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm as ILoginForm, RegisterForm } from '../../types/auth';
import { useAuthStore } from '../../stores/authStore';
import { Loader, Mail, Lock, User } from 'lucide-react';

export default function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ILoginForm | RegisterForm>();
  const { login, register: registerUser, isLoading } = useAuthStore();

  const onSubmit = async (data: ILoginForm | RegisterForm) => {
    try {
      if (isRegistering) {
        const registerData = data as RegisterForm;
        await registerUser(registerData.email, registerData.username, registerData.password);
      } else {
        const loginData = data as ILoginForm;
        await login(loginData.email, loginData.password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    reset();
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold text-center mb-8">
        {isRegistering ? 'Create Account' : 'Welcome Back'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="input w-full pl-10"
            />
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.email && (
            <p className="text-wf-accent text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {isRegistering && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-200">
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                {...register('username', { 
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters'
                  }
                })}
                className="input w-full pl-10"
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.username && (
              <p className="text-wf-accent text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              className="input w-full pl-10"
            />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.password && (
            <p className="text-wf-accent text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center h-10"
        >
          {isLoading ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            isRegistering ? 'Create Account' : 'Sign In'
          )}
        </button>

        <p className="text-center text-sm text-gray-400">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-wf-primary hover:underline"
          >
            {isRegistering ? 'Sign In' : 'Create Account'}
          </button>
        </p>
      </form>
    </div>
  );
}