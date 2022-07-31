import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

}
