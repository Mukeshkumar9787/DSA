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

    KthLargestValue(k){
        return this.#KthLargestValueHelper(this.root, k);
    }
    
    #KthLargestValueHelper(node,k, counter={count: 0}){
        if(node === null) return null;
        let rightValue = this.#KthLargestValueHelper(node.right,k, counter);
        if(rightValue !== null) return rightValue;
        counter.count++;
        if(counter.count === k) return node.value;
        let leftValue = this.#KthLargestValueHelper(node.left,k, counter);
        if(leftValue !== null) return leftValue
        return null;
    }

    floor(target){
        return this.#floorHelper(target, this.root);
    }

    #floorHelper(target, node, potentialFloor = {value:null}){
        if(node === null) return null;
        if(node.value === target) return target;
        if(target < node.value){
            let leftValue = this.#floorHelper(target, node.left, potentialFloor);
            if(leftValue !== null){
                return leftValue;
            }
        }else{
            potentialFloor.value = node.value;
            let rightValue = this.#floorHelper(target, node.right, potentialFloor);
            if(rightValue !== null){
                return rightValue;
            }
        }
        return potentialFloor.value;
    }

    ceil(target){
        return this.#ceilHelper(target, this.root);
    }

    #ceilHelper(target, node, potentialCeil = {value:null}){
        if(node === null) return null;
        if(node.value === target) return target;
        if(target < node.value){
            potentialCeil.value = node.value;
            let leftValue = this.#ceilHelper(target, node.left, potentialCeil);
            if(leftValue !== null){
                return leftValue;
            }
        }else{
            let rightValue = this.#ceilHelper(target, node.right, potentialCeil);
            if(rightValue !== null){
                return rightValue;
            }
        }
        return potentialCeil.value;
    }

    inOrderSuccessor(targetValue){
        let successor = null;
        let current = this.root;
        while(current !== null){
            if(targetValue < current.value){
                successor=current.value;
                current = current.left;
            }else{
                current = current.right;
            }
        }
        return successor;
    }

    lowestCommonAncestor(p, q){
        let current = this.root;
        while(current){
            if((p < current.value) && (q < current.value)){
                current = current.left;
            }else if(p > current.value && q > current.value){
                current = current.right;
            }else{
                return current;
            }            
        }
        return null;
    }

    inOrderValuesArr(node=this.root, result = []){
        if(node == null) return result;
        this.inOrderValuesArr(node.left, result);
        result.push(node.value);
        this.inOrderValuesArr(node.right, result);
        return result;
    }

    buildTreeFromSortedArr(sortedArr, l, r){
        if(l > r) return null;
        let mid = Math.floor((l + r) / 2);
        let node = new TreeNode(sortedArr[mid]);
        node.left = this.buildTreeFromSortedArr(sortedArr, l, mid - 1);
        node.right = this.buildTreeFromSortedArr(sortedArr, mid + 1, r);
        return node;
    }   

    balance(){
        let sortedValues = this.inOrderValuesArr();
        this.root = this.buildTreeFromSortedArr(sortedValues, 0, sortedValues.length - 1);
        return this.root;
    }
}

export default BinarySearchTree;




