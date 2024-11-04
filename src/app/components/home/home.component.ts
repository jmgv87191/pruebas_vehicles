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
import { CommonModule, JsonPipe } from '@angular/common';
import { Detallerevision, Subcategoria, VehicleReq, vehicleResp, VehiclesReq } from '../../interfaces/vehicle';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';



import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

    const detallesRevision: Detallerevision[] = [
      { subcategoria: "LUZ DELANTERA", subcategoriaId: 1, estado: 1, observacion: "Observacion por defecto" },
      { subcategoria: "LUZ TRASERA", subcategoriaId: 2, estado: 1, observacion: "Observacion por defecto" },
      { subcategoria: "LUZ DE CUARTOS DELANTERO", subcategoriaId: 3, estado: 1, observacion: "Observacion por defecto" },
      { subcategoria: "LUZ DE CUARTOS TRASERO", subcategoriaId: 4, estado: 1, observacion: "Observacion por defecto" },
      { subcategoria: "LUZ DIRECCIONAL DERECHA DELANTERA", subcategoriaId: 5, estado: 1, observacion: "Observacion por defecto" },
      { subcategoria: "LUZ DIRECCIONAL IZQUIERDA DELANTERA", subcategoriaId: 6, estado: 1, observacion: "Observacion por defecto" },
      { subcategoria: "LUZ DIRECCIONAL DERECHA TRASERA", subcategoriaId: 7, estado: 1, observacion: "Observacion por defecto" },
      { subcategoria: "LUZ DIRECCIONAL IZQUIERDA TRASERA", subcategoriaId: 8, estado: 1, observacion: "Observacion por defecto" },
      { subcategoria: "LUCES PREVENTIVAS", subcategoriaId: 9, estado: 1, observacion: "Observacion por defecto" },
      { subcategoriaId: 10, subcategoria: "ASIENTOS DELANTEROS", estado: 1, observacion: "Observacion por defecto" },
      { subcategoriaId: 11, subcategoria: "ASIENTOS TRASEROS", estado: 1, observacion: "Observacion por defecto" },
      { subcategoriaId: 12, subcategoria: "VIDRIO FRENTE", estado: 1, observacion: "Observacion por defecto" },
      { subcategoriaId: 13, subcategoria: "VIDRIO TRASERO", estado: 1, observacion: "Observacion por defecto" },
      { subcategoriaId: 14, subcategoria: "ESPEJO LATERAL DERECHO", estado: 1, observacion: "Observacion por defecto" },
      { subcategoriaId: 15, subcategoria: "ESPEJO LATERAL IZQUIERDO", estado: 1, observacion: "Observacion por defecto" },
      { subcategoriaId: 16, subcategoria: "ESPEJO RETROVISOR", estado: 1, observacion: "Observacion por defecto" }
    ];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,MatIconModule, MatDividerModule, MatButtonModule,MatTableModule,MatSelectModule,
    MatInputModule, MatFormFieldModule, JsonPipe, AsyncPipe, MatAutocompleteModule,MatMenuModule, MatToolbarModule, CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  form: FormGroup;
  estado:number = 2
  numerosDeInventario:  VehiclesReq[] = []
  myControl = new FormControl('');
  filteredOptionsList: Observable<VehiclesReq[]> | undefined;
  today="";
  usuario: string | null = "";
  agregarRevision!: vehicleResp;
  vehicleReq!: VehicleReq;
  displayedColumns: string[] = [ 'Subcategoria', 'Calificacion', 'Observaciones'];
  dataSource = detallesRevision;
  selectedVehicleId: string = ''
  isStyled: boolean = false;


  constructor(  
    private fb:FormBuilder,
    private _vehicleService: VehicleService,
    private router: Router,
    private _authService:AuthService,

  ){
    this.form = this.fb.group({
      estado: this.fb.array( detallesRevision.map((item)=> this._createFormGroup(item)) ),
      nombre_asignado: [""],
      marca:[""],
      modelo:[""],
      date: [''],

    })
  }

  ngOnInit(): void {

    this.getVehicles();

    this.today = new Date().toISOString().split('T')[0]; 
    this.form.controls['date'].setValue(this.today);
    this.usuario = localStorage.getItem('usuario')


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

  enviar(){
    
    this.agregarRevision ={
      inventarioId: this.vehicleReq.id,
      funcionarioId: Number(this.vehicleReq.revision![0].funcionarioId),
      userId: this.vehicleReq.userId,  
      fecha: this.today,
      detallerevision:this.productFormArray.value
    } 
    
    this._vehicleService.addInspection( this.agregarRevision ).subscribe((data)=>{
      console.log("revision agregada")

    })

  }

  get productFormArray(){
    return this.form.controls['estado']
  }

  onOptionSelected(event: any) {

    this.selectedVehicleId = event.option.value; 
    console.log('ID seleccionado:', this.selectedVehicleId);

    this._vehicleService.getVehicle( Number(this.selectedVehicleId) ).subscribe((data)=>{

      this.vehicleReq = data
      
      for (let i = 0; i < detallesRevision.length; i++) {
        
        detallesRevision[i].estado = data.revision![data.revision!.length-1].subcategorias![i].detalles![i].estado
        detallesRevision[i].observacion = data.revision![data.revision!.length-1].subcategorias![i].detalles![i].observacion! 
      }
      

      this.form = this.fb.group({
        estado: this.fb.array( detallesRevision.map((item)=> this._createFormGroup(item)) ),
        nombre_asignado: [data.asignado],
        marca: [data.marca],
        modelo: [data.modelo]
      });
      

      
    })
    
  }

  onLogout(){
    this._authService.logOut();
    this.router.navigate(['/'])
  }

  sumar(valor: number, index: number) {

    let nuevoEstado = this.productFormArray.value[index].estado + valor;
  
    if (nuevoEstado < 1) {
      nuevoEstado = 1;
      
    } else if (nuevoEstado > 3) {
      nuevoEstado = 3;
    }
  
    this.productFormArray.value[index].estado = nuevoEstado;  

    console.log(this.productFormArray.value[index])

  }

}