import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Page from '@/components/helmet-page';
import { ButtonLoading, RHFTextField, FormProviders, RHFPasswordField } from '@/components/forms';
import { useStore } from '@/store';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import SideContent from '../sideContent';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(5)
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const postLogin = usePostMutation({});
  const { login } = useStore();
  
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.login,
        data: data
      });
      if (response?.data?.success) {
        await login(response);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Page title="Login">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Lock className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Login to IJHESM</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Access your author dashboard and submission portal
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5">
                  <h2 className="text-xl font-semibold text-center flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Author Login
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
                  <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <RHFTextField
                            name="email"
                            id="email"
                            inputValidation={['email', 'removeSpace']}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <RHFPasswordField
                            name="password"
                            id="password"
                            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="••••••••"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm">
                          <Link to="/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div>
                        <ButtonLoading
                          type="submit"
                          isLoading={methods.formState.isSubmitting}
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LogIn className="h-5 w-5 text-teal-300 group-hover:text-teal-200" />
                          </span>
                          Sign in
                        </ButtonLoading>
                      </div>
                    </div>
                  </FormProviders>

                  {/* Registration Link */}
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          New to IJHESM?
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Link to="/Journal/auth/registration" className="font-medium text-teal-600 hover:text-teal-500 text-sm">
                        Create an author account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar - Takes 1/3 on desktop */}
            <SideContent />
          </div>
        </main>
      </div>
    </Page>
  );
}

// SideContent component (matches your journal's style)