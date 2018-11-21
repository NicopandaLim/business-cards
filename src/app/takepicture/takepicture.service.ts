import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakepictureService {
  base64: string;
  dataUrl: string;

  constructor() { }

  getBase64(base64: string, dataUrl: string){
    this.base64 = base64;
    this.dataUrl = dataUrl;
  }
}
