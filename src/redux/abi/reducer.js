import * as types from '../types'

// Set initial state
const initialState = {
  siteCatalogRecords: [],  
  catalogRecords: {
    total: -1, 
    hits: { 
      fields: [] 
    }
  },
  relatedRecords: {
    total: -1, 
    hits: { 
      fields: [] 
    }
  },
  equivalentRecords: {
    total: -1, 
    hits: { 
      fields: [] 
    }
  },  
  loading: false,
  searchValue: null,
};

export default function abiReducer(state = initialState, action) {

  switch (action.type) {
    case types.GET_SITE_CATALOG_RECORDS : {
      return {
        ...state,
        siteCatalogRecords: action.siteCatalogRecords,
        loading: action.loading,
      };
    }    
    case types.GET_ABI_CATALOG_RECORDS : {
      return {
        ...state,
        catalogRecords: action.catalogRecords,
        loading: action.loading,
        searchValue: action.searchValue,
      };
    }
    case types.GET_ABI_EQUIVALENT_RECORDS : {
      return {
        ...state,
        equivalentRecords: action.equivalentRecords,
        loading: action.loading,
      };
    }
    case types.GET_ABI_RELATED_PRODUCTS : {
      return {
        ...state,
        relatedRecords: action.relatedRecords,
        loading: action.loading,
      };
    }        
    // ...other actions

    default :
      return state;
  }
}