import React from 'react';
import SkeletonLoader from '../loaders/SkeletonLoader';

type Props = {
  children: React.ReactNode;
  dataLength: number;
  isLoading: boolean;
  text?: string;
};

export default function LoaderList({
  children,
  dataLength,
  isLoading,
  text
}: Readonly<Props>) {
  return (
    <div>
      {isLoading ? (
        Array.from({ length: 5 }, (_, index) => (
          <SkeletonLoader key={index + 1} />
        ))
      ) : dataLength > 0 ? (
        children
      ) : (
        <div className="flex justify-center items-center h-64">
          <h1 className="text-gray-400 font-semibold">
            {text || 'No data found'}
          </h1>
        </div>
      )}
    </div>
  );
}
