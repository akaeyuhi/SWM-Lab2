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
        currentNode.prev = nodeToInsert;
        break;
      }
      prevNode = currentNode;
      if (currentNode !== null) {
        currentNode.prev = prevNode;
        currentNode = currentNode.next;
      }
    }

    if (index === 0) {
      nodeToInsert = {
        value: data,
        next: this.head,
        prev: null,
      };
      this.head = nodeToInsert;
    }
  }

  deleteNode(index: number): Type | undefined {
    this.checkIndex(index, this.length - 1);

    let temp: NodeT<Type> = this.head;
    let prev: NodeT<Type> = null;

    for (let i = 0; i < this.length; i++) {
      if (i === index && temp !== null) {
        if (prev !== null) prev.next = temp.next;
        if (temp.next !== null) temp.next.prev = prev;

        if (temp === this.head && temp.next !== null) {
          this.head = temp.next;
          this.head.prev = null;
        }
        if (temp === this.tail && prev !== null) {
          this.tail = prev;
          this.tail.next = null;
        }
        return temp.value;
      }
      prev = temp;
      if (temp !== null) temp = temp.next;
    }
  }

  deleteAll(data: Type): void {
    let temp: NodeT<Type> = this.head;
    const startLength: number = this.length;

    for (let i = 0; i < startLength; i++) {
      if (temp !== null) {
        if (temp.value === data) {
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
      if (element !== undefined) result.push(element);
    }
    return result;
  }

  clone(): LinkedList<Type> {
    const copy: LinkedList<Type> = new LinkedList<Type>();
    let temp: NodeT<Type> = this.head;

    for (let i = 0; i < this.length; i++) {
      if (temp !== null) {
        copy.append(temp.value);
        temp = temp.next;
      }
    }

    return copy;
  }

  reverse(): void {
    const prevHead: NodeT<Type> = this.head;
    let current: NodeT<Type> = null;
    let prev: NodeT<Type> = null;
    let next: NodeT<Type> = this.head !== null ? this.head.next : null;
    while (current !== this.tail) {
      if (current === null) {
        current = this.head;
      } else if (next !== null) {
        current.prev = next;
        prev = current;
        current = next;
        next = current.next;
        current.next = prev;
      }
    }
    this.head = this.tail;
    this.tail = prevHead;
    if (this.tail !== null && this.head !== null) {
      this.head.prev = null;
      this.tail.next = null;
    }
  }

  findFirst(data: Type): number {
    let temp: NodeT<Type> = this.head;

    for (let i = 0; i < this.length; i++) {
      if (temp !== null) {
        if (temp.value === data) return i;
        temp = temp.next;
      }
    }
    return -1;
  }

  findLast(data: Type): number {
    let temp: NodeT<Type> = this.tail;

    for (let i = this.length - 1; i >= 0; i--) {
      if (temp !== null) {
        if (temp.value === data) return i;
        temp = temp.prev;
      }
    }
    return -1;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
  }

  extend(list: LinkedList<Type>): void {
    let temp: NodeT<Type> = list.head;
    for (let i = 0; i < list.length; i++) {
      if (temp !== null) {
        this.append(temp.value);
        temp = temp.next;
      }
    }
  }
}
