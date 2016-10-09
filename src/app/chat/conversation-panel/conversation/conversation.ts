export class Conversation {
  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }
  constructor(
    private _senderId: string,
    private _receiverId: string,
    private _avatar: string,
    private _id: string,
    private _messages: any
  ) {

  }

  get senderId(): string {
    return this._senderId;
  }

  set senderId(value: string) {
    this._senderId = value;
  }

  get receiverId(): string {
    return this._receiverId;
  }

  set receiverId(value: string) {
    this._receiverId = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get messages(): any {
    return this._messages;
  }
  set messages(value: any) {
    this._messages = value;
  }
}
