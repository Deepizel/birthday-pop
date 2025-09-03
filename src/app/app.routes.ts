import { Routes } from '@angular/router';
import { BirthdayComponent } from './birthday/birthday.component';
import { HubbyMessageComponent } from './hubby-message/hubby-message.component';

export const routes: Routes = [
  { path: '', component: BirthdayComponent },
  { path: 'hubby-message', component: HubbyMessageComponent },
  { path: '**', redirectTo: '' }
];
