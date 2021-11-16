import { FieldValue } from "firebase/firestore";

export interface Topic{
    topicID: string;
    name: string;
    description: string;
    access: string;
    imageUrl: string;
}

export interface Reply {
    from: string;
    message: string;
    replyID: string;
    to: string;
    toReplyID: string;
    datePosted: FieldValue | any;
}