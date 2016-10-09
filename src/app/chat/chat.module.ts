import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ConversationService } from './conversation-panel/conversation/conversation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ConversationService],
  declarations: [ChatComponent]
})
export class ChatModule { }
