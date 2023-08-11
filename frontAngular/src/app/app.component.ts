import { Component, OnInit } from '@angular/core';
import { BodyAudio, FichaMedica } from './models';
import { FichaMedicaService } from './services/ficha-medica.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'recordCloud';

  gineco = {} as FichaMedica;
  audio: any;
  jobName: string = "";
  audioDto = {} as BodyAudio;

  constructor(private _uploadAudio: FichaMedicaService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.audioDto.audio = "";
    this.audioDto.identificacion = "";
  }

  getAudioRecorded(audioBlob: string) {
    this.audioDto.audio = audioBlob;
    this.saveFicha();
  }

  saveFicha() {
    const currentTimeInMillis: number = new Date().getTime();
    this.jobName = "audio_" + currentTimeInMillis + ".wav";
    this.audioDto.filename = this.jobName
    this._uploadAudio.uploadAudio(this.audioDto).subscribe(data => {
      this.showInfo(` ${data.body}`)
      console.log(data);
    });
  }

  getTextTransc(attribute: string) {
    if (this.jobName == "") {
      this.showWarning("No hay ningun audio cargado!")
      return;
    }
    this._uploadAudio.getTranscriptionJobAudio(this.jobName).subscribe(data => {
      this.showInfo(` ${data.message}`)
      console.log(data);
      if (!data.body) {
        return;
      }
      let textoDecodificado = this.convertirSecuenciasUnicode(data.body);
      textoDecodificado = textoDecodificado.replace('"','');
      this.setAtributo(this.gineco, attribute, textoDecodificado);
    });
  }

  setAtributo(objeto: any, atributo: any, valor: any[any]): void {
    objeto[atributo] = valor;
  }
  convertirSecuenciasUnicode(texto: string): string {
    return texto.replace(/\\u([\dA-Fa-f]{4})/g, (_, grp) => String.fromCharCode(parseInt(grp, 16)));
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
