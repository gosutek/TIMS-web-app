import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {BaseService} from "../../services/base.service";
import {PassDto} from "../../dto/pass-dto";
import {SettlementDto} from "../../dto/settlement-dto";
import {Auxiliary} from "../../config/auxiliary";

@Component({
    selector: 'app-settlement',
    templateUrl: './settlements.component.html',
    styleUrls: ['./settlements.component.scss']
})
export class SettlementsComponent implements OnInit {
    displayedColumnsPasses: string[] = ['station_id', 'station_operator', 'tag_id', 'tag_provider', 'pass_type', 'charge', 'timestamp']

    settlementDatasource: MatTableDataSource<PassDto>
    settlementDTO: SettlementDto

    Auxiliary = Auxiliary
    Math = Math

    sameOperatorSelected = false

    //Filtered Variables
    selectedOperatorA = ""
    selectedOperatorB = ""
    selectedTimeRange = ""

    settlementFormGroup = new FormGroup({
        operatorA: new FormControl('WV7J'),
        operatorB: new FormControl('1G5N'),
        dateFrom: new FormControl(Auxiliary.getFormattedDateForSQL()),
        dateTo: new FormControl(Auxiliary.getFormattedDateForSQL()),
    });

    constructor(private baseService: BaseService) {

    }

    ngOnInit(): void {
    }

    getSettlement() {
        let operatorA = this.settlementFormGroup.controls["operatorA"].value
        let operatorB = this.settlementFormGroup.controls["operatorB"].value
        let dateFromParameter = Auxiliary.getFormattedDateForEndpoint(this.settlementFormGroup.controls["dateFrom"].value)
        let dateToParameter = Auxiliary.getFormattedDateForEndpoint(this.settlementFormGroup.controls["dateTo"].value)

        if (operatorA == operatorB) {
            this.sameOperatorSelected = true
            return
        } else {
            this.sameOperatorSelected = false
        }

        this.baseService.getSettlement(operatorA, operatorB, dateFromParameter, dateToParameter).subscribe(
            response => {
                console.log(response)
                this.settlementDTO = response
                this.settlementDatasource = new MatTableDataSource<PassDto>(JSON.parse(JSON.stringify(response.PassesList)))
            }
        )
    }
}
