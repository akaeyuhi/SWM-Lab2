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

  checkIndex(index: number, max: number){
    if(index < 0 || index > max){
      throw new Error('Incorrect index specified');
    }
  }

  get _head(){
    return this.head ? this.head.value : null;
  }

  get _tail(){
    return this.tail ? this.tail.value : null;
  }
}

