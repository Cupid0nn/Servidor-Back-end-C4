import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository {
singin() {
    
}
private auth = [
    {
        id: 1,
        auth: "true"
    },
    {
        id: 2,
        auth: "false"
    }
]

getAuth(){
    return this.auth
}
}