import { RotatingLines } from 'react-loader-spinner';

export default function RotatingLoader({}) {
  return (
    <div className="flex justify-center items-center">
      <RotatingLines strokeColor="#000" />
    </div>
  );
}
