import LoginTitle from './LoginTitle';
import LoginForm from './LoginForm';
import Page from '@/components/helmet-page';

export default function Login() {
  return (
    <Page title="Login">
      <div className="flex flex-col w-full justify-center p-6 lg:p-10 mx-auto max-w-sm border border-primary rounded-lg border-b-4 shadow-md ">
        <LoginTitle />
        <LoginForm />
      </div>
    </Page>
  );
}
