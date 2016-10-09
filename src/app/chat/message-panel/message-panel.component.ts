import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../conversation-panel/conversation/conversation.service';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {

  private selectedConversation: any;

  constructor(private conversationService: ConversationService) {
   this.conversationService.selectedConversation$.subscribe((conversation) => {
     this.selectedConversation = conversation;
   });


  }

  ngOnInit() {
  }

}
