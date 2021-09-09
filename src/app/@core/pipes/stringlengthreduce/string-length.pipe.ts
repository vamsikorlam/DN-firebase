import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringLength'
})
export class StringLengthPipe implements PipeTransform {


  transform(value: string, length: string): string {
    let maxLength = parseInt(length);
    let resultString = value;
    if (resultString.length > maxLength) {
      resultString = resultString.substr(0, maxLength);
      resultString += '...';
    }
    return resultString;
  }

}
