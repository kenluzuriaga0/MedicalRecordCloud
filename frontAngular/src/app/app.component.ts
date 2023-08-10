import { Component, OnInit } from '@angular/core';
import { BodyAudio, FichaMedica } from './models';
import { FichaMedicaService } from './services/ficha-medica.service';
import { MessageService } from 'primeng/api';
import { Observable, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], providers: [MessageService]
})
export class AppComponent  implements OnInit {
  title = 'recordCloud';
  
  gineco = {} as FichaMedica;
  audio: any;
  identificacion:string = "";
  audioDto = {} as BodyAudio;

  constructor(private _uploadAudio:FichaMedicaService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.audioDto.audio="";
    this.audioDto.identificacion="";
  }

  getAudioRecorded(audioBlob:string){
    this.audioDto.audio = audioBlob;
  }

  saveFicha(){
    if(this.identificacion==""){
      this.showWarning("Por favor, llene el campo de la identificacion del paciente")
      return
    }
    this.audioDto.filename = "audio_"+this.identificacion+".wav";
    
    this._uploadAudio.uploadAudio(this.audioDto).subscribe(data=>{
      this.showInfo(` ${data.body}`)
      console.log(data);
    });
  }
  

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
  showInfo(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }
  showWarning(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Advertencia', detail: message });
  }

}
