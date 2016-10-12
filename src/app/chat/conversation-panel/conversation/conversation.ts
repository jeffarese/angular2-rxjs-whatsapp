import { User } from '../../../core/user/user';
export class Conversation {
  constructor(private _destinationUser: any, private _messages: any) {}

  get destinationUser(): any {
    return this._destinationUser;
  }

  set destinationUser(value: any) {
    this._destinationUser = value;
  }

  get messages(): any {
    return this._messages;
  }
  set messages(value: any) {
    this._messages = value;
  }

}
