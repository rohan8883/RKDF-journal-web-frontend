import { useState } from 'react';
import Page from '@/components/helmet-page';
import SendOtpViaEmail from './SendOtpViaEmail';
import VerifyOtp from './VerifyOtp';
import ChangePassword from './ChangePassword';

export type I_DATA = {
  email?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
  token?: string;
};

export type I_NEXT = (newData: I_DATA, finalStep?: boolean) => void;
export type I_PREV = (newData: I_DATA) => void;

export default function ForgetPassword() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<I_DATA>({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
    token: ''
  });

  const next = (newData: I_DATA, finalStep = false) => {
    setData({ ...data, ...newData });
    if (finalStep) {
      return;
    }
    setPage(page + 1);
  };
  const prev = (newData: I_DATA) => {
    setData({ ...data, ...newData });
    setPage(page - 1);
  };

  return (
    <Page title="Login">
      <div className="flex flex-col w-full justify-center h-screen px-6 lg:px-0 mx-auto max-w-sm">
        {{
          0: <SendOtpViaEmail next={next} data={data} />,
          1: (
            <VerifyOtp next={next} prev={prev} data={data} setData={setData} />
          ),
          2: <ChangePassword prev={prev} data={data} setData={setData} />
        }[page] || null}
      </div>
    </Page>
  );
}
