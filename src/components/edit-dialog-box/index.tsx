import React from 'react'
import Spinner from '../loaders/Spinner'
type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  title?: string
  edit?: boolean
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  isLoading?: boolean
}

export default function DialogBox({
  children,
  open,
  setOpen,
  title,
  setEdit,
  isLoading,
}: Readonly<Props>) {
  const handleOpen = () => {
    setEdit!(false)
    setOpen((prev) => !prev)
  }
  return (
    <div>
      {open && (
        <div className='fixed inset-0 z-50 bg-gray-900/50 dark:bg-gray-900/80'></div>
      )}

      <div
        id='authentication-modal'
        tabIndex={-1}
        
        className={`${
          open ? 'flex' : 'hidden'
        } fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0`}
      >
        <div className='relative max-h-full w-full max-w-xl p-4'>
          {/* Modal content */}
          <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
            {/* Modal header */}
            <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
              <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
                {title ?? 'Add/Edit'}
              </h3>
              <button
                onClick={handleOpen}
                type='button'
                className='end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='authentication-modal'
              >
                <svg
                  className='h-3 w-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className='p-4 md:p-5'>
              {isLoading ? (
                <div className='flex h-32 items-center justify-center'>
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
  )
}
