import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PassDto} from "../../dto/pass-dto";
import {BaseService} from "../../services/base.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Auxiliary} from "../../config/auxiliary";
import {PassesDto} from "../../dto/passes-dto";

@Component({
    selector: 'app-passes',
    templateUrl: './passes.component.html',
    styleUrls: ['./passes.component.scss']
})
export class PassesComponent implements OnInit {

    displayedColumnsPasses: string[] = ['station_id', 'station_operator', 'tag_id', 'tag_provider', 'pass_type', 'charge', 'timestamp']

    passesDatasource: MatTableDataSource<PassDto> = new MatTableDataSource<PassDto>()
    passesDTO: PassesDto

    Auxiliary = Auxiliary
    Math = Math

    //Filtered Variables
    selectedStationId = ""
    selectedTagId = ""
    selectedTimestamp = ""

    passesFormGroup = new FormGroup({
        stationId: new FormControl(),
        tagId: new FormControl(),
        charge: new FormControl(),
        timestamp: new FormControl(Auxiliary.getFormattedDateForSQL())
    });

    constructor(private baseService: BaseService, private changeDetectorRefs: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.getPasses()
    }

    getPasses() {
        this.baseService.getPasses().subscribe(
            response => {
                console.log(response)
                this.passesDTO = response
                this.passesDatasource.data = JSON.parse(JSON.stringify(this.passesDTO.PassesList))
                this.changeDetectorRefs.detectChanges();

                if (this.passesDTO.PassesList.length > 0) {
                    this.passesFormGroup.controls["stationId"].setValue(this.passesDTO.PassesList[0].StationID)
                    this.passesFormGroup.controls["tagId"].setValue(this.passesDTO.PassesList[0].TagID)
                    this.passesFormGroup.controls["charge"].setValue(1.0)
                }
            }
        )
    }

    postNewPass() {
        let newPassDto = new PassDto();
        newPassDto.StationID = this.passesFormGroup.controls["stationId"].value
        newPassDto.TagID = this.passesFormGroup.controls["tagId"].value
        newPassDto.Charge = this.passesFormGroup.controls["charge"].value
        newPassDto.TimeStamp = this.passesFormGroup.controls["timestamp"].value

        this.baseService.postNewPass(newPassDto).subscribe(
            response => {
                this.getPasses()
            }
        )
    }
}
