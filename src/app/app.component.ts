import { Component } from '@angular/core';
import { IFormField } from './shared/Interface/IFormData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-app';

  loginForm: IFormField[] = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Enter email',
      required: true,
      regex: '',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Enter password',
      required: true,
      regex: '',
    },
  ];
}
