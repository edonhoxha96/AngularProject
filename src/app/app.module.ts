import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsertsComponent } from './components/inserts/inserts.component';
import { ProductsComponent } from './components/products/products.component';
import { PosComponent } from './components/pos/pos.component';
import { StockComponent } from './components/stock/stock.component';
import { SellComponent } from './components/sell/sell.component';
import { SalesComponent } from './components/sales/sales.component';
import { DepotComponent } from './components/depot/depot.component';
import { MoveComponent } from './components/move/move.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { ModelComponent } from './components/model/model.component';
import { FindComponent } from './components/find/find.component';
import { YearsComponent } from './components/years/years.component';
import { BrandsComponent } from './components/brands/brands.component';
import { EditBrandComponent } from './components/edit-brand/edit-brand.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { ModelsComponent } from './components/models/models.component';
import { EditModelComponent } from './components/edit-model/edit-model.component';
import { AddModelComponent } from './components/add-model/add-model.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddProductSupplierComponent } from './components/add-product-supplier/add-product-supplier.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SectorsComponent } from './components/sectors/sectors.component';
import { AddSectorComponent } from './components/add-sector/add-sector.component';
import { EditSectorComponent } from './components/edit-sector/edit-sector.component';
import { YearComponent } from './components/year/year.component';
import { AddYearComponent } from './components/add-year/add-year.component';
import { EditYearComponent } from './components/edit-year/edit-year.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RoleGuardService } from './services/role-auth.service';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { EditProductSupplierComponent } from './components/edit-product-supplier/edit-product-supplier.component';
import { ProductSuppliersComponent } from './components/product-suppliers/product-suppliers.component';
import { Sales2Component } from './components/sales2/sales2.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertsComponent,
    ProductsComponent,
    PosComponent,
    StockComponent,
    SellComponent,
    SalesComponent,
    DepotComponent,
    MoveComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ModelComponent,
    FindComponent,
    YearsComponent,
    BrandsComponent,
    EditBrandComponent,
    AddBrandComponent,
    ModelsComponent,
    EditModelComponent,
    AddModelComponent,
    AddProductComponent,
    AddProductSupplierComponent,
    AddStockComponent,
    EditProductComponent,
    SectorsComponent,
    AddSectorComponent,
    EditSectorComponent,
    YearComponent,
    AddYearComponent,
    EditYearComponent,
    UploadFileComponent,
    EditProductSupplierComponent,
    ProductSuppliersComponent,
    Sales2Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [authInterceptorProviders, RoleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
