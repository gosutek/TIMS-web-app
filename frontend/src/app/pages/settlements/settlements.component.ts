import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {BaseService} from "../../services/base.service";
import {VenueUsageDTO} from "../../dto/venue-usage-dto";
import {PassesDto} from "../../dto/passes-dto";

@Component({
    selector: 'app-settlement',
    templateUrl: './settlements.component.html',
    styleUrls: ['./settlements.component.scss']
})
export class SettlementsComponent implements OnInit {

    displayedColumnsPasses: string[] = ['operator', 'station_id', 'tag_id', 'vehicle_id', 'timestamp']

    passesDatasource: MatTableDataSource<PassesDto>

    //Filtered Variables
    selectedOperatorA = ""
    selectedOperatorB = ""
    selectedTimeRange = "week"

    settlementsFiltersFormGroup = new FormGroup({
        operatorA: new FormControl(''),
        operatorB: new FormControl(''),
        timeRange: new FormControl('week')
    });

    constructor(private baseService: BaseService) {

    }

    ngOnInit(): void {
        this.onFilterChanges()
        this.updateTable()
    }

    updateTable() {
        this.baseService.getPasses(this.selectedOperatorA, this.selectedOperatorB, this.selectedTimeRange).subscribe(
            response => {
                console.log(response)
                // this.venueUsageDatasource = new MatTableDataSource(JSON.parse(JSON.stringify(response)))
                // this.venueUsageDatasource.sort = this.sort;
                // this.venueUsageDatasource.paginator = this.paginator
            }
        )
    }

    onFilterChanges() {
        this.settlementsFiltersFormGroup.valueChanges.subscribe(formValues => {
            if (formValues.age != null) {
                this.selectedOperatorA = formValues.operatorA
            }

            if (formValues.age != null) {
                this.selectedOperatorB = formValues.operatorB
            }

            if (formValues.timeRange != null) {
                this.selectedTimeRange = formValues.timeRange
            }

            this.updateTable();
        })
    }
}
