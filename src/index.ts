interface Node<Type> {
  value: Type,
  next: Node<Type>,
  prev: Node<Type>
}


export default class LinkedList<Type> {
  private head: Node<Type>
  private tail: Node<Type>

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get _head(){
    return this.head ? this.head.value : null;
  }

  get _tail(){
    return this.tail ? this.tail.value : null;
  }
}

