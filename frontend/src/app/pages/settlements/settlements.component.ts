import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {BaseService} from "../../services/base.service";
import {VenueUsageDTO} from "../../dto/venue-usage-dto";
import {PassDto} from "../../dto/pass-dto";
import {SettlementDto} from "../../dto/settlement-dto";
import {Auxiliary} from "../../config/auxiliary";

@Component({
    selector: 'app-settlement',
    templateUrl: './settlements.component.html',
    styleUrls: ['./settlements.component.scss']
})
export class SettlementsComponent implements OnInit {
    Auxiliary = Auxiliary
    displayedColumnsPasses: string[] = ['station_id', 'station_operator', 'tag_id', 'tag_provider', 'pass_type', 'charge', 'timestamp']

    settlementDatasource: MatTableDataSource<PassDto>
    settlementDTO: SettlementDto

    //Filtered Variables
    selectedOperatorA = ""
    selectedOperatorB = ""
    selectedTimeRange = "week"

    settlementsFiltersFormGroup = new FormGroup({
        operatorA: new FormControl('WV7J'),
        operatorB: new FormControl('1G5N'),
        // timeRange: new FormControl('week')
    });

    constructor(private baseService: BaseService) {

    }

    ngOnInit(): void {
        // this.onFilterChanges()
        // this.updateTable()
    }

    getSettlement() {
        this.baseService.getSettlement(this.settlementsFiltersFormGroup.controls["operatorA"].value, this.settlementsFiltersFormGroup.controls["operatorB"].value, '20000709', '20190709').subscribe(
            response => {
                console.log(response)
                this.settlementDTO = response
                this.settlementDatasource = new MatTableDataSource<PassDto>(JSON.parse(JSON.stringify(response.PassesList)))
            }
        )
    }

    // onFilterChanges() {
    //     this.settlementsFiltersFormGroup.valueChanges.subscribe(formValues => {
    //         if (formValues.age != null) {
    //             this.selectedOperatorA = formValues.operatorA
    //         }
    //
    //         if (formValues.age != null) {
    //             this.selectedOperatorB = formValues.operatorB
    //         }
    //
    //         if (formValues.timeRange != null) {
    //             this.selectedTimeRange = formValues.timeRange
    //         }
    //
    //         this.updateTable();
    //     })
    // }
}
