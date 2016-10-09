import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ConversationComponent } from './chat/conversation-panel/conversation/conversation.component';
import { ConversationPanelComponent } from './chat/conversation-panel/conversation-panel.component';
import { MessagePanelComponent } from './chat/message-panel/message-panel.component';
import { MessageComponent } from './chat/message-panel/message/message.component';
import { ChatComponent } from './chat/chat.component';
import { ConversationService } from './chat/conversation-panel/conversation/conversation.service';
import { UserService } from './core/user/user.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { MessageInputComponent } from './chat/message-panel/message-input/message-input.component';
import { MessageHeaderComponent } from './chat/message-panel/message-header/message-header.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDvfRPyZIh_8teizST56R_FPBg1eldU8g0",
  authDomain: "angular2-rxjs-whatsapp.firebaseapp.com",
  databaseURL: "https://angular2-rxjs-whatsapp.firebaseio.com",
  storageBucket: "angular2-rxjs-whatsapp.appspot.com",
  messagingSenderId: "1088298164988"
};

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ConversationComponent,
    ConversationPanelComponent,
    MessagePanelComponent,
    MessageComponent,
    ToolbarComponent,
    MessageInputComponent,
    MessageHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  providers: [
    ConversationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
