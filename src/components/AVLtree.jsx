import React, { useState, useEffect } from "react";
import Button from "./Button";

// Node class for AVL tree structure
class Node {
  constructor(key) {
    this.left = null;
    this.right = null;
    this.key = key;
    this.height = 1;
    this.x = 1;
    this.y = 1;
  }
}

const AVLTree = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [root, setRoot] = useState(null);
  const [val, setVal] = useState("");
  const [gen, setGen] = useState(5);

  // Helper functions for AVL tree logic
  const heightNode = (node) => (node === null ? 0 : node.height);
  const getBalance = (node) =>
    node === null ? 0 : heightNode(node.left) - heightNode(node.right);

  const rightRotation = (node) => {
    let x = node.left;
    let t2 = x.right;

    node.left = t2;
    x.right = node;

    node.height = Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    x.height = Math.max(heightNode(x.left), heightNode(x.right)) + 1;

    return x;
  };

  const leftRotation = (node) => {
    let x = node.right;
    let t2 = x.left;

    node.right = t2;
    x.left = node;

    node.height = Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    x.height = Math.max(heightNode(x.left), heightNode(x.right)) + 1;

    return x;
  };

  const insert = (key) => {
    setRoot((prevRoot) => insertRec(prevRoot, key));
  };

  const insertRec = (node, key) => {
    if (node === null) return new Node(key);

    if (key < node.key) {
      node.left = insertRec(node.left, key);
    } else if (key > node.key) {
      node.right = insertRec(node.right, key);
    } else {
      return node;
    }

    node.height = Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    const balance = getBalance(node);

    if (balance > 1 && key < node.left.key) {
      return rightRotation(node);
    }
    if (balance < -1 && key > node.right.key) {
      return leftRotation(node);
    }
    if (balance > 1 && key > node.left.key) {
      node.left = leftRotation(node.left);
      return rightRotation(node);
    }
    if (balance < -1 && key < node.right.key) {
      node.right = rightRotation(node.right);
      return leftRotation(node);
    }

    return node;
  };

  const updatePositions = (node, x, y, offsetX) => {
    if (node) {
      node.x = x;
      node.y = y;
      updatePositions(node.left, x - offsetX - 10, y + 80, offsetX / 2);
      updatePositions(node.right, x + offsetX + 10, y + 80, offsetX / 2);
    }
  };

  const preOrder = (node) => {
    if (node !== null) {
      setNodes((prevNodes) => [
        ...prevNodes,
        <div
          className="absolute"
          style={{
            transform: `translateX(${node.x}px) translateY(${node.y}px)`,
          }}
          key={node.key}
        >
          <div className="p-1 h-10 text-white w-10 transition-all bg-green-950 font-bold rounded-full scale-125 flex items-center justify-center">
            {node.key}
          </div>
        </div>,
      ]);

      if (node.left) createEdge(node, node.left);
      if (node.right) createEdge(node, node.right);

      preOrder(node.left);
      preOrder(node.right);
    }
  };

  const createEdge = (parent, child) => {
    const deltaX = child.x - parent.x;
    const deltaY = child.y - parent.y;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    setEdges((prevEdges) => [
      ...prevEdges,
      <div
        key={`${parent.key}-${child.key}`}
        className="absolute bg-black"
        style={{
          width: `${length}px`,
          height: "6px",
          transform: `${
            parent !== root
              ? `translate(${parent.x + 45}px, ${
                  parent.y + 24
                }px) rotate(${angle}deg)`
              : `translate(${parent.x + 75}px, ${
                  parent.y + 16
                }px) rotate(${angle}deg)`
          }`,
          transformOrigin: "0 0",
          zIndex: 0,
        }}
      />,
    ]);
  };

  const generateRandomly = (count) => {
    let n = nodes.length;
    while (n < count) {
      const rand = Math.floor(Math.random() * 100);
      insert(rand);
      n++;
    }
  };

  // Handle the AVL tree updates when root changes
  useEffect(() => {
    if (root) {
      setNodes([]);
      setEdges([]);
      updatePositions(root, 0, 0, 120);
      preOrder(root);
    }
  }, [root]);
    
    useEffect(() => {
        setNodes([]);
        setEdges([])
        generateRandomly(5);
    },[])

  // Form submission for inserting nodes
  const handleInsert = (e) => {
    e.preventDefault();
    const key = parseInt(val);
    if (!isNaN(key)) {
      insert(key);
      setVal("");
    }
  };

  // Handle random generation count change
  const handleGenChange = (e) => {
    const value = parseInt(e.target.value);
    setGen(isNaN(value) ? "" : value);
  };

  // Clear tree and reset all states
  const clearTree = () => {
    setNodes([]);
    setEdges([]);
    setRoot(null);
    setVal("");
  };
  
  const [del, setDel] = useState(0);

  const deleteKey = () => {
    // deleteNode(del);
  }
  const handleDelete = (e) => {
    setDel(() => e.target.value);
  }


  return (
    <div className="w-[100%] h-[100%] mb-10 flex bg-green-600 md:sm:flex-row flex-col scale-100  md:sm:scale-100 gap-2 md:sm:gap-0">
      <div className="w-[100%] md:sm:w-[80%] scale-75 pr-20 h-screen p-4 pl-20 md:sm:pl-0 flex justify-center bg-green-600 relative">
        {edges}
        {nodes}
      </div>

      <div className="w-[100%] md:sm:scale-100 scale-150 h-screen md:sm:w-1/5 md:sm:flex-col p-8 md:sm:shadow-2xl shadow-[#000000] shadow-none md:sm:bg-green-900 flex flex-row gap-5 justify-center items-center">
        <form className="flex flex-col gap-2" onSubmit={handleInsert}>
          <input
            className="w-16 rounded-xl"
            type="text"
            onChange={(e) => setVal(e.target.value)}
            value={val}
          />
          <Button name="Insert" />
        </form>

        <div className="flex flex-col gap-2 justify-center items-center">
          <input
            className="w-16 rounded-xl"
            type="text"
            onChange={handleGenChange}
            value={gen}
          />
          <div onClick={() => generateRandomly(gen)}>
            <Button name="Random" />
          </div>
        </div>

        <div
          className="flex flex-col gap-2 justify-center items-center"
          onClick={clearTree}
        >
          <Button name="Clear" />
        </div>
        <div className="flex flex-col !text-red-700 gap-2 justify-center items-center">
          <input
            className="w-16 rounded-xl"
            type="text"
            onChange={handleDelete}
            value={del}
          />
          <div onClick={deleteKey}>
            <Button name="Delete" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AVLTree;
