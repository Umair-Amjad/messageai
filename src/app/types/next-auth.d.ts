import "next-auth"

declare module 'next-auth'{
    interface User {
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        userName?:string
    }
    interface Session {
        user:{
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        userName?:string
        }
    } 
}


declare module 'next-auth/jwt' {
    interface JWT {
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        userName?:string
    }
}