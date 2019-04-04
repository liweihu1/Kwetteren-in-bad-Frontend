import { User } from 'src/app/models/User';

export class UserInfoValidator {

    constructor() {

    }

    validateUserInfo(values): boolean {
        if (!values.firstName && !values.lastName && !values.website && !values.location && !values.biography) {
            return false;
        }
        return true;
    }
}