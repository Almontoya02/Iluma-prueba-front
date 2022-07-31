import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from './../../../services/producto.service';
import {CdTimerComponent, TimeInterface} from 'angular-cd-timer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  _id="";
  editarP = false;
  habilitar =false;
  option = "Agregar";
  nombreProducto:string="";
  operario:string="";
  model?:NgbDateStruct;
  tipoProducto = [
    {value: 'Mineral', viewValue: 'Mineral'},
    {value: 'Vitamina', viewValue: 'Vitamina'},
    {value: 'Premezcla', viewValue: 'Premezcla'},
    {value: 'Producto terminado', viewValue: 'Producto terminado'},
  ];
  tipoEmpaque = [
    {value: 'Bulto de 25KG', viewValue: 'Bulto de 25KG'},
    {value: 'Bulto de 10KG', viewValue: 'Bulto de 10KG'},
    {value: 'Tarro de 2KG', viewValue: 'Tarro de 2KG'},
    {value: 'Liquido 100ml', viewValue: 'Liquido 100ml'},
  ];
  productoSeleccionado: string = this.tipoProducto[0].value;
  empaqueSeleccionado: string = this.tipoEmpaque[0].value;
  @ViewChild('basicTimer', { static: true }) basicTimer!: CdTimerComponent;
  timerInfo = 0;

  constructor(public productoService:ProductoService) { 
    this.timerInfo = 0;
    
  }

  
  ngOnInit(): void {
    (this.productoService.getProducts());
    this.basicTimer.start();
  }

  async Guardar(){
    if(this.editarP==false){
      this.agregarProducto();
      this.basicTimer.start();
    }else{
      const Isupdate = await this.productoService.putProduct(
      {
        _id:this._id,
        nombre:this.nombreProducto,
        tipoProducto:this.productoSeleccionado,
        operarioResponsable:this.operario,
        tipoEmpaque:this.empaqueSeleccionado
      });
      Isupdate?alert("Actualizado correctamente"):alert("Hubo un error :(");
      this.operario="";
      this.productoSeleccionado=this.tipoProducto[0].value;
      this.empaqueSeleccionado=this.tipoEmpaque[0].value;
      this.nombreProducto="";
      this.editarP=false;
      this.habilitar=false;
      this.option="Guardar";
      this.productoService.getProducts();
      this.basicTimer.start();
    }
  }

  async editar(_id:any,nombre:any,operarioResponsable:any,tipoProducto:any,tipoEmpaque:any){
    this.empaqueSeleccionado=tipoEmpaque;
    this.productoSeleccionado=tipoProducto;
    this.operario=operarioResponsable;
    this._id=_id;
    this.nombreProducto=nombre;
    this.option="Guardar Cambios";
    this.editarP=true;
    this.habilitar=true;
    this.basicTimer.start();
  }
  async eliminar(_id:any){
    var conf=confirm("¿Está seguro de eliminar este producto?");
    if(conf){
      const Isdelete= await this.productoService.deleteProduct(_id);
      if(Isdelete){
        alert("Eliminado con exito");
        this.basicTimer.start();
      }else{
        alert("Hubo un error");
      }
      this.productoService.getProducts();
      this.basicTimer.start();
    }
  }

  async agregarProducto(){

    if(this.nombreProducto!="" && this.operario!=""){
      
      (await this.productoService.createProductRequest(
          {
            nombre:this.nombreProducto,
            tipoProducto:this.productoSeleccionado,
            operarioResponsable:this.operario,
            tiempoProduccion:this.timerInfo/60,
            tipoEmpaque:this.empaqueSeleccionado
          }
        )
      );
      this.productoService.getProducts();
      this.basicTimer.start();

    }else{
      alert("Por favor no deje campos vacíos")
    }
  }
  onTick(data: TimeInterface) {
    this.timerInfo = data.tick_count;
  }
}
