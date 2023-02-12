import { IsBirthdayPipe } from './is-birthday.pipe';

describe('IsBirthdayPipe', () => {
  it('create an instance', () => {
    const pipe = new IsBirthdayPipe();
    expect(pipe).toBeTruthy();
  });
});
