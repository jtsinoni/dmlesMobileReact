import * as types from '../types'
import { ApiService } from '@lib/'
import { AppConfig } from '@constants/';

function getHeaders(getState, verb) {
   let headers = {
      'Authorization': `Token ${getState().oauth.token}`,
      'Accept': 'application/json',
      'ClientId': 'dmles',
      'X-SSL-Client-S-DN': `${AppConfig.clientDN}`
   }

   if (verb === 'POST') {
      headers["Content-Type"] = 'application/json';
   }
   return headers;
}

function getAPiService(service) {
   return new ApiService(service);
}

export function getBranchServices() {
   return (dispatch, getState) => {
      if (getState().system.loaded) {
         return Promise.resolve(true);
      }

      let service = getAPiService('System');
      let url = service.determineUrl('getServices');
      let headers = getHeaders(getState, 'GET');
      return service.get(url, headers)
         .then((response) => {
            dispatch(setBranchServices(response, true));

            return response;
         })
         .catch((error) => {
            dispatch(setBranchServices([], false));
            console.error(`Failed to retreive System Branch Services:\n\t ${error}`);
         });
   }
}

export function setBranchServices(branchRecords, loaded) {
   return {
      type: types.GET_BRANCH_SERVICES_RECORDS,
      branchRecords,
      loaded
   }
}