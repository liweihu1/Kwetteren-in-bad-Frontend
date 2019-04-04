import { User } from './User';

export class Kweet {
    id: string;
    author: User;
    message: string;
    dateCreated: Date;
    dateUpdated: Date;
    mentions: Array<string>;
    heartedBy: Array<string>;
    trends: Array<string>;

    constructor(obj : KweetInterface = {} as Kweet) {
        const {
            id = "",
            author = null,
            message = "",
            dateCreated = null,
            dateUpdated = null,
            mentions = [],
            heartedBy = [],
            trends = []
        } = obj;

        this.id = id;
        this.author = author;
        this.message = message;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.mentions = mentions;
        this.heartedBy = heartedBy;
        this.trends = trends;
    }
}

export interface KweetInterface {
    id: string;
    author: User;
    message: string;
    dateCreated: Date;
    dateUpdated: Date;
    mentions: Array<string>;
    heartedBy: Array<string>;
    trends: Array<string>;
}