import * as types from '../types'
import * as Common from '@redux/common/'

export function setSiteNamesFromBranchServices() {
   return (dispatch, getState) => {
      if (getState().system.sites.loaded) {
         return Promise.resolve(true);
      }
      if (getState().system.branch.loaded) {
         let branchServices = [...getState().system.branch.records];
         let sites = [];
         for (let branch of branchServices) {
            for (let region of branch.regions) {
               for (let site of region.sites) {
                  sites.push(site);
               }
            }
         }
         dispatch(setSiteNames(sites, true));
      }         
   }
}
   

export function getBranchServices() {
   return (dispatch, getState) => {
      if (getState().system.branch.loaded) {
         return Promise.resolve(true);
      }

      let service = Common.getAPiService('System');
      let url = service.determineUrl('getServices');
      let headers = Common.getHeaders(getState, 'GET');
      return service.get(url, headers)
         .then(response => dispatch(setBranchServices(response, true)))
         .then(response => response)
         .catch((error) => {
            dispatch(setBranchServices([], false));
            console.error(`Failed to retreive System Branch Services:\n\t ${error}`);
         });
   }
}

export function setBranchServices(records, loaded) {
   return {
      type: types.GET_BRANCH_SERVICES_RECORDS,
      records,
      loaded
   }
}

export function setSiteNames(records, loaded) {
   return {
      type: types.SET_SITES_FROM_BRANCH_SERVICES,
      records,
      loaded
   }
}