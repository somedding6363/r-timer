import { useEffect, useState } from "react";

const useResponsiveFontSize = (timerHeight: number) => {
  const [fontSize, setFontSize] = useState<number>(0);

  useEffect(() => {
    if (timerHeight === 0) return;

    const handleResize = () => {
      const maxFontSize = window.innerWidth * 0.3;
      const newFontSize = Math.min(timerHeight * 0.9, maxFontSize);
      setFontSize(newFontSize);
    };

    handleResize(); // 초기 실행

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [timerHeight]);

  return fontSize;
};

export default useResponsiveFontSize;
