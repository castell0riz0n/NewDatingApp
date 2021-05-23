import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
  ]
})
export class ServicesModule { }
