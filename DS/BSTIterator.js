class BSTIterator{
    constructor(root){
        this.stack = [];
        this.#pushLeftValues(root);
    }

    #pushLeftValues(node){
        while(node !== null){
            this.stack.push(node);
            node = node.left;
        }
    }

    next(){
        let current = this.stack.pop();
        if(current.right !== null){
            this.#pushLeftValues(current.right);
        }
        return current.value;
    }

    hasNext(){
        return this.stack.length > 0;
    }
}

const root = {
    value: 7,
    left: {
        value: 3,
        left: null,
        right: null
    },
    right: {
        value: 15,
        left: {
            value: 9,
            left: null,
            right: null
        },
        right: {
            value: 20,
            left: null,
            right: null
        }
    }
};

const it = new BSTIterator(root);
while (it.hasNext()) {
    console.log(it.next());
}

export default BSTIterator;
