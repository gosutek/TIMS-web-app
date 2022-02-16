import * as moment from 'moment';

export class Auxiliary {
    static getFormattedDate(createdOn: string): string {
        return moment(new Date(createdOn)).format('HH:mm, DD MMM YYYY');
    }

    static getFormattedDateNoTime(createdOn: string): string {
        return moment(new Date(createdOn)).format('DD MMM YYYY');
    }

    static getFormattedDateTimeForSQL(): string {
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }

    static getFormattedDateForSQL(): string {
        return moment(new Date()).format('YYYY-MM-DD');
    }

    static getFormattedDateForEndpoint(date: string): string {
        return moment(new Date(date)).format('YYYYMMDD');
    }

    // static getFormattedDateForRequest(): string {
    //     return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    // }

    static getOperatorName(operatorId: string) {
        switch (operatorId) {
            case 'WV7J': {
                return 'Moreas';
            }
            case 'SXNF': {
                return 'Aodos';
            }
            case '1G5N': {
                return 'Egnatia';
            }
            case 'JNI9': {
                return 'Kentriki Odos';
            }
            case 'NLLG': {
                return 'Nea Odos';
            }
            case 'NJO4': {
                return 'Gefyra';
            }
            case '1VYY': {
                return 'Olympia Odos';
            }
        }

        return '';
    }
}
