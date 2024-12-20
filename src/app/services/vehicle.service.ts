import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginReq,LoginRes, VehicleReq, vehicleResp, VehiclesReq } from '../interfaces/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl: string = '/api/inventarios'
  private loginUrl: string = '/api/auth/login'


  constructor( private http: HttpClient ) { }

  loginByEmail(form:LoginReq):Observable<LoginRes>{

    return this.http.post<LoginRes>((environment.endpoint + this.loginUrl),form);
  } 

  getVehicles():Observable<VehiclesReq[]>{

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.get<VehiclesReq[]>(   (environment.endpoint + this.apiUrl), options )
  }

  getVehicle( id:number ):Observable<VehicleReq>{

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.get<VehicleReq>(  (environment.endpoint + this.apiUrl+ "/" + id),options )
  }

  addInspection( form: vehicleResp ):Observable<void>{

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.post<void>( (environment.endpoint + this.apiUrl), form, options  )
  }


}

