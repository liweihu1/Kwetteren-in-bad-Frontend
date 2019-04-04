import { User } from 'src/app/models/User';

export class UserInfoValidator {

    constructor() {

    }

    validateUserInfo(values): boolean {
        if (!values.username && !values.firstName && !values.lastName && !values.website && !values.location && !values.biography) {
            return false;
        }
        return true;
    }
}