import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(bYear: any): any {
    let currentYear:any = new Date().getFullYear();
    let actorBYear:any = bYear;
    let userAge= currentYear-actorBYear;
    return userAge;
  }

}
