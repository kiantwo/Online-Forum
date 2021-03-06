import { FieldValue } from "firebase/firestore";

export interface Topic{
    topicID: string;
    name: string;
    description: string;
    dateCreated: FieldValue | any;
}

export interface Reply {
    from: string;
    message: string;
    replyID: string;
    to: string;
    toReplyID: string;
    datePosted: FieldValue | any;
}

export interface Thread{
    dateCreated: FieldValue | any;
    poster: string;
    threadID: string;
    title: string;
}