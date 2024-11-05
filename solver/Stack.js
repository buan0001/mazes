// Implemented with singly linked list
// Last in first out
export default class Stack {
  tail = null;

  push(data) {
    const newNode = new Node(data);
    newNode.next = this.tail;
    this.tail = newNode;
  }

  pop() {
    const prev = this.tail;
    if (prev){
      this.tail = prev.next;

    }

    return prev;
  }

  peek() {
    return this.tail;
  }

  size() {
    let size = 0;
    let current = this.tail;

    while (current) {
      size++;
      current = current.next;
    }

    return size;
  }

  get(index) {
    let currentIndex = 0;
    let current = this.tail;

    while (currentIndex < index) {
      currentIndex++;
      if (current == null){
        return;
      }
      current = current.next;
    }

    return current;
  }

  dumpList(){
    let current = this.tail
    while (current){
      console.log(current);
      
      current = current.next
    }
  }
}

class Node {
  data = null;
  next = null;
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }

  setNext(newNext) {
    this.next = newNext;
  }
}
