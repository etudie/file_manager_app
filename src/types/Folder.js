export class Folder {
  constructor(name, isShared) {
    this.name = name;
    this.items = [];
    this.isShared = isShared;
  }
}
