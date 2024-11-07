import React, { useEffect, useState } from 'react'
import { Link, Route, Router, Routes } from 'react-router-dom'
import BstVis from './BstVis'
import BinaryTree from './BinaryTree';
import Home from '../pages/Home';
import { useDispatch } from "react-redux";
import { setCurrentTopic } from "../store/topicSlice";
import QuickSort from './QuickSort';
import NoUpload from '../utils/NoUpload';
import AVLtree from './AVLtree';



const topics = [
  {
    path: "/",
    element: <Home />,
    topicName: "",
    visible: false,
  },
  {
    path: "/bst",
    element: <BstVis />,
    topicName: "Binary Search Tree",
    visible: true,
  },
  {
    path: "/QuickSort",
    element: <QuickSort />,
    topicName: "Quick Sort",
    visible: true,
  },
  {
    path: "/AVLTree",
    element: <AVLtree/>,
    topicName: "AVL Tree",
    visible: true,
  },
  {
    path: "/binaryTree",
    element: <BinaryTree/>,
    topicName: "Binary Tree",
    visible: true,
  },
];
 for (let i = 1; i <= 15; i++) {
     topics.push({
         path: `${i}0`,
         element: <NoUpload/>,
         topicName: `Topic Not Posted`
    }); 
 }


export const TopicRoutes = () => {;
  return topics;
};


export const Navigation = () => { 
    const dispatch = useDispatch();
    const [activePath, setActivePath] = useState(null);

    const handleClickTopic = (topic) => {
        setActivePath(topic.path);
    }
    const handleClick = () => {
        setActivePath(null);
        dispatch(setCurrentTopic(""));

    }
 

  return (
    <div className="font-semibold h-[100%] overflow-y-auto overflow-x-hidden bg-green-800">
      <Link onClick={handleClick} to={"/"}>
        <div className="bg-green-950 text-white p-2 h-16  font-bold md:sm:text-3xl text-xl md:sm:p-4 w-[100%] ">
          Topics
        </div>
      </Link>
      <div className="">
        {topics.map((topic, index) => (
          <Link to={topic.path} key={index}>
            {topic.visible?<div
              onClick={() => {
                dispatch(setCurrentTopic(topic.topicName));
                handleClickTopic(topic);
              }}
              className={`p-2  border-gray-800 shadow-[#000000] border-b-[1px] hover:shadow-2xl text-gray-200 hover:text-white transition-all hover:bg-green-600 ${
                activePath == topic.path ? "bg-green-600" : "bg-green-900"
              }`}
            >
              {topic.topicName}
            </div>: ''}
          </Link>
        ))}
      </div>
    </div>
  );
}
