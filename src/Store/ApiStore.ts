import axios, { AxiosResponse } from 'axios';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface SignUpDTO {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

export interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

interface SaveResponse {
  id: number;
  token: string;
}

const apiUrl = 'https://reqres.in';

export const login = async (credentials: LoginCredentials): Promise<string> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(`${apiUrl}/api/login`, credentials);
    return response.data.token;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const getUserList = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<{ data: User[] }> = await axios.get(`${apiUrl}/users`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch user list');
  }
};

export const saveUserDetails = async (data: LoginCredentials): Promise<SaveResponse> => {
    try {
      console.log(`dsfdsj::${data}`)
      const response: AxiosResponse<SaveResponse> = await axios.post<SaveResponse>(`${apiUrl}/api/register`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user list');
    }
  };