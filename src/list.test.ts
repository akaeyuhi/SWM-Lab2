import LinkedList from './list';

describe('Linked list tests', () => {
  const list = new LinkedList<string>();

  beforeEach(() => {
    list.clear();
    list.append('1');
    list.append('2');
    list.append('3');
    list.append('4');
  });

  describe('.length getter testing', () => {
    it('should return starting length of the list (3)', () => {
      expect(list.length).toEqual(4);
    });

    it('should return starting length + 1 (4)', () => {
      list.append('another node');
      expect(list.length).toEqual(5);
    });

    it('should return length of an empty list (0)', () => {
      list.clear();
      expect(list.length).toEqual(0);
    });
  });

  describe('.checkIndex() method testing', () => {
    it('should trow an error', () => {
      expect(() => list.checkIndex(9, 8)).toThrow(
        new Error('Incorrect index specified')
      );
    });
  });

  describe('.getElement() method testing', () => {
    it('should return element at passed index', () => {
      expect(list.getElement(0)!.value).toEqual('1');
    });

    it('should throw an error', () => {
      const incorrectIndex: number = list.length;
      expect(() => list.getElement(incorrectIndex)).toThrow(
        new Error('Incorrect index specified')
      );
    });
  });

  describe('.append() method testing', () => {
    it('should increase number of elements', () => {
      const prevLength: number = list.length;

      list.append('5');
      expect(list.length).toBeGreaterThan(prevLength);
    });

    it('should change "tail" property', () => {
      const newTail = '5';

      list.append(newTail);
      expect(list._tail).toEqual(newTail);
    });

    it('should add element to the end of the list', () => {
      const newValue = '5';

      list.append(newValue);
      expect(list.getElement(list.length - 1)!.value).toEqual(newValue);
    });
  });

  describe('.insert() method testing', () => {
    it('should insert element in correct index', () => {
      const index = 1;
      const newValue = 'inserted';

      list.insert(newValue, index);
      expect(list.getElement(index)!.value).toEqual(newValue);
    });

    it('should change head/tail properties properly', () => {
      const newValue = 'inserted';
      const headIndex = 0;
      const tailIndex = list.length;

      list.insert(newValue, tailIndex);
      list.insert(newValue, headIndex);

      expect(list._head).toEqual(newValue);
      expect(list._tail).toEqual(newValue);
    });

    it('should throw an error', () => {
      expect(() => list.insert('inserted', list.length + 1)).toThrow(
        new Error('Incorrect index specified')
      );
    });
  });

  describe('.findFirst() method testing', () => {
    it('should return index of the first element with passed value', () => {
      list.insert('inserted', 2);

      expect(list.findFirst('inserted')).toEqual(2);
    });

    it('should return -1, if no elements were found', () => {
      expect(list.findFirst('test element')).toEqual(-1);
    });
  });

  describe('.findLast() method testing', () => {
    it('should return index of the last element with passed value', () => {
      list.insert('inserted2', 3);
      expect(list.findLast('inserted2')).toEqual(3);
    });

    it('should return -1, if no elements were found', () => {
      expect(list.findLast('test element')).toEqual(-1);
    });
  });

  describe('.deleteNode() method testing', () => {
    it('should delete node by passed index', () => {
      const index = 1;
      const value: string = list.getElement(index)!.value;

      list.deleteNode(index);
      expect(list.findFirst(value)).toEqual(-1);
    });

    it('should change head/tail properties properly', () => {
      list.deleteNode(0);
      list.deleteNode(2);
      expect(list._head).toEqual('2');
      expect(list._tail).toEqual('3');
    });

    it('should throw an error', () => {
      expect(() => list.deleteNode(-1)).toThrow(
        new Error('Incorrect index specified')
      );
    });
  });

  describe('.deleteAll() method testing', () => {
    it('should delete all nodes with passed value', () => {
      list.append('2');

      list.deleteAll('2');
      expect(list.length).toEqual(3);
      expect(list.getElement(0)!.value).toEqual('1');
      expect(list.getElement(1)!.value).toEqual('3');
    });

    it('should not change list, if there are no nodes with passed value', () => {
      const spy = jest.spyOn(list, 'deleteNode');
      list.deleteAll('aaaaaaaaaaaaaaaaaaaaaaaaaa');
      expect(spy).toBeCalledTimes(0);
    });
  });

  describe('.clone() method testing', () => {
    it('should copy all elements', () => {
      const copy: LinkedList<string> = list.clone();

      expect(copy.getElement(0)!.value).toEqual(list.getElement(0)!.value);
      expect(copy.getElement(1)!.value).toEqual(list.getElement(1)!.value);
      expect(copy.getElement(2)!.value).toEqual(list.getElement(2)!.value);
      expect(copy.length).toEqual(list.length);
    });
  });

  describe('.reverse() method testing', () => {
    it('should reverse the order of nodes', () => {
      list.reverse();

      expect(list.getElement(0)!.value).toEqual('4');
      expect(list.getElement(1)!.value).toEqual('3');
      expect(list.getElement(2)!.value).toEqual('2');
      expect(list.getElement(3)!.value).toEqual('1');
    });

    it('should change head/tail properties', () => {
      const prevHead: string = list.getElement(0)!.value;
      const prevTail: string = list.getElement(list.length - 1)!.value;

      list.reverse();
      expect(list._head).toEqual(prevTail);
      expect(list._tail).toEqual(prevHead);
    });
  });

  describe('.clear() method testing', () => {
    it('should delete all data about the list', () => {
      list.clear();

      expect(list.length).toEqual(0);
      expect(list._head).toEqual(null);
      expect(list._tail).toEqual(null);
    });
  });
});
