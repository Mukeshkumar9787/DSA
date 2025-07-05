import TreeNode from "./TreeNode.js";

class BinaryTree {
    constructor(value){
        this.root = new TreeNode(value);
    }

    traverseInOrder(node=this.root, result = []){
        if(!node) return
        this.traverseInOrder(node.left, result);
        result.push(node.value);
        this.traverseInOrder(node.right,result);
        return result;
    }

    traversePreOrder(node=this.root, result = []){
        if(!node) return
        result.push(node.value);
        this.traversePreOrder(node.left, result);
        this.traversePreOrder(node.right, result);
        return result;
    }

    traversePostOrder(node=this.root, result = []){
        if(!node) return
        this.traversePostOrder(node.left, result);
        this.traversePostOrder(node.right, result);
        result.push(node.value);
        return result;
    }

    traverseLevelOrder(){
        if(this.root === null) return [];
        const result = [];
        const queue = [this.root];
        while(queue.length > 0){
            let current = queue.shift();
            result.push(current.value);
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
        }
        return result;
    }

    insert(value){
        if(this.root === null){
            this.root = new TreeNode(value);
            return;
        }
        const queue = [this.root];
        while(queue.length > 0){
            let current = queue.shift();
            if(current.left) {
                queue.push(current.left);
            }else{
                current.left = new TreeNode(value);
                return;
            }
            if(current.right){
                queue.push(current.right);
            }else{
                current.right = new TreeNode(value);
                return;
            }
        } 
    }
}

export default BinaryTree;

const tree = new BinaryTree(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);
tree.root.left.right = new TreeNode(5);

console.log(tree.traverseLevelOrder()); // [1, 2, 3, 4, 5]
console.log(tree.traversePostOrder()); 
