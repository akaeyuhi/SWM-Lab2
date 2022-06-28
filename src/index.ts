interface Node<Type> {
  value: Type,
  next: Node<Type>,
  prev: Node<Type>
}


export default class LinkedList<Type> {
  private head: Node<Type>;
  private tail: Node<Type>;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get length(): number {
    let temp: Node<Type> = this.head;
    let count = 0;

    while (true) {
      if (temp === null || temp === this.tail) {
        count += (temp === null ? 0 : 1);
        break;
      }

      count++;
      temp = temp.next;
    }
    return count;
  }

  get _head() {
    return this.head ? this.head.value : null;
  }

  get _tail() {
    return this.tail ? this.tail.value : null;
  }

  checkIndex(index: number, max: number) {
    if (index < 0 || index > max) {
      throw new Error('Incorrect index specified');
    }
  }

  append(data: Type) {
    const nodeToAppend: Node<Type> = {
      value: data,
      next: null,
      prev: this.tail,
    };

    console.log(this.length);

    if (this.length) {
      this.tail = nodeToAppend;
      if (this.length > 1) {
        this.tail.prev.next = nodeToAppend;
      } else {
        this.tail.prev = this.head;
      }
    } else {
      this.head = nodeToAppend;
    }

    if (this.length === 1) {
      this.head.next = this.tail;
    }
  }

  getElement(index: number): Node<Type> {
    this.checkIndex(index, this.length - 1);

    let temp: Node<Type> = this.head;
    for (let i = 0; i < this.length; i++) {
      if (i === index) return temp;

      temp = temp.next;
    }
  }
}

const list = new LinkedList<string>();


list.append('1');
list.append('3');
list.append('2');
list.append('4');

console.log(list.length);

for (let i = 0; i < list.length; i++) {
  console.dir(list.getElement(i), { depth: 10 });
}
