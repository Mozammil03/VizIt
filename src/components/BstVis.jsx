import React, { useEffect, useState } from "react";
import Button from "./Button";
import { NewNode } from "../utils/Node";

class Node {
  constructor(key, x, y) {
    this.key = key;
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
  }
}

const BstVis = () => {
  const [root, setRoot] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [val, setVal] = useState("");
  const [gen, setGen] = useState(10);
  const [delKey, setDelKey] = useState("");

  // Delete function
  const deleteNode = (key) => {
    setRoot((prevRoot) => {
      const newRoot = deleteNodeRec(prevRoot, key, 0, 0);
      updateVisualTree(newRoot);
      return newRoot;
    });
  };

  const deleteNodeRec = (node, key, x, y, depth = 0) => {
    if (node === null) return null;

    const comp = key - node.key;
    const newY = y + 60; // Adjusts vertical spacing between levels
    const horizontalSpacing = 10 / (depth + 1); // Dynamically reduce spacing with depth

    if (comp < 0) {
      node.left = deleteNodeRec(
        node.left,
        key,
        x - horizontalSpacing,
        newY,
        depth + 1
      );
    } else if (comp > 0) {
      node.right = deleteNodeRec(
        node.right,
        key,
        x + horizontalSpacing,
        newY,
        depth + 1
      );
    } else {
      if (node.left == null) return node.right;
      if (node.right == null) return node.left;

      const successor = minNode(node.right);
      node.key = successor.key;
      node.right = deleteNodeRec(
        node.right,
        successor.key,
        x + horizontalSpacing,
        newY,
        depth + 1
      );
    }
    return node;
  };

  const minNode = (node) => {
    let current = node;
    while (current.left !== null) current = current.left;
    return current;
  };

  // Insert function
  const insert = (key) => {
    setRoot((prevRoot) => {
      const newRoot = insertRec(prevRoot, key, -10, -10);
      updateVisualTree(newRoot);
      return newRoot;
    });
  };

  const insertRec = (node, key, x, y, depth = 0) => {
    if (node === null) return new Node(key, x, y);

    const comp = key - node.key;
    const newY = y + 50;
    const horizontalSpacing = 11 / (depth + 1);

    if (comp < 0) {
      node.left = insertRec(
        node.left,
        key,
        x - horizontalSpacing,
        newY,
        depth + 1
      );
    } else if (comp > 0) {
      node.right = insertRec(
        node.right,
        key,
        x + horizontalSpacing,
        newY,
        depth + 1
      );
    }
    return node;
  };

  const inorderRec = (node) => {
    
    if (node === null) return;
    console.log(node.key)
    setNodes((prevNodes) => [
      ...prevNodes,
      <NewNode node={node}/>
    ]);
    inorderRec(node.left);
    inorderRec(node.right);
  };
  const updateVisualTree = (currentRoot) => {
    setNodes([]);
    setEdges([]);
    inorderRec(currentRoot);
    logNodePositions(currentRoot);
  };

  useEffect(() => {
    if (root) updateVisualTree(root);
  }, [root]);

  const generateRandomly = (count) => {
    let n = nodes.length;
    while (n < count) {
      const rand = Math.floor(Math.random() * 100);
      insert(rand);
      n++;
    }
  };
  useEffect(()=> {
    generateRandomly(10);
  }, []);

  const logNodePositions = (node, depth = 0) => {
    if (node === null) return;
    logNodePositions(node.left, (depth -= 0.08));

    if (node.left) {
      setEdges((prevEdges) => [
        ...prevEdges,
        <div
          style={{
            width: `${5 + depth}rem`,
            position: "absolute",
            left: `${(node.x + node.left.x) / 2 + 50 - 1}%`,
            top: `${(node.y + node.left.y) / 2 + 50 + 15}px`,
            transform: `rotate(${
              Math.atan2(node.left.y - node.y, node.left.x - node.x) +
              0.8 +
              depth
            }rad)`,
            opacity: 1,
            animation: "fade-in 0.5s forwards",
          }}
          className="edge h-[6px] bg-black"
          key={`${node.key}-${node.left.key}`}
        ></div>,
      ]);
    }

    if (node.right) {
      setEdges((prevEdges) => [
        ...prevEdges,
        <div
          style={{
            width: `${5 + depth}rem`,
            position: "absolute",
            left: `${(node.x + node.right.x) / 2 + 50 - 1}%`,
            top: `${(node.y + node.right.y) / 2 + 50 + 15}px`,
            transform: `rotate(${
              Math.atan2(node.right.y - node.y, node.right.x - node.x) -
              0.55 -
              depth
            }rad)`,
            opacity: 1,
            animation: "fade-in 0.5s forwards",
          }}
          className="edge h-[6px] bg-black"
          key={`${node.key}-${node.right.key}`}
        ></div>,
      ]);
    }

    logNodePositions(node.right);
  };

  // Input handling
  const handleChange = (e) => setVal(e.target.value);

  const handleInsert = (e) => {
    e.preventDefault();
    const key = parseInt(val);
    if (!isNaN(key)) {
      insert(key);
      setVal("");
    }
  };

  const clearTree = () => {
    setNodes([]);
    setEdges([]);
    setRoot(null);
    setVal("");
    setDelKey("");
    setGen(10);
  };

  const handleGenChange = (e) => {
    const value = parseInt(e.target.value);
    setGen(isNaN(value) ? "" : value);
  };

  const handleDelKeyChange = (e) => {
    const value = parseInt(e.target.value);
    setDelKey(isNaN(value) ? "" : value);
  };

  return (
    <div className="h-auto w-[100%] relative flex flex-col ">
      <div className="flex flex-row w-[100%] relative transparent">
        <div className="w-[100%] h-[100vh]">
          {nodes.map((node) => node)}
          {edges.map((edge) => edge)}
        </div>
        <div className="w-[20%] h-[100vh] p-8 shadow-2xl shadow-[#000000] bg-green-900 flex flex-col gap-5 justify-center items-center">
          <div className="">
            <form className=" flex flex-col gap-2" onSubmit={handleInsert}>
              <label>
                <input
                  className="w-16 rounded-xl g"
                  type="text"
                  onChange={handleChange}
                  value={val}
                  placeholder=""
                />
              </label>

              <button type="submit">
                <Button name={"Insert"} />
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <input
              className="w-16 rounded-xl"
              type="text"
              onChange={handleGenChange}
              value={gen}
            />
            <div onClick={() => generateRandomly(gen)}>
              <Button name={"Random"} />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <input
              className="w-16 rounded-xl"
              type="text"
              onChange={handleDelKeyChange}
              value={delKey}
            />
            <div onClick={() => deleteNode(parseInt(delKey))}>
              <Button name={"Delete"} />
            </div>
          </div>
          <div
            className="flex flex-col gap-2 justify-center items-center"
            onClick={clearTree}
          >
            <Button name={"Clear"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BstVis;
