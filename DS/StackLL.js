import Node from "./Node.js"

class StackLL {

    constructor(){
        this.top = null;
    }

    /* pushing the value into top of the stack  
     * create newNode. 
     * link the current top to the next of the new Node, 
     * then make the new Node as top of the stack. 
    */
    push(value){
        let newNode = new Node(value);
        newNode.next = this.top;
        this.top = newNode;
    }

    /* pop the top node from stack  
        * make the next of top node as top if top has next or make the top as null
    */

    pop(){
        if(this.top === null) return null;
        let top = this.top;
        this.top = this.top.next;
        return top.value;
    }

    peek(){
        if(this.top === null) return null;
        return this.top.value;
    }

    isEmpty(){
        return this.top === null;
    }


}

export default StackLL;


const stack = new StackLL();
stack.push(10);
stack.push(20);
console.log(stack.peek());  // 20
console.log(stack.pop());   // 20
console.log(stack.pop());   // 10
console.log(stack.isEmpty()); // true