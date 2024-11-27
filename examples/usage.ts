import axios from 'axios';
import { LoginResponse, RefreshTokenResponse, ErrorResponse } from './types';

const BASE_URL = 'http://localhost:3000';

async function registerUser(email: string, password: string): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/auth/register`, { email, password });
    console.log('User registered successfully.');
  } catch (err: any) {
    const error: ErrorResponse = err.response?.data;
    console.error('Error registering user:', error?.message || err.message);
  }
}

async function loginUser(email: string, password: string): Promise<LoginResponse | undefined> {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, { email, password });
    console.log('Login successful. Access Token:', response.data.accessToken);
    console.log('Refresh Token:', response.data.refreshToken);
    return response.data;
  } catch (err: any) {
    const error: ErrorResponse = err.response?.data;
    console.error('Error logging in:', error?.message || err.message);
  }
}

async function fetchProtectedResource(accessToken: string, refreshToken: string): Promise<void> {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log('Protected resource:', response.data);
  } catch (err: any) {
    if (err.response?.status === 401) {
      console.log('Access token expired. Refreshing token...');
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        console.log('Retrying with new access token...');
        return fetchProtectedResource(newAccessToken, refreshToken);
      } else {
        console.error('Failed to refresh token.');
      }
    } else {
      console.error('Error fetching protected resource:', err.message);
    }
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string | undefined> {
  try {
    const response = await axios.post<RefreshTokenResponse>(`${BASE_URL}/auth/refresh-token`, { refreshToken });
    console.log('New Access Token:', response.data.accessToken);
    return response.data.accessToken;
  } catch (err: any) {
    const error: ErrorResponse = err.response?.data;
    console.error('Error refreshing token:', error?.message || err.message);
  }
}

// Usage Example
(async () => {
  const email = 'developer@example.com';
  const password = 'securepassword';

  await registerUser(email, password);

  const loginData = await loginUser(email, password);
  if (loginData) {
    const { accessToken, refreshToken } = loginData;
    await fetchProtectedResource(accessToken, refreshToken);
  }
})();
