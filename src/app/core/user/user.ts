export class User {
  constructor(private _id: string, private _name: string, private _email: string, private _avatar: string) {

  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get avatar(): string {
    return this._avatar;
  }
  set avatar(value: string) {
    this._avatar = value;
  }
}
