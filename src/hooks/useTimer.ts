import { useCallback, useEffect, useRef, useState } from "react";
import audio1 from "@/assets/audio/1.mp3";
import audio2 from "@/assets/audio/2.mp3";

const useTimer = (initialTime: number = 60) => {
  const [time, setTime] = useState<number>(initialTime);
  const [baseTime, setBaseTime] = useState<number>(initialTime);
  const timerRef = useRef<number | null>(null);
  const sound1Ref = useRef<HTMLAudioElement | null>(null);
  const sound2Ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    sound1Ref.current = new Audio(audio1);
    sound2Ref.current = new Audio(audio2);
  }, []);

  // 타이머 리셋
  const reset = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTime(baseTime);
  }, [baseTime]);

  // 타이머 시작
  const start = useCallback(() => {
    reset();

    timerRef.current = window.setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [reset]);

  const setInitialTime = useCallback((newTime: number) => {
    setBaseTime(newTime);
    setTime(newTime);
  }, []);

  useEffect(() => {
    if (time !== 1 && time % 30 === 1) {
      sound1Ref.current?.play().catch((e) => {
        console.error("audio1 재생 실패:", e);
      });
    }
    if (time === 1) {
      sound2Ref.current?.play().catch((e) => {
        console.error("audio2 재생 실패:", e);
      });
    }
  }, [time]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { time, baseTime, start, setInitialTime };
};

export default useTimer;
