import Node from './Node.js';

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    // Add value to the end
    let newNode = new Node(value);
    if(!this.head){
      this.head = newNode;
      return;
    }
    let curr = this.head;
    while(curr.next){
      curr = curr.next;
    }
    curr.next = newNode;
  }

  prepend(value) {
    // Add value to the beginning
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  delete(value) {
    // Remove first node with matching value
    if(!this.head) return;
    if(this.head.value === value){
      this.head = this.head.next;
      return;
    }
    let curr = this.head;
    while(curr.next){
      if(curr.next.value === value){
        curr.next = curr.next.next;
        return;
      }
      curr = curr.next;
    }
  }

  print() {
    // Print all values in the list
    if(!this.head) return;
    let curr = this.head;
    let result = [];
    while(curr){
      result.push(curr.value);
      curr = curr.next;
    }
    console.log(result.join('->'));
  }

  reverse(){
    let prev = null;
    let curr = this.head;
    while(curr){
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  findMiddle(){
    let slow = this.head;
    let fast = this.head;
    while(fast && fast.next){
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow.value;
  }

  isCycle(){
    let slow = this.head;
    let fast = this.head;
    while(fast && fast.next){
      slow = slow.next;
      fast = fast.next.next;
      if(slow === fast){
        return true;
      }
    }
    return false;
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
// list.append(3);
// list.append(4);

list.print();   // 1 2 3
// list.reverse();
list.print();   // 3 2 1 ✅
console.log(list.findMiddle());
