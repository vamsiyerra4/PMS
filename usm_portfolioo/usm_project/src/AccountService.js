import axios from 'axios'

const baseURL = 'http://localhost:3306/SecurityMaster';

//const AUTHOR_REST_API_URL='http://localhost:8080/author/fetchAuthor';

const FETCH_URL="http://localhost:3306/SecurityMaster/fetchDataBySector";

class AccountService {
    // getAuthor() {

    //     let token = JSON.parse(localStorage.getItem('login'));



    //     return axios.get(`${baseURL}/fetchAuthor`, {

    //         headers: {

    //             'authorization': token.accessToken,

    //             'Accept': 'application/json',

    //             'Content-Type': 'application/json'

    //         }
    //     })
    getDataBySector(sector) {

        return axios.get(`${baseURL}/fetchDataBySector/` + sector);
    }
}

export default new AccountService();