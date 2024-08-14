import secrets from './secret.json';

export const API_URL = secrets.REACT_APP_API_URL;
export const KAKAO_REDIRECT_URI = secrets.REACT_APP_KAKAO_REDIRECT_URI;
export const KAKAO_CLIENT_ID = secrets.REACT_APP_KAKAO_CLIENT_ID;


// k8s src/config.js
// export const API_URL = window.env.REACT_APP_API_URL;
// export const KAKAO_REDIRECT_URI = window.env.REACT_APP_KAKAO_REDIRECT_URI;
// export const KAKAO_CLIENT_ID = window.env.REACT_APP_KAKAO_CLIENT_ID;
