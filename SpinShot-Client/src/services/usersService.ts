import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode"

let api: string = `${process.env.REACT_APP_API}/users`;

export function checkUser(userToCheck:User){
    return axios.post(`${api}/login`, userToCheck)
}
export function addUser(newUser: User){
    return axios.post(api,newUser);
}

export function getUserByEmail(email:string){
    return axios.get(`${api}?email=${email}`,{headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}

export function getTokenDetails(){
    let token = JSON.parse(sessionStorage.getItem("token") as string).token;
    return jwt_decode(token)
    }