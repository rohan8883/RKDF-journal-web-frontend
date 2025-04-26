import React from 'react';
type PopoverProps = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Popover({
  children,
  title,
  open
}: Readonly<PopoverProps>) {
  return (
    <div
      data-popover
      id="popover-click"
      role="tooltip"
      className={`absolute z-10 ${
        open ? 'visible' : 'invisible'
      } inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${
        open ? 'opacity-100' : 'opacity-0'
      } dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
    >
      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="px-3 py-2">{children}</div>
      <div data-popper-arrow />
    </div>
  );
}
