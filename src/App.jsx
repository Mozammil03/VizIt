import React from 'react'
import {Navigation} from './components/Navigation'
import { Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";


const App = () => {
  const currentTopicName = useSelector((state) => state.topic.currentTopicName);
  // console.log(currentTopicName)
  return (
    <div className="h-[100vh] w-[100vw] bg-green-950 pb-4 pl-0 pr-0  md:sm:pr-20 md:sm:pl-20 scale-100 flex overflow-hidden">
      <div className="w-[15%] shadow-2xl shadow-[#000000] h-[100vh] ">
        <Navigation />
      </div>

      <div className="w-[85%] h-[100vh] shadow-2xl shadow-[#000000] bg-green-600">
        <div className="bg-green-950 text-white h-16 shadow-2xl shadow-[#0000007a] flex justify-between font-bold w-[100%] flex-row items-center p-4 ">
          <div className=" text-white flex-grow flex justify-center font-semibold text-2xl">
            {currentTopicName ? (
              <span className="text-green-600 shadow-md ">‣&nbsp;</span>
            ) : (
              ""
            )}
            {currentTopicName}
          </div>
          <div className="text-center text-xl shadow-2xl shadow-[#000000] font-bold mr-10 bg-green-700 p-2 rounded-2xl ">
            CS
            <span className="text-green-950 shadow-2xl shadow-[#000000]">
              visual
            </span>
          </div>
          {/* <div className=" text-white p-4 h-16  font-bold text-3xl w-[15%] ">
            Controls
          </div> */}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default App