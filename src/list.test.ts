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
      expect(list.length).toEqual(3);
    });

    it('should return starting length + 1 (4)', () => {
      list.append('another node');
      expect(list.length).toEqual(4);
    });

    it('should return length of an empty list (0)', () => {
      list.clear();
      expect(list.length).toEqual(0);
    });
  });
});
