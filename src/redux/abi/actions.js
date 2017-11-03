import * as types from '../types'
import { ApiService } from '@lib/'
import { AppConfig } from '@constants/';

function getABiCatalogRecordsByQueryModel(queryModel, dispatchTo) {
  return (dispatch, getState) => {
    dispatch(dispatchTo({records: [], loading: true}));

    let service = new ApiService('AbiCatalog');

    let url = service.determineUrl('getABiCatalogRecordESResults');
    let params = queryModel;
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
            dispatch(dispatchTo({records: resp, loading: false}));
        })
        .catch((error) => {
            dispatch(dispatchTo({records: [], loading: false}));
            console.error(`Failed to retreive ABi records:\n\t ${error}`);
        });
  }  
}

function getQueryModel(field, value) {
  return {
    'queryString': '',
    'filters': [
      {
        'operator': 'or',
        'fieldValues': [
          {
            'field': `${field}`,
            'value': `${value}`
          }
        ]
      }
    ]
  }
}

export function getABiRelatedProducts(productGroup) {
  const queryModel = getQueryModel('productGroup', productGroup); 
  return getABiCatalogRecordsByQueryModel(queryModel, setABiRelatedProducts);
}

export function getABiEquivalentProducts(productSubstituteGroup) {
  const queryModel = getQueryModel('productSubstituteGroup', productSubstituteGroup); 
  return getABiCatalogRecordsByQueryModel(queryModel, setABiEquivalentProducts);
}

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

export function setABiEquivalentProducts({ records, loading }) {
  return {
    type: types.GET_ABI_EQUIVALENT_RECORDS,
    records,
    loading
  }
}

export function setABiRelatedProducts({ records, loading }) {
  return {
    type: types.GET_ABI_RELATED_PRODUCTS,
    records,
    loading
  }
}