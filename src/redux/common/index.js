import { ApiService } from '@lib/'
import { AppConfig } from '@constants/';

export function getHeaders(getState, verb, authType='Token', authTypeValue) {
   if(!authTypeValue) {
      authTypeValue = getState().oauth.token;
   }

   let headers = {
     'Authorization': `${authType} ${authTypeValue}`,
     'Accept': 'application/json',
     'ClientId': 'dmles',
     'X-SSL-Client-S-DN': `${AppConfig.clientDN}`
   }
 
   if(verb === 'POST') {
     headers["Content-Type"] = 'application/json';
   }
   return headers;
 }
 
 export function getAPiService(service) {
   return new ApiService(service);
 }