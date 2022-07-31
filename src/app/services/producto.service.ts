import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Producto } from './../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  listProductos:Producto[]=[];
  listProducto:Producto[]=[];
  UrlApi="https://iluma-prueba-back.herokuapp.com"
  constructor(public httpClient:HttpClient) { }

  async getProductsRequest(){
    const data = await lastValueFrom(this.httpClient.get(this.UrlApi+"/products"));
    const json = JSON.parse(JSON.stringify(data))    
    return json
  }

  async getProducts(){
    const response = await this.getProductsRequest();
    this.listProductos = response.data.products;
  }

  async createProductRequest(producto:Producto){
    const data = await  lastValueFrom(this.httpClient.post(this.UrlApi+"/products/add",{
      nombre:producto.nombre,        
      tipoProducto:producto.tipoProducto,
      operarioResponsable:producto.operarioResponsable,
      tiempoProduccion:producto.tiempoProduccion,
      tipoEmpaque:producto.tipoEmpaque
    } 
    ));
    console.log(data)
    return data;
  }

  async deleteProduct(id:any){

    const data = await lastValueFrom(this.httpClient.delete(this.UrlApi+"/products/delete/"+id));
    const json = JSON.parse(JSON.stringify(data)) 
    return json.status;
    
  }
  async putProduct(producto:Producto){

    const data = await lastValueFrom(this.httpClient.patch(this.UrlApi+"/products/update/"
    ,{
      _id:producto._id,
      nombre:producto.nombre,        
      tipoProducto:producto.tipoProducto,
      operarioResponsable:producto.operarioResponsable,
      tipoEmpaque:producto.tipoEmpaque

      ,}));

    const json = JSON.parse(JSON.stringify(data)) 
    console.log(json.status)
    return json.status;
    
  }
}
