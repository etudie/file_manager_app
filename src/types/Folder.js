export class Folder {
  constructor(name, isShared, main = false, owner = 'admin') {
    this.name = name;
    this.items = [];
    this.isShared = isShared;
    this.owner = owner;
    this.main = main;
  }
}
