import jwt_decode from "jwt-decode";


export function getUser() {
    const token = localStorage.getItem('token')
    if (!token) return null
    const parsedToken = jwt_decode(token);
    return parsedToken
}