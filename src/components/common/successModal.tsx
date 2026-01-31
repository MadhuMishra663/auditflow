import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
  title?: string;
  duration?: number; // auto close time in ms
  onClose: () => void;
}

const SuccessModal = ({
  isOpen,
  message,
  title = "Success",
  duration = 2000,
  onClose,
}: SuccessModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Blur background */}
      <div className="fixed inset-0 z-40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[90%] max-w-sm animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            {title}
          </h3>

          <p className="mt-2 text-center text-gray-600">{message}</p>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
