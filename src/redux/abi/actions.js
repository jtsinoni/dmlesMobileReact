import * as types from '../types'
import { ApiService } from '@lib/'
import { AppConfig } from '@constants/';

export function getABiCatalogRecords(searchValue) {
  return (dispatch, getState) => {
    dispatch(setABiCatalogRecords({records: [], loading: true}));

    let service = new ApiService('AbiCatalog');

    let url = service.determineUrl('getABiCatalogRecordESResults');
    let params = {'queryString': `${searchValue}`, 'filters': []};
    let token = getState().oauth.token;
    let headers = {
        'Authorization': `Token ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ClientId': 'dmles',
        'X-SSL-Client-S-DN': `${AppConfig.clientDN}` 
    }; 
    
    return service.post(url, params, headers)
        .then((resp) => {
            dispatch(setABiCatalogRecords({records: resp, loading: false}));
        })
        .catch((error) => {
            dispatch(setABiCatalogRecords({records: [], loading: false}));
            console.error(`Failed to retreive ABi records:\n\t ${error}`);
        });
  }
}

export function setABiCatalogRecords({ records, loading }) {
  return {
    type: types.GET_ABI_CATALOG_RECORDS,
    records,
    loading
  }
}