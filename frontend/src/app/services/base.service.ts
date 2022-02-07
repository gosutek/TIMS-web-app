import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { AppConstants } from 'src/app/config/app-constants';
import {PassDto} from "../dto/pass-dto";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    // private endpoint = 'customers.php';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  `application/json`
        })
    };

    constructor(private http: HttpClient) {

    }

    getSettlement(op1ID, op2ID, dateFrom, dateTo): Observable<any> {
        return this.http.get(AppConstants.API_ROOT + '/Settlement/' + op1ID + '/' + op2ID + '/'+ dateFrom + '/'+ dateTo)
        // return this.http.get(AppConstants.API_ROOT + '/Settlement/' + op1ID + '/' + op2ID + '/20000709/20190709')
    }

    getPasses(): Observable<any> {
        return this.http.get(AppConstants.API_ROOT + '/Passes')
    }

    postNewPass(passDto: PassDto): Observable<any> {
        return this.http.post(AppConstants.API_ROOT + '/Passes', passDto)
    }
}
