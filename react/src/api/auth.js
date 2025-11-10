import { instance } from './axios';

export const registerMember = async (data) => {
  const response = await instance.post('/api/register/', data);
  return response.data;
};

export const loginMember = async (data) => {
  const response = await instance.post('/api/login/', data);
  return response.data;
};

export const getMemberProfile = async () => {
  const response = await instance.get('/api/profile/');
  return response.data;
};

export const updateMemberProfile = async (data) => {
  const response = await instance.put('/api/profile/update/', data);
  return response.data;
};
