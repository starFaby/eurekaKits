import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Generalvalidunit {
    emailDomainValidator(control: FormControl) {
        const email = control.value;
        if (email && email.indexOf('@') !== -1) {
            const [_, domain] = email.split('@');
            if (domain !== 'codecraf.tv') {
                return {
                    emailDomain: {
                        parsedDomain: domain
                    }
                };
            }
        }
        return null;
    }
}
