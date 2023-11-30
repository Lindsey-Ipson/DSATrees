/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;

    const toAddQueue = [this.root];
    let total = 0;
    while (toAddQueue.length) {
      const currNode = toAddQueue.shift();
      total += currNode.val;
      for (let child of currNode.children) {
        toAddQueue.push(child);
      }
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    const toCheckQueue = [this.root];
    let total = 0;
    while (toCheckQueue.length) {
      const currNode = toCheckQueue.shift();
      if (currNode.val % 2 === 0) total++;
      for (let child of currNode.children) {
        toCheckQueue.push(child);
      }
    }
    return total;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    const toCheckQueue = [this.root];
    let total = 0;
    while (toCheckQueue.length) {
      const currNode = toCheckQueue.shift();
      if (currNode.val > lowerBound) total++;
      for (let child of currNode.children) {
        toCheckQueue.push(child);
      }
    }
    return total;
  }
}

module.exports = { Tree, TreeNode };
