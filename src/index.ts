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
}

const list = new LinkedList<string>();

list.append('1');
list.append('3');
list.append('2');
list.append('4');
list.insert('inserted', 2);
list.deleteNode(2);
list.append('5');
list.append('5');
for (let i = 0; i < list.length; i++) {
  console.dir(list.getElement(i), { depth: 10 });
}
list.deleteAll('5');
for (let i = 0; i < list.length; i++) {
  console.dir(list.getElement(i), { depth: 10 });
}

