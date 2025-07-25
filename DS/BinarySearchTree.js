import TreeNode from "./TreeNode.js";

class BinarySearchTree {
    constructor(value){
        this.root = value ? new TreeNode(value) : null;
    }

    insert(value){
        this.root = this.#recursiveInsert(value, this.root);
    }

    search(value){
        return this.#recursiveSearch(value);
    }

    contains(value){
        return this.search(value) !== null;
    }

    findMin(){
        return this.#findMinOrMax("left");
    }

    findMax(){
        return this.#findMinOrMax("right");
    }

    
    delete(value){
        this.root = this.#recursiveDelete(value);
    }

    #findMinOrMax(child, node = this.root){
        if(node === null) return null;
        while(node[child]){
            node = node[child];
        }
        return node.value;
    }

    #recursiveInsert(value, node){
        if(node === null){
            return new TreeNode(value);
        }
        if(value < node.value){
            node.left = this.#recursiveInsert(value, node.left);
        }else{
            node.right = this.#recursiveInsert(value, node.right);
        }
        return node;
    }

    #recursiveSearch(value, node = this.root){
        if(node === null) return null;
        if(node.value === value) return node;
        if(value < node.value){
            return this.#recursiveSearch(value, node.left);
        }else{
            return this.#recursiveSearch(value, node.right);
        }
    }

    #recursiveDelete(value, node = this.root){
        if(node === null) return null;
        if(value < node.value){
            node.left = this.#recursiveDelete(value, node.left);
        }else if(value > node.value){
            node.right = this.#recursiveDelete(value, node.right);
        }else{
            // Node Found
            if((node.left === null) && (node.right === null)){ // leaf - no child
                return null;
            }
            if(node.left === null){                            // only right child
                return node.right;
            }
            if(node.right === null){                           // only left child
                return node.left;
            }
            let minRightNodeValue = this.#findMinOrMax('left', node.right); // Node has 2 childs, take the min in right as standard practice
            node.value = minRightNodeValue; // replace the value;
            node.right = this.#recursiveDelete(minRightNodeValue, node.right); // remove the value from right branch and assign to right;
        }
        return node;
    }
    
    printTree(node = this.root, indent = "", position = "root") {
        if (node === null) return;

        this.printTree(node.right, indent + "   ", "right");
        console.log(`${indent}${position === "root" ? "└── " : position === "right" ? "┌── " : "└── "}${node.value}`);
        this.printTree(node.left, indent + "   ", "left");
    }

    isValidBST(node = this.root, min = -Infinity, max = Infinity){
        if(node === null) return true;
        if((node.value <= min) || (node.value >= max)) return false;
        return this.isValidBST(node.left, min, node.value) && this.isValidBST(node.right, node.value, max);
    }

    height(node = this.root){
        if(node === null) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    checkBalanced(node = this.root){
        if(node === null) return 0;
        let left = this.checkBalanced(node.left);
        if(left === -1) return -1;
        let right = this.checkBalanced(node.right);
        if(right === -1) return -1;
        if(Math.abs(left - right) > 1){
            return -1;
        }
        return 1 + Math.max(left, right);
    }

    isBalanced(){
        return this.checkBalanced() !== -1;
    }

    LCA(p, q){
        if(!this.contains(p) || !this.contains(q)) return null;
        let node = this.root;
        while(node){
            if((p < node.value) && (q < node.value)){
                node = node.left;
            }else if((p > node.value) && (q > node.value)){
                node = node.right;
            }else{
                return node;
            }
        }
        return null;
    }

    LCARecursive(p, q){
        if (!this.contains(p) || !this.contains(q)) {
            return null; // One or both values not present
        }
        return this.#LCAHelper(p, q);
    }

    #LCAHelper(p, q, node = this.root){
        if(node === null) return null;
        if((p < node.value) && (q < node.value)){
            return this.#LCAHelper(p, q, node.left);
        }
        if((p > node.value) && (q > node.value)){
            return this.#LCAHelper(p, q, node.right);
        }
        return node; //LCA
    }

    rangeSum(low, high){
        return this.#rangeSumHelper(this.root, low, high);
    }

    #rangeSumHelper(node, low, high){
        if(node === null) return 0;

        // If node value is less than low, skip the entire left tree 
        if(node.value < low) {
            return this.#rangeSumHelper(node.right, low, high);
        }

        // If node value is greater than high, skip the entire right tree
        if(node.value > high){
            return this.#rangeSumHelper(node.left, low, high);
        }

        return node.value + this.#rangeSumHelper(node.left, low, high) + this.#rangeSumHelper(node.right, low, high);
    }

    closestValue(targetValue){
        return this.#closestValueHelper(this.root, targetValue);
    }

    #closestValueHelper(node,targetValue,closest=null){
        if(node === null) return closest;

        if(node.value === targetValue) return node.value;
        
        if(closest === null){
            closest = node.value;
        }else{
            let currentDiff = Math.abs(node.value - targetValue);
            let closestDiff = Math.abs(closest - targetValue );
            if(currentDiff < closestDiff){
                closest = node.value;
            };
        }

        if(node.value < targetValue){
            closest = this.#closestValueHelper(node.right, targetValue, closest);
        }else{
            closest = this.#closestValueHelper(node.left, targetValue, closest);
        }
        return closest;
    }   

    KthSmallestValue(k){
        return this.#KthSmallestValueHelper(this.root, k);
    }
    
    #KthSmallestValueHelper(node,k, counter={count: 0}){
        if(node === null) return null;
        let leftValue = this.#KthSmallestValueHelper(node.left,k, counter);
        if(leftValue !== null) return leftValue
        counter.count++;
        if(counter.count === k) return node.value;
        let rightValue = this.#KthSmallestValueHelper(node.right,k, counter);
        if(rightValue !== null) return rightValue;
        return null;
    }
}

export default BinarySearchTree;

// let bst = new BinarySearchTree(20);
// [10, 30, 5, 15, 25, 35].forEach(val => bst.insert(val));

// let lca = bst.LCARecursive(5, 15);
// console.log("LCA of 5 and 15:", lca?.value); // Should be 10

const bst = new BinarySearchTree();
[5,3, 8, 2, 4, 10, 1].forEach(v => bst.insert(v));

bst.printTree();

// Test Case 1: k = 1 (smallest)
console.log(bst.KthSmallestValue(1)); // Expected: 1

// Test Case 2: k = 3
console.log(bst.KthSmallestValue(3)); // Expected: 3

// Test Case 3: k = 5
console.log(bst.KthSmallestValue(5)); // Expected: 5

// Test Case 4: k = 7 (largest)
console.log(bst.KthSmallestValue(7)); // Expected: 10

// Test Case 5: k = 8 (out of bounds)
console.log(bst.KthSmallestValue(8)); // Expected: null

// Test Case 6: k = 0 (invalid input)
console.log(bst.KthSmallestValue(0)); // Expected: null

// Test Case 7: Empty BST
const emptyBST = new BinarySearchTree(null);
console.log(emptyBST.KthSmallestValue(1)); // Expected: null

