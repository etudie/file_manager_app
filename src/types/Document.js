export class Document {
  constructor(name, type, isShared, owner = 'admin') {
    this.name = name;
    this.type = type;
    this.isShared = isShared;
    this.owner = owner;
  }
}
