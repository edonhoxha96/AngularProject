import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { InsertsComponent } from './components/inserts/inserts.component';
import { ProductsComponent } from './components/products/products.component';
import { PosComponent } from './components/pos/pos.component';
import { StockComponent } from './components/stock/stock.component';
import { SellComponent } from './components/sell/sell.component';
import { SalesComponent } from './components/sales/sales.component';
import { DepotComponent } from './components/depot/depot.component';
import { MoveComponent } from './components/move/move.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ModelComponent } from './components/model/model.component';
import { YearsComponent } from './components/years/years.component';
import { FindComponent } from './components/find/find.component';
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
import { EditSectorComponent } from './components/edit-sector/edit-sector.component';
import { AddSectorComponent } from './components/add-sector/add-sector.component';
import { YearComponent } from './components/year/year.component';
import { EditYearComponent } from './components/edit-year/edit-year.component';
import { AddYearComponent } from './components/add-year/add-year.component';
import { RoleGuardService } from './services/role-auth.service';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ProductSuppliersComponent } from './components/product-suppliers/product-suppliers.component';
import { EditProductSupplierComponent } from './components/edit-product-supplier/edit-product-supplier.component';
import { Sales2Component } from './components/sales2/sales2.component';

const routes: Routes = [
    {path: 'inserts', component: InsertsComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:modelid/:yearid', component: ProductsComponent},
    {path: 'pos', component: PosComponent},
    {path: 'stock/:id', component: StockComponent},
    {path: 'sell/:id', component: SellComponent},
    {path: 'move/:id', component: MoveComponent},
    {path: 'sales', component: SalesComponent},
    {path: 'depot', component: DepotComponent, canActivate: [RoleGuardService], data: {expectedRole: ["ADMIN","MODERATOR"]}},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'find', component: FindComponent},
    {path: 'models/:id', component: ModelComponent},
    {path: 'years/:id', component: YearsComponent},
    {path: 'brands', component: BrandsComponent, canActivate: [RoleGuardService], data: {expectedRole: "MODERATOR"}},
    {path: 'edit-brand/:id', component: EditBrandComponent},
    {path: 'add-brand', component: AddBrandComponent},
    {path: 'models', component: ModelsComponent},
    {path: 'sectors', component: SectorsComponent},
    {path: 'edit-model/:id', component: EditModelComponent},
    {path: 'edit-sector/:id', component: EditSectorComponent},
    {path: 'edit-product/:id', component: EditProductComponent},
    {path: 'add-model', component: AddModelComponent},
    {path: 'add-sector', component: AddSectorComponent},
    {path: 'add-product', component: AddProductComponent},
    {path: 'add-product-supplier', component: AddProductSupplierComponent},
    {path: 'add-stock', component: AddStockComponent},
    {path: 'year', component: YearComponent},
    {path: 'edit-year/:id', component:EditYearComponent},
    {path: 'add-year', component:AddYearComponent},
    {path: 'upload-file', component:UploadFileComponent},
    {path: 'product-suppliers', component: ProductSuppliersComponent},
    {path: 'edit-product-supplier/:id', component: EditProductSupplierComponent},
    {path: 'sales2', component: Sales2Component},
    {path: '**', redirectTo: ''}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }