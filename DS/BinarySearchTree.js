import TreeNode from "./TreeNode.js";

class BinarySearchTree {
    constructor(value){
        this.root = new TreeNode(value);
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
}

export default BinarySearchTree;

let bst = new BinarySearchTree(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);


// bst.delete(20);  // leaf
// bst.printTree();

// bst.delete(30);  // one child
// bst.printTree();

bst.printTree();
bst.delete(50);  // two children
bst.printTree();

