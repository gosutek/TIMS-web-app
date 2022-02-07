import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PassDto} from "../../dto/pass-dto";
import {BaseService} from "../../services/base.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-passes',
    templateUrl: './passes.component.html',
    styleUrls: ['./passes.component.scss']
})
export class PassesComponent implements OnInit {

    displayedColumnsPasses: string[] = ['operator', 'station_id', 'tag_id', 'vehicle_id', 'timestamp']

    passesDatasource: MatTableDataSource<PassDto>

    passesFormGroup = new FormGroup({
        stationId: new FormControl(''),
        tagId: new FormControl(''),
        timestamp: new FormControl('')
    });

    constructor(private baseService: BaseService) {

    }

    ngOnInit(): void {
    }

    updateTable() {
    }

    postNewPass() {
    }

}
