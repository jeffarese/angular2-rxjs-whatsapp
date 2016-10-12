import { Component, OnInit } from '@angular/core';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  private selectedConversationId: string;

  @Input() conversation: Conversation;
  constructor(private conversationService: ConversationService) {
    /*this.conversationService.selectedConversation$.subscribe((conversation: Conversation) => {
      this.selectedConversationId = conversation.id;
    });*/
  }

  ngOnInit() {
  }

  setConversation(id) {
    this.conversationService.getConversation(id);
  }
}
