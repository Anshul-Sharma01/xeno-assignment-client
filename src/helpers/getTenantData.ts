import { jwtDecode } from "jwt-decode";

export interface TenantPayload{
    id : string;
    email : string;
    shopifyDomain : string;
    exp : number;
}

export const getTenantData = (token : string) : TenantPayload | null => {
    try{
        const decodedToken = jwtDecode < TenantPayload >(token);
        return decodedToken;
    }catch(err){    
        return null;
    }
}

