import { Pipe } from '@angular/core';

@Pipe({
  name:'reverse'
})
export class ReversePipe {

  tranform(value:string){
    return value.split("").reverse().join("");
  }
}
