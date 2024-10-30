import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


export interface Detallerevision {
  subcategoriaId: number;
  subcategoria:   string;
  estado:         number ;
  observacion:    string;
}

const detallesRevision: Detallerevision[] = [
  {
    subcategoria: "LUZ DELANTERA",
    subcategoriaId : 1,
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoria: "LUZ TRASERA",
    subcategoriaId : 2,
    estado:2,
    observacion: "lo que sea 2"
  },
  {
    subcategoria: "LUZ DE CUARTOS DELANTERO",
    subcategoriaId : 3,
    estado:1,
    observacion: "lo que sea 4"
  },
  {
    subcategoria: "LUZ DE CUARTOS TRASERO",
    subcategoriaId : 4,
    estado:1,
    observacion: "lo que sea 5"
  },
  {
    subcategoria: "LUZ DIRECCIONAL DERECHA DELANTERA",
    subcategoriaId : 5,
    estado:1,
    observacion: "lo que sea 6"
  },
  {
    subcategoria: "LUZ DIRECCIONAL IZQUIERDA DELANTERA",
    subcategoriaId : 6,
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoria: "LUZ DIRECCIONAL DERECHA TRASERA",
    subcategoriaId : 7,
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoria: "LUZ DIRECCIONAL IZQUIERDA TRASERA",
    subcategoriaId : 8,
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoria: "LUCES PREVENTIVAS",
    subcategoriaId : 9,
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoriaId: 10,
    subcategoria: "ASIENTOS DELANTEROS",
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoriaId: 11,
    subcategoria: "ASIENTOS TRASEROS",
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoriaId: 12,
    subcategoria: "VIDRIO FRENTE",
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoriaId: 13,
    subcategoria: "VIDRIO TRASERO",
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoriaId: 14,
    subcategoria: "ESPEJO LATERAL DERECHO",
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoriaId: 15,
    subcategoria: "ESPEJO LATERAL IZQUIERDO",
    estado:1,
    observacion: "lo que sea"
  },
  {
    subcategoriaId: 16,
    subcategoria: "ESPEJO RETROVISOR",
    estado:1,
    observacion: "lo que sea"
  }
]



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,MatIconModule, MatDividerModule, MatButtonModule,MatTableModule,MatSelectModule,
    MatInputModule, MatFormFieldModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  form: FormGroup;
  estado:number = 0

  displayedColumns: string[] = [ 'Subcategoria', 'Calificacion', 'Observaciones'];
  dataSource = detallesRevision;

  constructor(  
    private fb:FormBuilder,
    private _vehicleService: VehicleService
  ){

    this.form = this.fb.group({
      asignado: [3]
    })

  }
  ngOnInit(): void {

    this.getVehicles();

  }


  getVehicles(){
    this._vehicleService.getVehicles().subscribe((data)=>{
      console.log(data)
    })
  }

  getVehicle( id:number ){
    this._vehicleService.getVehicle(id).subscribe((data)=>{
      console.log(data)
    })
  }


  agregar(){
    console.log(this.form.value)
  }




}