import {PassDto} from "./pass-dto";

export class SettlementDto {
    OwningOperator: string;
    StationOperator: string;
    AmountOwned: number;
    PassesList: Array<PassDto>;
}
