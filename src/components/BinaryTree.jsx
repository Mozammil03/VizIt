import React, { useState } from 'react'
class Node{
  constructor() {
    this.x = x;
    this.y = y;
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

const BinaryTree = () => {
  const [root, setRoot] = useState(null);
  const insert = (key) => {
    setRoot((prevRoot) => insertRec(prevRoot, key, x, y));
  }
  const insertRec = (node, key, x, y) => {
    if (node == null) return new Node(key, 0, 0);
    if (node.left == null) {
      node.left = new Node(key, x - 10, y);
    } else if (node.right == null) {
      node.right = new Node(key, x + 10, y);
    } else {
      insertRec(node.left, x, y);
    }
    return node;
  }
  




  return (
    <div>gaved Up</div>
  )
}

export default BinaryTree