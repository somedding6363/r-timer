import { useEffect, useRef, useState } from "react";

interface PanelProps {
  isPanelOpen: boolean;
}
const initialPeople = 3;
const Panel = ({ isPanelOpen }: PanelProps) => {
  const [scores, setScores] = useState<number[][]>(
    Array.from({ length: initialPeople }, () => [])
  );
  const [totalScore, setTotalScore] = useState<number[]>(
    new Array(initialPeople).fill(0)
  );
  const [people, setPeople] = useState<number>(scores.length);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const setInputRef = (el: HTMLInputElement | null, index: number) => {
    inputRefs.current[index] = el;
  };
  useEffect(() => {
    inputRefs.current = new Array(people).fill(null);
  }, [people]);

  useEffect(() => {
    const storedRTimerScore = localStorage.getItem("r-timer-score");
    if (storedRTimerScore) {
      try {
        const parsed = JSON.parse(storedRTimerScore);
        if (Array.isArray(parsed)) {
          setScores(parsed);
          setTotalScore(
            parsed.map((v) => v.reduce((acc: number, cur: number) => acc + cur))
          );
        }
      } catch (e) {
        console.error("invalid JSON in localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (scores.length !== people) {
      setPeople(scores.length);
    }

    setTotalScore(scores.map((v) => v.reduce((acc, cur) => acc + cur, 0)));
  }, [scores]);

  // 순서는 그대로 두되, 등수만
  const ranks = totalScore.map((score) => {
    const rank = totalScore.filter((s) => s > score).length + 1;
    return rank;
  });

  const handlePlus = () => {
    const newPeople = Math.min(6, people + 1);
    setPeople(newPeople);
    setScores(Array.from({ length: newPeople }, () => []));
  };

  const handleMinus = () => {
    const newPeople = Math.max(1, people - 1);
    setPeople(newPeople);
    setScores(Array.from({ length: newPeople }, () => []));
  };

  const handleCalc = () => {
    const values = inputRefs.current.map((ref) => ref?.value ?? "");
    if (values.some((v) => v.trim() === "" || isNaN(Number(v)))) return;
    const newScores = scores.map((scoreList, idx) => [
      ...scoreList,
      Number(values[idx]),
    ]);

    setScores(newScores);
    localStorage.setItem("r-timer-score", JSON.stringify(newScores));
  };

  return (
    <div className="w-full h-full flex flex-nowrap gap-[10px]">
      {scores.map((v, i) => (
        <div
          key={`player${i}-${v.join("-")}`}
          className="w-full bg-gray-100 rounded-t-2xl"
        >
          <div className="h-[60px] flex items-center px-[20px] gap-[10px]">
            <div
              className={`rounded ${
                ranks[i] === 1 ? "bg-amber-400" : "bg-gray-300"
              } px-[10px] py-[5px] text-[12px] text-nowrap`}
            >
              {ranks[i]}등
            </div>
            <p className="text-nowrap">{i + 1} player</p>
            <p className="text-[30px]">{totalScore[i]}</p>
          </div>
          {isPanelOpen && (
            <>
              <div className="px-[20px]">
                <input
                  type="number"
                  ref={(el) => setInputRef(el, i)}
                  className="bg-white w-full h-[40px] text-[32px]"
                />
              </div>
              <div>
                {v.map((v1, i1) => (
                  <div key={`${v1}-${i1}`}>
                    <div className="text-[20px] py-[10px]">{v1}</div>
                    <div className="h-[1px] bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      <div className="w-[60px] shrink-0 bg-gray-100 rounded-t-2xl">
        {isPanelOpen && (
          <div className="py-[50px] flex flex-col justify-center items-center gap-[10px]">
            <button
              onClick={handleCalc}
              className="w-[50px] h-[50px] flex justify-center items-center rounded-full p-[10px] bg-gray-300 text-[12px] cursor-pointer"
            >
              계산
            </button>
            <div
              onClick={handlePlus}
              className="w-[50px] h-[50px] flex justify-center items-center rounded-full p-[10px] bg-gray-300 cursor-pointer"
            >
              +
            </div>
            <div
              onClick={handleMinus}
              className="w-[50px] h-[50px] flex justify-center items-center rounded-full p-[10px] bg-gray-300 cursor-pointer"
            >
              -
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Panel;
