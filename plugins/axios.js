import {Message} from 'element-ui'

export default ({$axios}) => {
    $axios.onError(err => {
        console.log(err,'axioserr')
        const {message,statusCode} = err.response.data;
        if(statusCode === 400){
            Message.error(message);
        }
    })
}