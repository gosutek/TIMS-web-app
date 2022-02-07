import * as moment from 'moment';

export class Auxiliary {
    static getFormattedDate(createdOn: string): string {
        return moment(new Date(createdOn)).format('HH:mm, DD MMM YYYY');
    }

    static getOperatorName(operatorId: string) {
        switch (operatorId) {
            case 'WV7J': {
                return 'Attiki Odos';
            }
            case 'SXNF': {
                return 'Aegean Motorway';
            }
            case '1G5N': {
                return 'Egnatia Odos';
            }
            case 'JNI9': {
                return 'Kendriki Odos';
            }
            case 'NLLG': {
                return 'Moreas';
            }
            case 'NJO4': {
                return 'Nea Odos';
            }
            case '1VYY': {
                return 'Olympia Odos';
            }
        }

        return '';
    }
}
