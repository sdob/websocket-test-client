import axios from 'axios';

export async function login(email, password) {
  const url = 'https://staging.api.fallenlondon.com/api/login';
  const request = { email, password };
  const { data } = await axios.post(url, request);
  console.info(data);
  return data;
}