import * as moment from 'moment';

export class Auxiliary {
    static getFormattedDate(createdOn: string): string {
        return moment(new Date(createdOn)).format('HH:mm, DD MMM YYYY');
    }

    static getFormattedDateForSQL(): string {
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }

    static getOperatorName(operatorId: string) {
        switch (operatorId) {
            case 'WV7J': {
                return 'moreas';
            }
            case 'SXNF': {
                return 'aodos';
            }
            case '1G5N': {
                return 'egnatia';
            }
            case 'JNI9': {
                return 'kentriki odos';
            }
            case 'NLLG': {
                return 'nea odos';
            }
            case 'NJO4': {
                return 'gefyra';
            }
            case '1VYY': {
                return 'olympia odos';
            }
        }

        return '';
    }
}
