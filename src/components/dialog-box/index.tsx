import React from 'react';
import Spinner from '../loaders/Spinner';
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
};

export default function DialogBox({
  children,
  open,
  setOpen,
  title,
  setEdit,
  isLoading
}: Readonly<Props>) {
  const handleOpen = () => {
    setEdit!(false);
    setOpen((prev) => !prev);
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
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
