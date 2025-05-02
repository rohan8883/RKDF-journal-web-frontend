import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import Page from '@/components/helmet-page';
import { ButtonLoading, RHFTextField, FormProviders } from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import SideContent from '../sideContent';

const schema = yup.object({
  givenName: yup.string().required('given name is required'),
  familyName: yup.string().required('family name is required'),
  userName: yup.string().required('user name is required'),
  mobile: yup.string().required('mobile is required'),
  email: yup.string().email('Valid email required').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  affiliation: yup.string().required('Institution/affiliation is required'),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const postRegister = usePostMutation({});
const navigate =useNavigate()

  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      givenName: '',
      familyName: '',
      userName: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      affiliation: '',
    },
    resolver: yupResolver(schema)
  });

  const { formState: { errors } } = methods;

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postRegister.mutateAsync({
        api: authApi.register,
        data: {
          fullName: data?.givenName,
          familyName: data?.familyName,
          email: data.email,
          mobile: data.mobile,
          userName: data.userName,
          password: data.password,
          affiliation: data.affiliation,
        }
      });

      if (response?.data?.success) {
        toast.success('Registration successful! Please check your email to verify your account.');
        navigate("/Journal/auth/login")
      } else {
        toast.error(response?.data?.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Page title="Register">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <User className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Create an Author Account</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Register to submit and manage your research papers
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
                    <User className="h-5 w-5" />
                    Author Registration
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
                  <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                          <label htmlFor="givenName" className="block text-sm font-medium text-gray-700 mb-1">
                            Given Name
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {errors.givenName ? "" : <User className="h-5 w-5 text-gray-400" />  } 
                            </div>
                            <RHFTextField
                              name="givenName"
                              id="givenName"
                              className={`block w-full pl-10 pr-3 py-2 border ${errors.givenName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                              placeholder="Enter Name"
                            />
                          </div>
                        </div>
                        {/* Last Name */}
                        <div>
                          <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 mb-1">
                            Family Name
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {errors.familyName ? "" :<User className="h-5 w-5 text-gray-400" />}
                            </div>
                            <RHFTextField
                              name="familyName"
                              id="familyName"
                              className={`block w-full pl-10 pr-3 py-2 border ${errors.familyName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                              placeholder="Enter Family Name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                              User Name
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {errors.userName ? "" : <User className="h-5 w-5 text-gray-400" />  } 
                            </div>
                            <RHFTextField
                              name="userName"
                              id="userName"
                              className={`block w-full pl-10 pr-3 py-2 border ${errors.userName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                              placeholder="Enter User Name"
                            />
                          </div>
                        </div>
                         {/* User Name */}
                      <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile 
                        </label>
                        <RHFTextField
                          name="mobile"
                          id="mobile"
                          inputValidation={['mobile']}
                          className={`block w-full px-3 py-2 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                          placeholder="Enter mobile"
                        />
                      </div>
                      </div>
                     
                       {/* Affiliation */}
                      <div>
                        <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700 mb-1">
                          Institution/Affiliation
                        </label>
                        <RHFTextField
                          name="affiliation"
                          id="affiliation"
                          className={`block w-full px-3 py-2 border ${errors.affiliation ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                          placeholder="RKDF University"
                        />
                      </div>
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {errors.email ? "" :  <Mail className="h-5 w-5 text-gray-400" />}
                          </div>
                          <RHFTextField
                            name="email"
                            id="email"
                            inputValidation={['email', 'removeSpace']}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {errors.password ? "" : <Lock className="h-5 w-5 text-gray-400" />}
                          </div>
                          <RHFTextField
                            name="password"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={`block w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
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

                      {/* Confirm Password */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {errors.confirmPassword ? "" :  <Lock className="h-5 w-5 text-gray-400" />}
                          </div>
                          <RHFTextField
                            name="confirmPassword"
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className={`block w-full pl-10 pr-10 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                            placeholder="••••••••"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
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
                            <User className="h-5 w-5 text-teal-300 group-hover:text-teal-200" />
                          </span>
                          Register Account
                        </ButtonLoading>
                      </div>
                    </div>
                  </FormProviders>
                  {/* Login Link */}
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          Already have an account?
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500 text-sm flex items-center justify-center gap-1">
                        Sign in to your account
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Takes 1/3 on desktop */}
            <div className="space-y-6">
              <SideContent />
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
}