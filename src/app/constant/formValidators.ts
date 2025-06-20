import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if ((!matchingControl.value || !control.value) || matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        else if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


export function PasswordValidation(controlName: string): any {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (!control.value) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        else if (control.value.length < 8) {
            control.setErrors({ minimumLengthValidation: true });
        } else if (!(/[0-9]/.test(control.value))) {
            control.setErrors({ numericValidation: true });
        } else if (!(/[A-Z]/.test(control.value))) {
            control.setErrors({ upperCaseValidation: true });
        } else if (!(/[a-z]/.test(control.value))) {
            control.setErrors({ lowerCaseValidation: true });
        } else {
            control.setErrors(null);
        }
    }
}