/** BinaryTreeNode: node for a general tree. */
class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
  
    function dfsHelper(currNode) {
      if (!currNode.left && !currNode.right) return 1;
      
      if (!currNode.left) return dfsHelper(currNode.right) + 1;
      if (!currNode.right) return dfsHelper(currNode.left) + 1;
  
      return Math.min(dfsHelper(currNode.left), dfsHelper(currNode.right)) + 1;
    }
  
    return dfsHelper(this.root);
  }
  


  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function dfsHelper(currNode) {
      if (!currNode.left && !currNode.right) return 1;
      
      if (!currNode.left) return dfsHelper(currNode.right) + 1;
      if (!currNode.right) return dfsHelper(currNode.left) + 1;

      return Math.max(dfsHelper(currNode.left), dfsHelper(currNode.right)) + 1;
    }

    return dfsHelper(this.root);

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;

    let result = 0;

    function dfsHelper(currNode) {
      if (!currNode) return 0;

      let leftMax = dfsHelper(currNode.left);
      let rightMax = dfsHelper(currNode.right);
      // avoid adding negative values
      leftMax = Math.max(leftMax, 0);
      rightMax = Math.max(rightMax, 0);

      // update result for max path sum with split
      result = Math.max(result, currNode.val + leftMax + rightMax);

      // update result for max path sum without split
      return currNode.val + Math.max(leftMax, rightMax);
    }
    dfsHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let currentNextLarger = null;

    function dfsHelper(currNode) {
      if (!currNode) return;

      if (currNode.val > lowerBound && 
      (currentNextLarger === null || currNode.val < currentNextLarger)) {
        currentNextLarger = currNode.val;
      }

      dfsHelper(currNode.left);
      dfsHelper(currNode.right);
    }
    dfsHelper(this.root);
    return currentNextLarger;
    
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) return false;

    const queue = [{ node: this.root, parent: null, level: 0 }];

    let node1Info = null;
    let node2Info = null;

    while (queue.length > 0) {
      const { node, parent, level } = queue.shift();

      if (node === node1) {
        node1Info = { parent, level };
      } else if (node === node2) {
        node2Info = { parent, level };
      }

      if (node.left) {
        queue.push({ node: node.left, parent: node, level: level + 1 });
      }

      if (node.right) {
        queue.push({ node: node.right, parent: node, level: level + 1 });
      }
    }

    return (
      node1Info && node2Info &&
      node1Info.level === node2Info.level &&
      node1Info.parent !== node2Info.parent
    );
  }


  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  
  static serialize(binaryTree) {

    let result = '';

    function dfsHelper(currNode = binaryTree.root) {
      if (!currNode) result += "x";


      if (currNode) {
        result += currNode.val;

        dfsHelper(currNode.left);
        dfsHelper(currNode.right);
  
      }

    }
    dfsHelper(this.root);
    return result;
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize (str) {
    if (!str) return null;

    const characterArr = str.split("");

    function createTreeHelper() {
      if (characterArr.length > 0) {
        const currentChar = characterArr.shift();

        if (currentChar === "x") return null;

        let currentNode = new BinaryTreeNode(+currentChar);
        currentNode.left = createTreeHelper();
        currentNode.right = createTreeHelper();

        return currentNode;
      }
    }

  const newTree = createTreeHelper();
  return new BinaryTree(newTree);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  // lowestCommonAncestor(node1, node2) {
    
}

module.exports = { BinaryTree, BinaryTreeNode };
