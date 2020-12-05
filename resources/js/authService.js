import Axios from "axios"

export default {
    baseUrl : 'https://git.heroku.com/tranquil-citadel-61482.git/api/auth/',
    staticUrl : 'https://git.heroku.com/tranquil-citadel-61482.git/',
    otherUrl : 'https://git.heroku.com/tranquil-citadel-61482.git/api/',
    
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