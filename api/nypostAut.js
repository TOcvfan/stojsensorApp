import config from '../helpers/config';
import axios from 'axios';
import headers from '@/helpers/headers';
const url = config.baseURL + config.path;

const nyPostAut = async (data, setMessage, sti, token) => {
    //var raw = JSON.stringify(data);
    //console.log(data, ' første')
    const requestOptions = {
        method: 'POST',
        headers: headers(token),
        data: data
    };
    let res;

    await axios(url + sti, requestOptions).then(response => {
        res = response.data
        return res
    }).catch((error) => {
        if (error.response) {
            res = error.response.data;
            console.log(res)
            throw res;
        } else if (error.request) {
            //console.log(error.request + ' request')  
            res = error.request;
            throw res
        } else {
            //console.log(error + ' else')
            res = error.message;
            throw res
        }
    }).finally(() => {
        setMessage(res)
        return res
    });

}
export default nyPostAut;