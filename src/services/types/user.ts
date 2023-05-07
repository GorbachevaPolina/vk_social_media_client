export type TUserInfo = {
    "_id": string;
    "username": string;
    "profilePicture": string;
    "friends": string[];
    "friends_req": string[];
    "age": string;
    "city": string;
    "university": string;
    "createdAt": string;
    "__v": number
}
// export type TUserInfo = {
//     "username": string;
//     "age": string;
//     "city": string;
//     "university": string;
// }

export type TRegInfo = {
    email: string,
    username: string,
    password: string;
    age: string;
    city: string;
    university: string;
    profilePicture: string | File;
}

export type TLoginInfo = {
    email: string;
    password: string
}