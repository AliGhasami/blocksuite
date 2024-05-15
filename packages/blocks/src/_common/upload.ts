// Set config defaults when creating the instance
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://clourage.dev.misdc.com/v2/file/upload',
  //baseURL: 'https://api.example.com',
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlcnQtYnVpbHQtaW4iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiYzFhZmYzMDVjNWI2MmE2MWJjMzQiXSwiZGlzcGxheU5hbWUiOiLYudmE24wg2YLYs9in2YXbjCIsImV4cCI6MTcxNTc4MjU4OCwiaWF0IjoxNzE1Nzc4OTg4LCJpZCI6ImUzZmEyMWQ4LTc1ZDMtNDczYy1iMzRlLTU1ZjQ2OTJmYzUxZCIsImlzcyI6Imh0dHBzOi8vcG0uc3RnLm1pc2RjLmNvbSIsImp0aSI6ImFkbWluL2U5YmVlYzY1LTMxYTMtNDg1Yy05NGQxLTE3MmFiOTFiNDM0NyIsIm5iZiI6MTcxNTc3ODk4OCwibm9uY2UiOiIiLCJvd25lciI6Im1haGRhYWQiLCJzY29wZSI6InByb2ZpbGUiLCJzdWIiOiJlM2ZhMjFkOC03NWQzLTQ3M2MtYjM0ZS01NWY0NjkyZmM1MWQiLCJ0YWciOiIiLCJ0b2tlblR5cGUiOiJhY2Nlc3MtdG9rZW4ifQ.XFkGHW_p_S2AiGddGb5TzaSf6IOJ5O_YDq8ffZ1ZJPKUNZEx3ZgQK5-EZ5-P4EfffseAb7Dx7rxjUp07Ja6JIumDsmxnyw-d6v3deWCscPnDvxC-HKU--ybBIuj0p5XHiuTS0NQqfnlDCtn-tYYQhamhQ8-amUSOd9dO1jRwtt5aFhl-fv-GceBU6ybxcz7fs8KHg19JuirgZgRTF-pb8TL3aMyCbRxgMwbRomJT0yeeb4MnxipdfKWhN1ihdiU_mIsrrFfetwK1vsskaVu4YHy-wSJmRGdu9lG3K5NGZi97ltUTQ18Uk5iPovd42gi36_tZt71kNxOX9oQZMxcuC0GdFmHp7sW8vu3-x1xtrlVPlAK0vQq4IBpGyeH5WXDTfKSWgp6XpdNSMbJxNBwKUIJyas9WovkkoJPne5FJgK7S0BhgEX7nwUjGUKzZZwjMg_Gk6L1ZmqRKPANqAMvyB_oHuBl_j0UJOXY5AspBlQBG8a1H9KgPQ3GGwNMj81ooBZmvME2700VAEc0WVvXl6wxGzuIT2FBeuvuh8zGmmlgzxQwKBNDeI9iWScrFBr1fiaykluKIpLSs56if9V6ejAKiRgLniqcTslHuFMY7N4CDjUGu6C9Uga7wvAbXDKOg3oKJgGyNf7-wFEbFgaaBF1dZkHzWogRlV-mgk1873KU';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
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
