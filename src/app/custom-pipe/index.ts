import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roundBelow' })
export class RoundBelow implements PipeTransform {
  transform(value: number, division: number) {
    return Math.ceil(value / division);
  }
}
