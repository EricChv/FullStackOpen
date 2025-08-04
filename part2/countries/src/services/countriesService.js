// services/countriesService.js
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return axios.get(`${baseUrl}/all`).then(res => res.data)
}

const getByName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`).then(res => res.data)
}

export default { getAll, getByName }