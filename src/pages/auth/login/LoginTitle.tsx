import { Image } from '@/components/image';

export default function LoginTitle() {
  return (
    <div className="px-6 lg:px-0 mx-auto max-w-sm py-2 ">
      {/* logo */}
      <div className="flex justify-center">
        <Image
          src="/HeaderLogo.png"
          width={80}
          height={100}
          alt="Logo"
          className="rounded-full"
        />
      </div>
      <h1 className="text-xl font-bold text-center text-primary">
        {/* title */}
        Welcome Back  
      </h1>
      {/* subtitle */}
      <p className="text-center mt-2 text-muted-foreground">
        Login to your account
      </p>
    </div>
  );
}
