import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/service/userservice.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // panelOpenState = false;
  isLinear = true;
  customerFormGroup: FormGroup;
  cartBooks: any;
  size: any;
  id: any;
  token: string;
  toggle = true;
  snackbar: any;

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookserviceService,
    private httpClient: HttpClient,
    private customerService: CustomerService) { }

    ngOnInit() {
      this.customerFormGroup = this.formBuilder.group({
        name: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required),
        locality: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        landmark: new FormControl('')
      });
      this.token=localStorage.getItem('token');
      this.bookService.autoRefresh$.subscribe(()=>{
        this.getCartBooks();
      });
      this.getCartBooks();
    }

  public getCartBooks() {
    this.bookService.getAllCartBooks(this.token).subscribe((message) => {
      console.log("here the cart books ",message.data);
      this.cartBooks = message.data;
      this.size = message.data.length;
    });
  }

  addToBag(bookId) {
    this.bookService.addToBag(bookId, this.token).subscribe((message) => {
      console.log(message);
      this.matSnackBar.open("Book Removed from Bag SuccessFully", "OK", {
        duration: 4000,
      });
    });
  }

  onSubmit(form: NgForm) {
    if (this.customerFormGroup.invalid) {
      return;
    }
    console.log(this.customerFormGroup.value);

    this.customerService.customerDetails(this.customerFormGroup.value).subscribe((user) => {
      console.log(user);
      this.snackbar.open('registration successful, verify the email', 'Ok', { duration: 3000 });

    },
      (error: any) => {
        console.log(error);
        this.snackbar.open(error.error.description, 'error', { duration: 3000 });
      });
  }

  checkout() {
    this.router.navigateByUrl("/success");
  }

}
