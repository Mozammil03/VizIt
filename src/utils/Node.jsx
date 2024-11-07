import React from 'react'

export const NewNode = ({node}) => {
  return (
    <div
        style={{
          position: "absolute",
          zIndex: 1000,
          left: `${node.x + 50}%`,
          top: `${node.y + 50}px`,
          opacity: 1,
          animation: "fade-in 0.5s forwards",
        }}
        className={`p-1 h-10  text-white w-10 bg-green-950 font-bold rounded-full scale-125 flex items-center justify-center`}
        key={node.key}
      >
        {node.key}
      </div>
  )
}

export const Edges = ({ node, key,depth, style}) => {

  return (
    <div
          style={{
          ...style,
        width: `${5 + depth}rem`,
        position: "absolute",
        opacity: 1,
        animation: "fade-in 0.5s forwards",
      }}
      className="edge h-[6px] bg-black"
      key={key}
    ></div>
  );
};