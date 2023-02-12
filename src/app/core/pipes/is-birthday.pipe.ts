import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isBirthday'
})
export class IsBirthdayPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): boolean {
    const now = new Date();
    const birthday = new Date(value);

    if (now.getMonth() === birthday.getMonth() && now.getDate() === birthday.getDate()) {
      return true
    }

    return false;
  }
}
