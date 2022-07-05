import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodyVariant } from 'src/app/models/bodyvariant';
import { GlassBodyVariant } from 'src/app/models/glassbodyvariant';
import { GlassProperties } from 'src/app/models/glassproperties';
import { Product } from 'src/app/models/product';
import { Properties } from 'src/app/models/properties';
import { GlassPropertiesService } from 'src/app/services/glasproperties.service';
import { GlassBodyVariantService } from 'src/app/services/glassbodyvariant.service';
import { Stock } from '../../models/stock';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  public id!: number;
  public stocks! : Stock[];
  public properties: Properties[] = [];
  public bodyVariants: BodyVariant[] = [];
  public glassProperties!: GlassProperties[];
  public glassBodyVariants!: GlassBodyVariant[];
  product!: Product;
  productLoaded!: Promise<boolean>;
  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private propertiesService: GlassPropertiesService,
    private glassBodyVariantService: GlassBodyVariantService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    console.log(this.id);
    this.stockService.getStockByProduct(this.id).subscribe(
      (response: Stock[]) => {
        this.stocks = response;
        console.log(this.stocks[0])
        this.product = this.stocks[0].productSupplier.product
        this.productLoaded = Promise.resolve(true)
      }
    )
    this.propertiesService.getGlassPropertiesByProduct(this.id).subscribe(
      (response: GlassProperties[]) =>{
        response.forEach(r => {
          this.properties.push(r.properties)
        })
      }
    )
    this.glassBodyVariantService.getGlassBodyVariantByProduct(this.id).subscribe(
      (response: GlassBodyVariant[]) => {
        response.forEach(bv => {
          this.bodyVariants.push(bv.bodyVariant)
        })
      }
    )  
  }
}
