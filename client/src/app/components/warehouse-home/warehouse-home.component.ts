import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-warehouse-home',
  templateUrl: './warehouse-home.component.html',
  styleUrls: ['./warehouse-home.component.css']
})
export class WarehouseHomeComponent {
  products: any[] = [];
  showForm: boolean = false;
  showFormToEdit: boolean = false;
  formTitle: string = 'Add Product';
  newProduct: any = {
    title: '',
    description: '',
    quantity: null,
    ean_code: '',
    image: ''
  };
  selectedProduct: any = {
    id: '',
    title: '',
    description: '',
    quantity: null,
    ean_code: '',
    image: ''
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>('http://localhost:3000/api/products')
      .subscribe(response => {
        this.products = response.products;
      });
  }

  showAddForm() {
    this.showForm = true;
    this.showFormToEdit = false;
    this.formTitle = 'Add Product';
    this.newProduct = {
      title: '',
      description: '',
      quantity: null,
      ean_code: '',
      image: ''
    };
  }

  closeForm() {
    this.showForm = false;
    this.showFormToEdit = false;
    this.newProduct = {
      title: '',
      description: '',
      quantity: null,
      ean_code: '',
      image: ''
    };
  }

  saveProduct(productId: string) {
    const updatedProduct = {
      title: this.selectedProduct.title,
      description: this.selectedProduct.description,
      quantity: this.selectedProduct.quantity,
      ean_code: this.selectedProduct.ean_code,
      image: this.selectedProduct.image
    };

    this.http
      .put(`http://localhost:3000/api/products/${productId}`, updatedProduct)
      .subscribe(response => {
        console.log('Product updated successfully');
        this.fetchProducts();
        this.closeForm();
      }, error => {
        console.log('Error updating product:', error);
      });
  }

  addProduct() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://localhost:3000/api/products', this.newProduct)
      .subscribe(response => {
        console.log('Product added successfully');
        this.fetchProducts();
        this.closeForm();
      });
  }

  showEditForm(productId: string) {
    this.showForm = true;
    this.showFormToEdit = true;
    this.formTitle = 'Edit Product';
    this.selectedProduct = this.products.find(product => product._id === productId);
  }

  deleteProduct(productId: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:3000/api/products/${productId}`;
    this.http.delete(url)
      .subscribe(response => {
        console.log('Product deleted successfully');
        this.fetchProducts();
      });
  }

  logOut() {
    this.authService.removeToken();
    this.router.navigate(["/login"]);
  }

}
