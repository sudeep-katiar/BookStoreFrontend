import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/service/userservice.service';
import { BookserviceService } from 'src/app/service/bookservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  books: any;
  size: any;
  id: any;
  token: string;
  toggle = true;

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookserviceService,
    private httpClient: HttpClient,
    private userService: UserServiceService) {

      this.userService.getQueryParam().subscribe((message) => {
      this.id = message.id;
      this.getAllBooks();});
     }

  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.bookService.autoRefresh$.subscribe(()=>{
      this.getAllBooks();
    });
    this.getAllBooks();
  }

  public getAllBooks() {
    this.bookService.getBookList(this.token).subscribe((message) => {
      console.log("here the message ",message.data);
      this.books = message.data;
      this.size = message.data.length;
    });
  }

  addToBag(bookId) {
    this.toggle = !this.toggle;
    this.bookService.addToBag(bookId, this.token).subscribe((message) => {
      console.log(message);
      this.matSnackBar.open("Book Added to Bag SuccessFully", "OK", {
        duration: 4000,
      });
    });
  }

}
