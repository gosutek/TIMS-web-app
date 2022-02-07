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

    getPasses(operatorA, operatorB, timeRange): Observable<any> {
        let params = "?operator_a=" + operatorA + "&operator_b=" + operatorB + "&time_range=" + timeRange

        return this.http.get(AppConstants.API_ROOT + '/url1' + params)
    }

    postNewPass(passDto: PassDto) {
        return this.http.post(AppConstants.API_ROOT + '/Passes', JSON.stringify(passDto))
    }

    getClients(firstName,lastName,idNo): Observable<any> {
        let params = "?first_name=" + firstName + "&last_name=" + lastName + "&id_no=" + idNo

        return this.http.get(AppConstants.API_ROOT + '/clients.php' + params)
    }

    getVisitsToServices(serviceId,date,minCost,maxCost): Observable<any> {
        let params = "?service_id=" + serviceId + "&date=" + date + "&min_cost=" + minCost + "&max_cost=" + maxCost

        return this.http.get(AppConstants.API_ROOT + '/visits-to-services.php' + params)
    }

    getClientVisits(nfcId,date): Observable<any> {
        let params = "?nfc_id=" + nfcId + "&date=" + date

        return this.http.get(AppConstants.API_ROOT + '/client-visits.php' + params)
    }

    getPossibleInfections(nfcId,firstName,lastName,idNo): Observable<any> {
        let params = "?nfc_id=" + nfcId + "&first_name=" + firstName + "&last_name=" + lastName + "&id_no=" + idNo

        return this.http.get(AppConstants.API_ROOT + '/possible-infections.php' + params)
    }

    getMostUsedVenues(timeRange,age): Observable<any> {
        let params = "?time_range=" + timeRange + "&age=" + age

        return this.http.get(AppConstants.API_ROOT + '/most-used-venues.php' + params)
    }

    getMostUsedServices(timeRange,age): Observable<any> {
        let params = "?time_range=" + timeRange + "&age=" + age

        return this.http.get(AppConstants.API_ROOT + '/most-used-services.php' + params)
    }

    getUniqueServiceUses(timeRange,age): Observable<any> {
        let params = "?time_range=" + timeRange + "&age=" + age

        return this.http.get(AppConstants.API_ROOT + '/service-unique-uses.php' + params)
    }
}
