import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProviders,
  RHFTextField,
  RHFTextArea,
  ButtonLoading
} from '@/components/forms';
import { useAuth } from '@/store/useAuth';
import { usePutMutation } from '@/hooks/useCustomQuery';
import { authApi } from '@/lib';

const schema = yup.object({
  fullName: yup.string().required(),
  gymName: yup.string(),
  mobile: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string(),
  zipCode: yup.string(),
  isVerified: yup.string()
});

type IProps = {
  title?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProfile({
  title,
  open,
  setOpen
}: Readonly<IProps>) {
  const mutate = usePutMutation({});
  const { user, initialize } = useAuth();
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const methods = useForm({
    defaultValues: {
      fullName: user?.fullName,
      gymName: user?.gymName,
      mobile: user?.mobile,
      email: user?.email,
      address: user?.address,
      zipCode: user?.zipCode,
      isVerified: user?.isVerified ? 'yes' : 'no'
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const res = await mutate.mutateAsync({
        api: authApi.updateProfile,
        data: {
          fullName: data.fullName,
          gymName: data.gymName,
          mobile: data.mobile,
          address: data.address,
          zipCode: data.zipCode
        }
      });
      if (res.data.success) {
        toast.success('Profile updated successfully');
        initialize();
        handleOpen();
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      {open && (
        <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
      )}

      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          open ? 'flex' : 'hidden'
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {title ?? 'Add/Edit'}
              </h3>
              <button
                onClick={handleOpen}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <FormProviders
                methods={methods}
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <RHFTextField
                      name="fullName"
                      inputValidation={['removeDoubleSpace']}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <RHFTextField
                      name="gymName"
                      inputValidation={['removeDoubleSpace']}
                      placeholder="GYM Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <RHFTextField
                      type="number"
                      name="mobile"
                      inputValidation={['mobile']}
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div className="space-y-2">
                    <RHFTextField
                      name="email"
                      inputValidation={['email']}
                      placeholder="Email"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <RHFTextArea
                      name="address"
                      inputValidation={['address']}
                      placeholder="Address"
                    />
                  </div>
                  <div className="space-y-2">
                    <RHFTextField
                      name="zipCode"
                      inputValidation={['zip']}
                      placeholder="Zip Code"
                    />
                  </div>

                  <div>
                    <ButtonLoading
                      type="submit"
                      isLoading={methods.formState.isSubmitting}
                      className="w-full rounded-lg py-5 px-4 mt-2 mb-4 shadow-none"
                    >
                      Save Changes
                    </ButtonLoading>
                  </div>
                </div>
              </FormProviders>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
