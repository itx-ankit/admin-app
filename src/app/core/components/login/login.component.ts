import { Component } from '@angular/core';
import { IFormField } from 'src/app/shared/Interface/IFormData';
import { FormFieldComponent } from 'src/app/shared/form-field/form-field.component';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormFieldComponent],
})
export class LoginComponent {
  constructor(private auth: AuthenticationService) {}

  login(data: FormGroup) {
    data.markAllAsTouched();
    if (!data.invalid) {
      this.auth.loginUser(data.value);
    }
  }

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
