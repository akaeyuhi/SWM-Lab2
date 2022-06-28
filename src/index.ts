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

  get length(): number{
    let temp: Node<Type> = this.head;
    let count: number = 0;

    while(true){
      if(temp === null || temp === this.tail){
        count += (temp === null ? 0 : 1);
        break;
      }

      count++;
      temp = temp.next;
    }
    return count;
  }

  get _head(){
    return this.head ? this.head.value : null;
  }

  get _tail(){
    return this.tail ? this.tail.value : null;
  }
}

