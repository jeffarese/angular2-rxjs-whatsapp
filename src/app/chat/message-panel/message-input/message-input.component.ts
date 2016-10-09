import { Component } from '@angular/core';
import { ConversationService } from '../../conversation-panel/conversation/conversation.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {

  constructor(private conversationService: ConversationService) { }

  onSubmit(message) {
    if (message) {
      this.conversationService.addMessage(message);
    }
  }

  
}
