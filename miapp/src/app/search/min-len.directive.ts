import { Directive, Input } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms'

// Uso: <TextField [(ngModel)]="x" minLen="3"></TextField>
// Código de error: "minLen"
@Directive({
  standalone: false,
  selector: '[minLen]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinLenDirective, multi: true }],
})
export class MinLenDirective implements Validator {
  @Input() minLen: number | string = 3

  validate(control: AbstractControl): ValidationErrors | null {
    const valor = control.value ? String(control.value).trim() : ''
    const minimo = Number(this.minLen)
    // vacío es válido (no obligatorio); si hay texto debe cumplir la longitud mínima
    return valor.length > 0 && valor.length < minimo ? { minLen: true } : null
  }
}
