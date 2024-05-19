// Set config defaults when creating the instance
import axios from 'axios';
export const baseURL = 'https://clourage.dev.misdc.com';
const instance = axios.create({
  baseURL: baseURL,
  //baseURL: 'https://api.example.com',
});
instance.defaults.headers.common['Auth-Type'] = 'casdoor';
// Alter defaults after instance has been created
/*instance.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlcnQtYnVpbHQtaW4iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiYzFhZmYzMDVjNWI2MmE2MWJjMzQiXSwiZGlzcGxheU5hbWUiOiLYudmE24wg2YLYs9in2YXbjCIsImV4cCI6MTcxNjA0MTk0NSwiaWF0IjoxNzE2MDM4MzQ1LCJpZCI6ImUzZmEyMWQ4LTc1ZDMtNDczYy1iMzRlLTU1ZjQ2OTJmYzUxZCIsImlzcyI6Imh0dHBzOi8vcG0uc3RnLm1pc2RjLmNvbSIsImp0aSI6ImFkbWluLzMwYmM0YzFjLWU5NWEtNGY0Yy1iY2RlLWQ2ZjQ5Njg3OGIyMyIsIm5iZiI6MTcxNjAzODM0NSwibm9uY2UiOiIiLCJvd25lciI6Im1haGRhYWQiLCJzY29wZSI6InJlYWQiLCJzdWIiOiJlM2ZhMjFkOC03NWQzLTQ3M2MtYjM0ZS01NWY0NjkyZmM1MWQiLCJ0YWciOiIiLCJ0b2tlblR5cGUiOiJhY2Nlc3MtdG9rZW4ifQ.x7pWfByVjB1K5ZHze3dLXy1Vu-PCsD9kc4OVGYEotZt2tfKj-O26RdTq79MCIMv6ys-aSILQUO5Mhc-JjwCGhcXXewHw6L68N6dUjbESQO6GKIT7UVGi216aKyTabwMVz3Ov9vLssIScW8UvUc9ikIIum_MzMXJJBob35GW7jvAV88fMzQiJg7itvZpbxeQKHEQcuAYO77868vVMs0HMXiPMqy_47OnGgG70huXC6-TsAwGlkW32c8r4tm6xrBqDfp-HYOPwV-GiG5W-4P_mrtEw2G2z780yIMSjMpDEfune3BRMIOuOW7blARpFo1QSpVpWtI0yVkQkjGIUAQNA5IydnuDi1Bf3dTl0cFl7T7WX02tnHnwxQLfRwavx3dVkZdo3wCiZdvnRUy2kGONtq-4ArvPBzGoXvATFks8v2DnxjLA45MJ9C2IwT2nRa2ZDT_aVMUtXaAoThzEyKOnmuWV9d-BhJoY3PKRwNECjwi9XSnXmyzMMmvTtM2h2hTvqh0qBSyhlSpos-5r_5fJejfm-ov8_LY_hR2niFsLj7DuoWsww_nh4NPCRMSxgK3xnA6n2ewnlPz3zhIuXUmebFh5Q6OXo3aKhk9BlrEyT5MjzaUTKDlWWCussllhKYWTIM_syzLy27I4n-iDLC1y6KwUvYDi9bEDYBu2qGE7a1NI';*/

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.headers) {
      const token = localStorage.getItem('upload_token');
      if (token) {
        //@ts-ignore
        config.headers['Authorization'] = token;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export async function uploadFile(file: Blob) {
  const formData = new FormData();
  formData.append('file', file);
  return instance.post('/v2/file/upload', formData, {
    onUploadProgress: progressEvent => {
      if (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
        );
        console.log('percentCompleted', percentCompleted);
      }
      // uploadProgress.value = percentCompleted;
      // uploadStatus.textContent = `Upload ${percentCompleted}% completed`;
      console.log('progressEvent', progressEvent);
    },
  });
}
