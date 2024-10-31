import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder,FormControl } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { JsonPipe } from '@angular/common';
import { VehiclesReq } from '../../interfaces/vehicle';



import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



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
    observacion: "Observacion por defecto"
  },
  {
    subcategoria: "LUZ TRASERA",
    subcategoriaId : 2,
    estado:2,
    observacion: "Observacion por defecto"
  },
  {
    subcategoria: "LUZ DE CUARTOS DELANTERO",
    subcategoriaId : 3,
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoria: "LUZ DE CUARTOS TRASERO",
    subcategoriaId : 4,
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoria: "LUZ DIRECCIONAL DERECHA DELANTERA",
    subcategoriaId : 5,
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoria: "LUZ DIRECCIONAL IZQUIERDA DELANTERA",
    subcategoriaId : 6,
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoria: "LUZ DIRECCIONAL DERECHA TRASERA",
    subcategoriaId : 7,
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoria: "LUZ DIRECCIONAL IZQUIERDA TRASERA",
    subcategoriaId : 8,
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoria: "LUCES PREVENTIVAS",
    subcategoriaId : 9,
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoriaId: 10,
    subcategoria: "ASIENTOS DELANTEROS",
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoriaId: 11,
    subcategoria: "ASIENTOS TRASEROS",
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoriaId: 12,
    subcategoria: "VIDRIO FRENTE",
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoriaId: 13,
    subcategoria: "VIDRIO TRASERO",
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoriaId: 14,
    subcategoria: "ESPEJO LATERAL DERECHO",
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoriaId: 15,
    subcategoria: "ESPEJO LATERAL IZQUIERDO",
    estado:1,
    observacion: "Observacion por defecto"
  },
  {
    subcategoriaId: 16,
    subcategoria: "ESPEJO RETROVISOR",
    estado:6,
    observacion: "Observacion por defecto"
  }
]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,MatIconModule, MatDividerModule, MatButtonModule,MatTableModule,MatSelectModule,
    MatInputModule, MatFormFieldModule, JsonPipe, AsyncPipe, MatAutocompleteModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  form: FormGroup;
  estado:number = 0
  numerosDeInventario:  VehiclesReq[] = []
  myControl = new FormControl('');
  filteredOptionsList: Observable<VehiclesReq[]> | undefined;

  displayedColumns: string[] = [ 'Subcategoria', 'Calificacion', 'Observaciones'];
  dataSource = detallesRevision;

  selectedVehicleId: string = ''


  constructor(  
    private fb:FormBuilder,
    private _vehicleService: VehicleService
  ){
    this.form = this.fb.group({
      estado: this.fb.array( detallesRevision.map((item)=> this._createFormGroup(item)) ),
      nombre_asignado: [""],
      marca:[""],
      modelo:[""]
    })
  }
  ngOnInit(): void {

    this.getVehicles();


    this.filteredOptionsList = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._listFilter(value || '')),
    ); 

  }

  private _listFilter(value: string): VehiclesReq[] {
    const filterValue = value;

    return this.numerosDeInventario.filter(option => String(option.id).includes(filterValue));
  }


  getVehicles(){
    this._vehicleService.getVehicles().subscribe((data)=>{

      this.numerosDeInventario = data
      console.log('this.numerosDeInventario',this.numerosDeInventario)

    })
  }


  private _createFormGroup( vehicle: Detallerevision ){

    return this.fb.group(
      {
        subcategoriaId: vehicle.subcategoriaId,
        subcategoria:   vehicle.subcategoria,
        estado:         vehicle.estado,
        observacion: vehicle.observacion
      }
    )
  }

  calculate(){
    console.log( this.productFormArray.value )
  }

  get productFormArray(){
    return this.form.controls['estado']
  }

  onOptionSelected(event: any) {
    this.selectedVehicleId = event.option.value; // Almacena el valor seleccionado
    console.log('ID seleccionado:', this.selectedVehicleId);

    this._vehicleService.getVehicle( Number(this.selectedVehicleId) ).subscribe((data)=>{

      console.log(data)

      this.form = this.fb.group({
        estado: this.fb.array( detallesRevision.map((item)=> this._createFormGroup(item)) ),
        nombre_asignado: [data.asignado],
        marca: [data.marca],
        modelo: [data.modelo]
      });

      console.log('estad', this.form.value)

    })

    
  }

}