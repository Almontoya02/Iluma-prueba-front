export class Producto{
    constructor(
        public _id?:string,
        public nombre?:string,
        public tipoProducto?:string,
        public fechaProduccion?:string,
        public operarioResponsable?:string,
        public tiempoProduccion?:number,
        public tipoEmpaque?:string
    ){}
}