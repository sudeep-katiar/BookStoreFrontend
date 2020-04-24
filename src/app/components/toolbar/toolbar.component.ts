import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/service/userservice.service';
import { CartComponent } from '../cart/cart.component';
import { Book } from 'src/app/model/books.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  books: Book[];
  filteredBooks: Book[];
  bookName: string;

  filtereBooks(searchString: string) {
    return this.books.filter(book =>
      book.bookName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookserviceService,
    private httpClient: HttpClient,
    private userService: UserServiceService) { }

  ngOnInit() {
  }

  openDialog():void {
    const dialogRef = this.dialog.open(CartComponent, {
      width: "auto",
      panelClass: "custom-dialog-container",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("the dialog box is closed");
    });
  }

  bookSearch() {
    console.log(this.bookName);
    this.bookService.setSearchBookData(this.bookName);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

}
