
import {ReversePipe} from "./reverse.pipe";
describe('ReversePipe', () => {

  it('should reverse a string', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.tranform('hello')).toEqual('olleh');
  });

});
