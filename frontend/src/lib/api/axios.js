/* eslint-disable no-undef */
import axios from 'axios'

export const fetchApi = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})
