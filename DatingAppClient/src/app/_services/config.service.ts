import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export function ConfigFactory(configService: ConfigService, file: string, property: string): string {
  return configService.loadJSON(file)[property];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: any;
  constructor(private http: HttpClient) {
  }

  loadJSON(filePath): string {
    const json = this.loadTextFileAjaxSync(filePath, 'application/json');
    return JSON.parse(json);
  }

  loadTextFileAjaxSync(filePath, mimeType): string | null {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);
    if (mimeType != null) {
      if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType(mimeType);
      }
    }
    xmlhttp.send();
    if (xmlhttp.status === 200) {
      return xmlhttp.responseText;
    } else {
      return null;
    }
  }
}
