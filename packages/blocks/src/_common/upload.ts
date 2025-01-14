// Set config defaults when creating the instance
import axios from 'axios';
//export const baseURL = window.$blockEditor ? window.$blockEditor.uploadURL : '' //'https://clourage.dev.misdc.com';

export function getBaseURLUpload() {
  return window.$blockEditor ? window.$blockEditor.uploadUrl : '';
}

export function getStorageURL() {
  return window.$blockEditor ? window.$blockEditor.storageUrl : '';
}

export function getApiToken() {
  return window.$blockEditor ? window.$blockEditor.apiToken : '';
}

const instance = axios.create({
  baseURL: getBaseURLUpload(),
  //baseURL: 'https://api.example.com',
});
//TODO ali ghasami for config in $blockEditor in window
instance.defaults.headers.common['Auth-Type'] = 'casdoor';

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.baseURL = getBaseURLUpload();
    if (config.headers) {
      const token = getApiToken(); //localStorage.getItem('upload_token');
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
  return instance.post('', formData, {
    /*onUploadProgress: progressEvent => {
      // uploadProgress.value = percentCompleted;
      // uploadStatus.textContent = `Upload ${percentCompleted}% completed`;
      //console.log('progressEvent', progressEvent);
    },*/
  });
}

declare global {
  interface Window {
    $blockEditor: {
      uploadUrl: string;
      storageUrl: string;
      apiToken: string;
      locale: 'fa' | 'en';
      files:{id:string,file:File}[]
      //i18n: never;
    };
  }
}
