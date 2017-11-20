import * as types from '../types'
import * as Common from '@redux/common/'

function setSiteNames(response, getState) {
  let siteCatalogItems = [...response];
  let siteItems = [...getState().system.sites.records];

  for (let item of siteCatalogItems) {
     if (item.sources && item.sources[0]) {
        item.primarySupplier = item.sources[0].supplierNm;
        if (item.sources[0].packaging && item.sources[0].packaging[0]) {
           item.primarySourcePackCode = item.sources[0].packaging[0].ipPackCd
           item.primarySourcePackQuantity = item.sources[0].packaging[0].ipPackQty;
           item.primarySourcePrice = item.sources[0].packaging[0].packPriceAmt;
        }
     }
     let site = siteItems.find((t) => t.dodaac === item.siteDodaac)
     if (site) {
        item.siteName = site.name;
     }

  }
  return siteCatalogItems;
}

function getSiteCatalogRecordsByType(item, dispatchTo) {
  return (dispatch, getState) => {
    dispatch(dispatchTo({ records: [], loading: true }));

    let action = null;
    let hasProductIdentifier = (item.mmcProductIdentifier != null);
    if(hasProductIdentifier) {
      action = `getSiteCatalogByProductId?productSeqId=${item.mmcProductIdentifier}`;
    } else {
      action = `getSiteCatalogByEnterpriseId?enterpriseProductIdentifier=${item.enterpriseProductIdentifier}`;
    }

    let service = Common.getAPiService('AbiSiteCatalog');
    let url = service.determineUrl(action);
    let headers = Common.getHeaders(getState, 'GET');

    return service.get(url, headers)
      .then(resp => setSiteNames(resp, getState))
      .then(resp => dispatch(dispatchTo({ records: resp, loading: false })))
      .catch((error) => {
        dispatch(dispatchTo({ records: [], loading: false }));
        console.error(`Failed to retreive ABi catalog records:\n\t ${error}`);
      });
  }
}

function getABiCatalogRecordsByQueryModel(queryModel, dispatchTo) {
  return (dispatch, getState) => {
    let searchValue = queryModel['queryString'];
    dispatch(dispatchTo({ records: [], loading: true, searchValue: searchValue }));

    let service = Common.getAPiService('AbiCatalog');
    let url = service.determineUrl('getABiCatalogRecordESResults');
    let params = queryModel;
    let headers = Common.getHeaders(getState, 'POST');

    return service.post(url, params, headers)
      .then((resp) => {
        dispatch(dispatchTo({ records: resp, loading: false, searchValue: searchValue }));
      })
      .catch((error) => {
        dispatch(dispatchTo({ records: [], loading: false, searchValue: searchValue }));
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

function getSearchQueryModel(searchValue) {
  return { 'queryString': `${searchValue}`, 'filters': [] };
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
  const queryModel = getSearchQueryModel(searchValue);
  return getABiCatalogRecordsByQueryModel(queryModel, setABiCatalogRecords);
}

export function getSiteCatalogRecords(item) {
  return getSiteCatalogRecordsByType(item, setSiteCatalogRecords);
}

export function setSiteCatalogRecords(params) {
  let { records: siteCatalogRecords, loading } = params;
  return {
    type: types.GET_SITE_CATALOG_RECORDS,
    siteCatalogRecords,
    loading
  }
}

export function setABiCatalogRecords(params) {
  let { records: catalogRecords, loading, searchValue } = params;
  return {
    type: types.GET_ABI_CATALOG_RECORDS,
    catalogRecords,
    loading,
    searchValue,
  }
}

export function setABiEquivalentProducts(params) {
  let { records: equivalentRecords, loading } = params;
  return {
    type: types.GET_ABI_EQUIVALENT_RECORDS,
    equivalentRecords,
    loading
  }
}

export function setABiRelatedProducts(params) {
  let { records: relatedRecords, loading } = params;
  return {
    type: types.GET_ABI_RELATED_PRODUCTS,
    relatedRecords,
    loading
  }
}