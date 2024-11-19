// src/app/validators.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
        return null; // No validation error for empty input
      }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailPattern.test(control.value);
  
  return isValidEmail ? null : { invalidEmail: true };
}
