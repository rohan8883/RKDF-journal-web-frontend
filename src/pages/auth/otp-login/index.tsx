import { useState } from 'react';
import Page from '@/components/helmet-page';
import SendOtpViaEmail from './SendOTPLogin';
import VerifyOtp from './VerifyOtp';

export type I_DATA = {
  mobile?: string;
  otp?: string;
  token?: string;
};

export type I_NEXT = (newData: I_DATA, finalStep?: boolean) => void;
export type I_PREV = (newData: I_DATA) => void;

export default function LoginViaOTP() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<I_DATA>({
    mobile: '',
    otp: '',
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
    <Page title="OTP LOGIN">
      <div className="flex flex-col w-full justify-center h-screen px-6 lg:px-0 mx-auto max-w-sm">
        {{
          0: <SendOtpViaEmail next={next} data={data} />,
          1: <VerifyOtp next={next} prev={prev} data={data} setData={setData} />
        }[page] || null}
      </div>
    </Page>
  );
}
