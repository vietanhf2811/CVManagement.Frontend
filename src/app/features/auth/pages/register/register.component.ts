import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/authservice';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class Register {
  private router = inject(Router);
  private authService = inject(AuthService);
  fullName = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  role = '';
  agreeTerms= false;
  onSubmit(form: NgForm): void {
    if (form.invalid || this.password !== this.confirmPassword||!this.agreeTerms
    ) {
      form.control.markAllAsTouched();
      return;
    }
    const data = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone
    };
  this.authService.register(data).subscribe({
      next: (response) => {
        console.log('Đăng ký thành công:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Đăng ký thất bại:', error);
        alert('Registration failed. Please try again.');
      }
    });
    console.log('Registration form is valid.');
  }



}
