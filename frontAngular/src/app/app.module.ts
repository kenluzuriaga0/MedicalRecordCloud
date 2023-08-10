import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {InputTextModule} from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RecordVoiceComponent } from './record-voice/record-voice.component';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecordVoiceComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, ReactiveFormsModule, ButtonModule,
    InputTextareaModule, InputTextModule,MenubarModule,
    RadioButtonModule, ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
