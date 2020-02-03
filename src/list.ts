export class List<T> {
  private itemArray: Array<T>;
  constructor() {
    this.itemArray = [];
  }

  add(item: T) {
    this.itemArray.push(item);
  }

  remove(key: string, value: string) {
    var targetIndex = this.indexOf(key, value);
    if (targetIndex >= 0) {
      this.removeAt(targetIndex);
    }
  }

  removeAt(index: number) {
    this.itemArray.splice(index, 1);
  }

  toArray(): T[] {
    return this.itemArray;
  }

  count(): number {
    return this.itemArray.length;
  }

  // contains(item: T): boolean {
  //     return (this.indexOf(item) >= 0);
  // }

  indexOf(key: string, valueToSearch: string): number {
    for (var i = 0; i < this.itemArray.length; i++) {
      if (this.itemArray[i][key] == valueToSearch) {
        return i;
      }
    }
    return -1;
  }

  find(key: string, value: string): T {
    var index = this.indexOf(key, value);
    if (index == -1) {
      throw "Could not find item with '" + key + ' = ' + value + "'.";
    }
    return this.itemArray[index];
  }
}
