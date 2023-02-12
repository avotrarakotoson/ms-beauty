import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultView'
})
export class DefaultViewPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let result = '';

    if (value) {
      result = value;
    } else {
      result = '--';
    };

    return result;
  }

}
