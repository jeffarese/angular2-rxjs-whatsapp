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
        this.conversation$ = this.af.database.list(`/conversations/${user.id}`).map((conversations) => {
          return conversations.map((conversation: any)=> {
            return new Conversation(
              this.af.database.object(`users/${conversation.receiverId}`),
              this.af.database.list(`messages/${conversation.$key}`));
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
      this.sendNewMessage(message, conversation)
    })
  }

  sendNewMessage(message, conversation) {
    console.log(message);
    console.log(conversation);
    this.af.database.list(`messages/${conversation.id}`).push({
      sender_id: conversation.senderId,
      created_at: new Date().getTime(),
      message: message
    });
  }


  createConversation(receiverId: string) {
    let newConversation = this.af.database.list(`conversations/${this.userService.getUser().id}`);
    newConversation.push({
      senderId: this.userService.getUser().id,
      receiverId: receiverId
    });
    newConversation.subscribe((data) => {
      this.af.database.list(`users/${receiverId}/receivedConversations`).push({
          senderId: this.userService.getUser().id,
          conversationId: data[data.length - 1].$key
        }
      );
    });

  }
}
