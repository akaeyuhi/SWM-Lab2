interface Node<Type> {
  value: Type;
  next: NodeT<Type>;
  prev: NodeT<Type>;
}

type NodeT<Type> = Node<Type> | null;

export default class LinkedList<Type> {
  private head: NodeT<Type>;
  private tail: NodeT<Type>;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get length(): number {
    let temp: NodeT<Type> = this.head;
    let count = 0;

    while (temp !== null && temp !== this.tail) {
      count++;
      temp = temp?.next;
    }
    count += temp === null ? 0 : 1;
    return count;
  }

  get _head(): Type | null {
    return this.head ? this.head.value : null;
  }

  get _tail(): Type | null {
    return this.tail ? this.tail.value : null;
  }

  checkIndex(index: number, max: number): void {
    if (index < 0 || index > max) {
      throw new Error('Incorrect index specified');
    }
  }

  append(data: Type): void {
    const nodeToAppend: Node<Type> = {
      value: data,
      next: null,
      prev: this.tail,
    };

    if (this.length) {
      this.tail = nodeToAppend;
      if (this.length > 1 && this.tail.prev !== null) {
        this.tail.prev.next = nodeToAppend;
      } else {
        this.tail.prev = this.head;
      }
    } else {
      this.head = nodeToAppend;
    }

    if (this.length === 1 && this.head !== null) {
      this.head.next = this.tail;
    }
  }

  insert(data: Type, index: number): void {
    this.checkIndex(index, this.length);

    if (index === this.length) {
      this.append(data);
      return;
    }

    let nodeToInsert: NodeT<Type> = null;
    let currentNode: NodeT<Type> = this.head;
    let prevNode: NodeT<Type> = null;

    for (let i = 0; i < this.length; i++) {
      if (i === index && prevNode !== null && currentNode !== null) {
        nodeToInsert = {
          value: data,
          next: currentNode,
          prev: prevNode,
        };
        prevNode.next = nodeToInsert;
        break;
      }
      prevNode = currentNode;
      if (currentNode !== null) {
        currentNode.prev = prevNode;
        currentNode = currentNode.next;
      }
    }

    if (index === 0) this.head = nodeToInsert;
  }

  deleteNode(index: number): Type | undefined{
    this.checkIndex(index, this.length - 1);

    let temp: NodeT<Type> = this.head;
    let prev: NodeT<Type> = this.tail;

    for(let i = 0; i < this.length; i++){
      if(i === index && prev !== null && temp !== null){
        prev.next = temp.next;
        temp.prev = prev.prev;
        if(temp === this.head) this.head = temp.next;
        if(temp === this.tail) this.tail = prev;
        return temp.value;
      }
      prev = temp;
      if(temp !== null) temp = temp.next;
    }
  }

  deleteAll(data: Type): void {
    let temp: NodeT<Type> = this.head;
    const startLength: number = this.length;

    for(let i = 0; i < startLength; i++){
      if (temp !== null) {
        if(temp.value === data){
          this.deleteNode(i - (startLength - this.length));
        }
        temp = temp.next;
      }
    }
  }

  getElement(index: number): NodeT<Type> | undefined {
    this.checkIndex(index, this.length - 1);

    let temp: NodeT<Type> | undefined = this.head;
    for (let i = 0; i < this.length; i++) {
      if (i === index) return temp;

      temp = temp?.next;
    }
  }

  getElementsAsArray(): NodeT<Type>[] {
    const result: NodeT<Type>[] = [];

    for (let i = 0; i < this.length; i++) {
      const element: NodeT<Type> | undefined = this.getElement(i);
      if(element !== undefined) result.push(element);
    }
    return result;
  }

  clone(): LinkedList<Type>{
    const copy: LinkedList<Type> = new LinkedList<Type>();
    let temp: NodeT<Type> = this.head;

    for(let i = 0; i < this.length; i++){
      if(temp !== null) {
        copy.append(temp.value);
        temp = temp.next;
      }
    }

    return copy;
  }

  reverse(): void{
    const prevHead: NodeT<Type> = this.head;
    let current: NodeT<Type> = null;
    let prev: NodeT<Type> = null;
    let next: NodeT<Type> = this.head !== null ? this.head.next : null;
    while(current !== this.tail){
      if(current === null) {
        current = this.head;
      } else if (next !== null){
        current.prev = next;
        prev = current;
        current = next;
        next = current.next;
        current.next = prev;
      }
    }
    this.head = this.tail;
    this.tail = prevHead;
    if(this.tail !== null && this.head !== null) {
      this.head.prev = null;
      this.tail.next = null;
    }
  }

  findFirst(data: Type): number{
    let temp: NodeT<Type> = this.head;

    for(let i = 0; i < this.length; i++) {
      if(temp !== null) {
        if(temp.value === data) return i;
        temp = temp.next;
      }
    }
    return -1;
  }

  findLast(data: Type): number{
    let temp: NodeT<Type> = this.tail;

    for(let i = this.length - 1; i >= 0; i--) {
      if(temp !== null) {
        if (temp.value === data) return i;
        temp = temp.prev;
      }
    }
    return -1;
  }

  clear(): void{
    this.head = null;
    this.tail = null;
  }

}

const list = new LinkedList<string>();

list.append('1');
list.append('3');
list.append('2');
list.append('4');
// list.insert('inserted', 2);
// list.deleteNode(2);
// list.append('5');
// list.append('5');
// for (let i = 0; i < list.length; i++) {
//   console.dir(list.getElement(i), { depth: 10 });
// }
// list.deleteAll('5');
// for (let i = 0; i < list.length; i++) {
//   console.dir(list.getElement(i), { depth: 10 });
// }
//
// const copiedList = list.clone();
//
// console.dir(list.getElementsAsArray(), { depth: 10 });
// console.dir(copiedList.getElementsAsArray(), { depth: 10 });

// list.reverse();
// console.dir(list.getElementsAsArray(), { depth: 10 });
// list.append('1');
// list.append('5');
//
// console.log(list.findFirst('1'));
// console.log(list.findLast('1'));

// list.clear();
// console.log(list.getElementsAsArray());




