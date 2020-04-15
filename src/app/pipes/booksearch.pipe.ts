import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booksearch'
})
export class BooksearchPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
