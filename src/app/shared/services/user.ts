import { FieldValue } from "firebase/firestore";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    password: string;
    isAdmin: boolean,
    dateRegistered: FieldValue | any
}
