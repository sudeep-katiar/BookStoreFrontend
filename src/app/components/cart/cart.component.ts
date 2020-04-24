import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
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
    private userService: UserServiceService) { }

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

}
