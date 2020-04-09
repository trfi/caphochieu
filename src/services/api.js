import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `https://204.44.81.17/`
    })
}