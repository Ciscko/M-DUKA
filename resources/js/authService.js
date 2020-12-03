import Axios from "axios"

export default {
    baseUrl : 'http://localhost:8000/api/auth/',
    staticUrl : 'http://localhost:8000/',
    otherUrl : 'http://localhost:8000/api/',
    
    authenticate(cb){
        Axios.get(`${this.baseUrl}userprofile`, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        }).then(res => {
            if(res.data.user){
                cb(true)
                //console.log('LOGGED IN')
            }
        } ).catch(err => {
            cb(false)
            //console.log('LOGIN DENIED', err)
        })
    }
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem('authToken'))
}