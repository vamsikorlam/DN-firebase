import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'fill'
})
export class FillPipe implements PipeTransform {
  transform(value): Array<any> {
    return (new Array(value)).fill(1);
  }
}
