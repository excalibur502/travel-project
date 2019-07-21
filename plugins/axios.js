import {Message} from 'element-ui'

export default ({$axios,redirect}) => {
    $axios.onError(err => {
        console.log(err,'axioserr')
        const {message,statusCode} = err.response.data;
        if(statusCode === 400){
            Message.error(message);
        }
        if(statusCode === 401 || statusCode === 403){
            redirect('/user/login');
        }
    })
}