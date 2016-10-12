import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserService } from '../../../core/user/user.service';
import { Observable, Subject } from 'rxjs';
import { Conversation } from './conversation';

@Injectable()
export class ConversationService {

  public conversation$: Observable<any>;


  private newMessageSource = new Subject<any>();
  public newMessage$ = this.newMessageSource.asObservable();

  private selectedConversationSource = new Subject<any>();
  public selectedConversation$ = this.selectedConversationSource.asObservable();
  private selectedConversationData: Conversation;

  constructor(private af: AngularFire, private userService: UserService) {
    this.subscribeToNewMessages();
    this.getConversationsList();
  }

  getConversationsList() {
    this.userService.userSource$.subscribe((user) => {
      if (user) {
        this.conversation$ = this.af.database.list('/conversations').map((conversations) => {
          console.log(conversations);
          return conversations.map((conversation)=> {
            let messages = this.af.database.list(`messages/${conversation.$key}`);
            let senderId = Object.keys(conversation.members)[0];
            let receiverId = Object.keys(conversation.members)[1];
            let avatar = `https://api.adorable.io/avatars/40/${senderId}.png`;
            console.log(conversation);
            //return new Conversation(senderId, receiverId, avatar, conversation.$key, messages);
          })
        });
      }
    });

  }

  getConversation(conversation) {
    this.selectedConversationSource.next(conversation);
    this.selectedConversationData = conversation;
  }

  addMessage(message) {
    this.newMessageSource.next(message);
  }

  subscribeToNewMessages() {
    this.newMessage$.subscribe((message)=> {
      let conversation: Conversation = this.selectedConversationData;
      console.info('New message event');
      console.info(`Text: ${message}`);
      console.info(`Conversation Id: ${conversation.id}`);
      console.info(`Sender: ${conversation.senderId}`);
      console.info(`Receiver: ${conversation.receiverId}`);
      this.sendNewMessage(message, conversation)
    })
  }
  sendNewMessage(message, conversation) {
    this.af.database.list(`messages/${conversation.id}`).push({
      sender_id: conversation.senderId,
      created_at: new Date().getTime(),
      message: message
    });
  }


  createConversation(receiverId: string) {
    console.log(`conversations/${this.userService.getUser().id}`);
    this.af.database.object(`conversations/${this.userService.getUser().id}`).set({
      receiverId: receiverId
    });
  }
}
