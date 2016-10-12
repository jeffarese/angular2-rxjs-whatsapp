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
      this.conversation$ = this.af.database.list(`users/${user.id}/conversations`)
        .flatMap((conversations) => {
          return conversations.map((conversation)=> {
            this.af.database.object(`users/${conversation.receiverId}`).subscribe((destinationUser)=> {
              conversation.destinationUser = destinationUser;
            });
            this.af.database.list(`messages/${conversation.$key}`).subscribe((messages)=> {
              conversation.messages = messages;
            });
            return conversation;
          })
        });
        /*
        this.conversation$ = this.af.database.list(`users/${user.id}/conversations`)
          .flatMap((conversations) => {
            return Observable.forkJoin(
              conversations.map((conversation) => {
                return Observable.forkJoin(
                  this.af.database.object(`users/${conversation.receiverId}`),
                  this.af.database.list(`messages/${conversation.$key}`)
                ).map((data)=> {
                  conversation.destinationUser = data[0];
                  conversation.messages = data[1];
                  return conversation;
                });
              })
            );
            });
        });*/
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
    this.af.database.list(`messages/${conversation.$key}`).push({
      sender_id: conversation.destinationUser.$key,
      created_at: new Date().getTime(),
      message: message
    });
  }

  createConversation(receiverId: string) {
    let newConversation = this.af.database.list('conversations/');
    newConversation.push({
      senderId: this.userService.getUser().id,
      receiverId: receiverId
    });
    newConversation.subscribe((data) => {
      this.af.database.object(`users/${receiverId}/conversations/${data[data.length - 1].$key}`).set({
          senderId: this.userService.getUser().id,
          receiverId: receiverId
        }
      );
      this.af.database.object(`users/${this.userService.getUser().id}/conversations/${data[data.length - 1].$key}`).set({
          senderId: this.userService.getUser().id,
          receiverId: receiverId
        }
      );
    });

  }
}
