import { useEffect, useRef, useState } from "react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  baseTime: number;
  setInitialTime: (newTime: number) => void;
}

const Modal = ({ baseTime, setInitialTime }: ModalProps) => {
  const TIME = [60, 90, 120];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleTimeCheck = (t: number) => {
    setInitialTime(t);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div ref={modalRef}>
      <button
        className={`absolute right-[10px] top-[10px] w-[50px] h-[50px] ${
          isModalOpen ? "bg-gray-400" : "bg-gray-200"
        } rounded-xl flex justify-center items-center cursor-pointer`}
        onClick={handleModalOpen}
      >
        {isModalOpen ? (
          <XMarkIcon className="w-[25px] h-[25px]" />
        ) : (
          <Cog6ToothIcon className="w-[25px] h-[25px]" />
        )}
      </button>
      {isModalOpen && (
        <div className="absolute right-[70px] top-[10px] p-[20px] bg-white rounded-xl shadow-[0_0_0_1px_#e3e5e8]">
          <div>
            <p>시간 설정</p>
            <div className="flex pt-[20px] gap-[10px]">
              {TIME.map((v) => (
                <button
                  aria-checked={baseTime === v}
                  onClick={() => handleTimeCheck(v)}
                  key={v}
                  className={`${
                    baseTime === v ? "border-black" : "border-gray-200"
                  } w-[70px] text-[14px] border rounded-xl flex justify-center py-[10px] cursor-pointer`}
                >
                  {v}분
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
