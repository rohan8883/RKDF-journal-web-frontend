import React, { forwardRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import UseTitle from '@/hooks/useTitle';
import { cn } from '@/lib/utils';

type PageProps = {
  children: React.ReactNode;
  id?: string;
  title?: string;
  meta?: any;
  className?: string;
};

const Page = forwardRef(
  (
    { children, title = '', meta, className, ...other }: PageProps,
    ref?: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    UseTitle(title);

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, [title]);

    return (
      <>
        <Helmet>
          <title>{`${title} | Loan Distribution`}</title>
          {meta}
        </Helmet>
        <div ref={ref} {...other} className={cn('px-4 py-1', className)}>
          {children}
        </div>
      </>
    );
  }
);

export default Page;
