import { AppConfig, ApiConstants } from '@constants/';

export class ApiService  {
    constructor(managerName) {
        this.managerName = managerName;
        this.apiServiceName = "Api Service";
    }

    determineUrl(action) {
        let url = AppConfig.host;
        switch (this.managerName) {
            case "User":
                url += ApiConstants.USER_API + action;
                break;
            case "Role":
                url += ApiConstants.ROLE_API + action;
                break;
            case "EquipmentManagement":
                url += ApiConstants.EQUIPMENT_API + action;
                break;
            case "Site":
                url += ApiConstants.SITE_API + action;
                break;
            case "System":
                url += ApiConstants.SYSTEM_API + action;
                break;
            case "OAuth":
                url += ApiConstants.OAUTH_API + action;
                break;
            case "Inventory":
                url += ApiConstants.INVENTORY_API + action;
                break;
            case "AbiCatalog":
                url += ApiConstants.ABI_PRODUCTION_API + action;
                break;
            case "AbiSiteCatalog":
                url += ApiConstants.ABI_SITE_CATALOG_API + action;
                break;
            default:
                url += this.managerName + '/Api/' + action;
        }
        return url;
    };


    getTokenViaOAuth(action, encodedDn) {
        let url = this.determineUrl(action);
        console.debug(`${this.apiServiceName} - BT getToken URL: ${url}`);

        let headers = {
            'Authorization': `Basic ${encodedDn}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ClientId': 'dmles',
            'X-SSL-Client-S-DN': `${AppConfig.clientDN}` 
        };

        return this.post(url, null, headers);                   
    }

    get(url, headers) {
      return this.xhr(url, null, headers, 'GET');
    }
  
    put(url, params, headers) {
      return this.xhr(url, params, headers, 'PUT')
    }
  
    post(url, params, headers) {
      return this.xhr(url, params, headers, 'POST')
    }
  
    delete(url, params, headers) {
      return this.xhr(url, params, headers, 'DELETE')
    }
  
    xhr(url, params, headers, verb) {
      let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
      options.headers = headers;
      return fetch(url, options)
        .then((resp) => {
            let json = resp.json();
            if (resp.ok) {
                return json
            }
            return json.then(err => {throw err});
        })
        .then((json) => { 
            return json;
        });
    }
  }
