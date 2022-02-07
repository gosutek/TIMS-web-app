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

    //Filtered Variables
    selectedOperatorA = ""
    selectedOperatorB = ""
    selectedTimeRange = ""

    settlementFormGroup = new FormGroup({
        operatorA: new FormControl('WV7J'),
        operatorB: new FormControl('1G5N'),
        // timeRange: new FormControl('week')
    });

    constructor(private baseService: BaseService) {

    }

    ngOnInit(): void {
    }

    getSettlement() {
        this.baseService.getSettlement(this.settlementFormGroup.controls["operatorA"].value, this.settlementFormGroup.controls["operatorB"].value, '19700709', '20500709').subscribe(
            response => {
                console.log(response)
                this.settlementDTO = response
                this.settlementDatasource = new MatTableDataSource<PassDto>(JSON.parse(JSON.stringify(response.PassesList)))
            }
        )
    }
}
