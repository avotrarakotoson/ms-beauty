import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: string[], ...args: string[]): string {
    if (!value || value.length < 1) return '';

    return value.join(args[0]);
  }

}
