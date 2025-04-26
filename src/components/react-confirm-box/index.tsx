import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

export const Confirm = (
  title: string,
  message: string,
  onConfirm: () => void
) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-55 z-50">
          <div className="dark:bg-gray-900 bg-white  p-4 shadow-lg rounded-md">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm">{message}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-md"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-1 rounded-md ml-2"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      );
    }
  });
};
