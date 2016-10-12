import { Component, OnInit } from '@angular/core';
import { ConversationService } from './conversation/conversation.service';
import { Conversation } from './conversation/conversation';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-conversation-panel',
  templateUrl: './conversation-panel.component.html',
  styleUrls: ['./conversation-panel.component.scss']
})
export class ConversationPanelComponent implements OnInit {

  private conversations: Array<Conversation>;
  private selectedConversationId: string;

  constructor(private conversationService: ConversationService, private userService: UserService) {
/*    this.userService.userSource$.subscribe((user)=> {
      if (user) {
        this.conversationService.conversation$.subscribe((conversations) => {
          this.conversations = conversations;
        });
      }
    });*/


  }

  public createConversation(receiverId: string) {
    this.conversationService.createConversation(receiverId);
  }

  ngOnInit() {
  }

}
