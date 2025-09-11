import { jwtDecode } from "jwt-decode";

interface jwtPayload{
    exp : number;
    iat? : number;
    sub? : string
}

export const isTokenValid = (token : string) => {
    try{
        const decoded = jwtDecode < jwtPayload > (token);
        return decoded.exp * 1000 > Date.now();
    }catch(err){
        return false;
    }
}


