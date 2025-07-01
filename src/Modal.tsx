import { useState } from "react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  time: number;
  setInitialTime: (newTime: number) => void;
  isStartView: boolean;
  setIsStartView: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ time, setInitialTime }: ModalProps) => {
  const TIME = [60, 90, 120];
  const [isMadalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleTimeCheck = (t: number) => {
    setInitialTime(t);
  };
  return (
    <>
      <button
        className={`absolute right-[10px] top-[10px] w-[50px] h-[50px] ${
          isMadalOpen ? "bg-gray-400" : "bg-gray-200"
        } rounded-xl flex justify-center items-center cursor-pointer`}
        onClick={handleModalOpen}
      >
        {isMadalOpen ? (
          <XMarkIcon className="w-[25px] h-[25px]" />
        ) : (
          <Cog6ToothIcon className="w-[25px] h-[25px]" />
        )}
      </button>
      {isMadalOpen && (
        <div className="absolute right-[70px] top-[10px] p-[20px] bg-white rounded-xl shadow-[0_0_0_1px_#e3e5e8]">
          <div>
            <p>시간 설정</p>
            <div className="flex pt-[20px] gap-[10px]">
              {TIME.map((v) => (
                <button
                  aria-checked={time === v}
                  onClick={() => handleTimeCheck(v)}
                  key={v}
                  className={`${
                    time === v ? "border-black" : "border-gray-200"
                  } w-[70px] text-[14px] border rounded-xl flex justify-center py-[10px] cursor-pointer`}
                >
                  {v}분
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
