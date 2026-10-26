
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  fullName = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  role = '';

  onSubmit(form: NgForm): void {
    if (form.invalid || this.password !== this.confirmPassword) {
      form.control.markAllAsTouched();
      return;
    }

    // Connect to the registration API in the next step.
    console.log('Registration form is valid.');
  }
}
