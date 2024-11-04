import React, { useState, useEffect } from 'react'
import Button from './Button';
function generateUniqueRandomNumbers(min, max) {
  const range = max - min + 1;
  const numbers = Array.from({ length: range }, (_, i) => i + min); // Creates array from min to max

  // Shuffle the array to randomize order
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements
  }

  return numbers; // Return the shuffled array
}


const QuickSort = () => {
  const [ran, setRan] = useState([]);
  const [mid, setMid] = useState();
  const [auto, setAuto] = useState(false);

  const sort = (arr, lo, hi) => {
    if (lo >= hi) return;
    const mid = partition(arr, lo, hi);
    setMid(mid);
    setTimeout(() => {
      sort(arr, lo, mid - 1);
    }, 700);
    setTimeout(() => {
      sort(arr, mid + 1, hi);
    }, 700);
  };
  const partition = (arr, lo, hi) => {
    let i = lo + 1;
    let j = hi;
    let piv = arr[lo];
    while (true) {
      while (i <= hi && arr[i] < piv) i++;
      while (j >= lo && arr[j] > piv) j--;

      if (i >= j) break;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[lo], arr[j]] = [arr[j], arr[lo]];
    return j;
  };
  useEffect(() => {
    setRan(generateUniqueRandomNumbers(0, 100));
    sort(ran, 0, ran.length - 1);
  }, []);
  useEffect(() => {
    sort(ran, 0, ran.length - 1);
  }, []);

  const randomize = () => {
    setRan(generateUniqueRandomNumbers(0, 100));
  };
  const sortBut = () => {
    sort(ran, 0, ran.length - 1);
  };
  

  

  return (
    <div className="w-[100%] h-[100%] p-20 bg-green-600 flex justify-end flex-col">
      <div className="flex flex-row gap-4 justify-center pb-4">
        <div onClick={randomize}>
          <Button name={"RANDOMIZE"} />
        </div>

        <div onClick={sortBut}>
          <Button name={"SORT"} />
        </div>
        {/* <div onClick={autoBtn}>
          <Button name={auto ? "Auto" : "STOP"} />
        </div> */}
        {/* {auto?<div>Stop</div>:""} */}
      </div>
      <div className=" shadow-xl shadow-[#000000] border-4 overflow-hidden rounded-3xl border-green-950 h-[100%] w-[100%] flex flex-col justify-end items-end bg-green-400 ">
        <div className="h-[80vh] w-full flex flex-row justify-evenly items-end  relative">
          {ran.map((value, index) => (
            <div
              key={index}
              style={{
                height: `${value * 1}%`,
                // backgroundColor: `${value == mid ? "white" : ""}`,
              }}
              className=" w-[4px] bg-green-950 flex flex-col items-center justify-end origin-top "
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickSort