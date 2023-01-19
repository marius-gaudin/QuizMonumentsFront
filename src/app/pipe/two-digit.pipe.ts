import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDigit'
})
export class TwoDigitPipe implements PipeTransform {

  transform(value: number | undefined, ...args: unknown[]): unknown {
    if(typeof value === 'undefined') return null
    return (value < 10) ? `0${value}` : value
  }
}
