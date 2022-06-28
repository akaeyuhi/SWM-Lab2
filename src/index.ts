import LinkedList from './list';

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

// const listToExtend = new LinkedList<string>();
// listToExtend.append('extend1');
// listToExtend.append('extend2');
// list.extend(listToExtend);
// console.log(list.getElementsAsArray());
