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
      expect(() => list.checkIndex(9, 8)).toThrow(new Error('Incorrect index specified'));
    })
  });

  describe('.append() testing', () => {
    it('should increase number of elements', () => {
      const prevLength: number = list.length;

      list.append('5');
      expect(list.length).toBeGreaterThan(prevLength)
    });

    it('should change "tail" property', () => {
      const newTail = '5';

      list.append(newTail);
      expect(list._tail).toEqual(newTail);
    });

    it('should add element to the end of the list', () => {
      const newValue = '5';

      list.append(newValue);
      expect(list.getElement(list.length - 1)).toEqual(newValue);
    });
  });
});
