import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../model/books.model';

@Pipe({
  name: 'bookSearch',
  pure: false
})
export class BooksearchPipe implements PipeTransform {

  private counter = 0;

  transform(books: Book[], searchTerm: string): Book[] {
    if (!books || !searchTerm) {
      return books;
    }
    return books.filter(book =>
      book.bookName.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1);
  }
}
