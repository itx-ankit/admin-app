import { Component } from '@angular/core';
import { IFormField } from 'src/app/shared/Interface/IFormData';
import { FormFieldComponent } from 'src/app/shared/form-field/form-field.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormFieldComponent],
})
export class LoginComponent {
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
