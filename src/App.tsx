import { useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import useTimer from "@/hooks/useTimer";
import useResponsiveFontSize from "@/hooks/useResponsiveFontSize";
import Modal from "./Modal";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Panel from "./Panel";

const App = () => {
  // 점수 판 열림 유무
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [timerRef, { height: timerHeight }] = useMeasure();
  const [panelRef, { height: panelHeight }] = useMeasure();
  const fontSize = useResponsiveFontSize(timerHeight);
  const { time, baseTime, start, setInitialTime } = useTimer();

  const handlePanelOpen = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Space") {
      e.preventDefault();
      start();
    }
  };

  return (
    <div className="w-dvw h-dvh overflow-hidden flex flex-col justify-end select-none tabular-nums">
      <div
        ref={timerRef}
        className={`h-full flex text-center items-center outline-0`}
        style={{ fontSize }}
        tabIndex={0}
        onKeyUp={(e) => handleKeyUp(e)}
        onClick={start}
      >
        <div className="w-full h-full flex items-center justify-end">
          <p>
            {Math.floor(time / 60)
              .toString()
              .padStart(2, "0")}
          </p>
        </div>
        <p className="shrink-0">:</p>
        <div className="w-full h-full flex items-center justify-start">
          <p>{(time % 60).toString().padStart(2, "0")}</p>
        </div>
      </div>
      {/* 세팅 */}
      <Modal baseTime={baseTime} setInitialTime={setInitialTime} />
      {/* 점수 판 */}
      <button
        onClick={handlePanelOpen}
        className={`absolute right-[10px] top-[70px] w-[50px] h-[50px] ${
          isPanelOpen ? "bg-gray-400" : "bg-gray-200"
        } rounded-xl flex justify-center items-center cursor-pointer`}
      >
        <Bars3Icon className="w-[25px] h-[25px]" />
      </button>
      <motion.div
        initial={{ height: "60px" }}
        animate={{ height: isPanelOpen ? panelHeight : "60px" }}
        transition={{ duration: 0.2 }}
      >
        <div ref={panelRef} className="shrink-0 text-center">
          <div tabIndex={-1} className="max-h-[50dvh] overflow-y-auto">
            <Panel isPanelOpen={isPanelOpen} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
