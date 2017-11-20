import { Base64Service } from '@lib/'
import { AppConfig } from '@constants/';
import * as Common from '@redux/common/'
import * as types from '../types'

export function getTokenViaOAuth(dn) {
  return (dispatch, getState) => {
    let encodedDn = Base64Service.b64EncodeUnicode(`${dn}:${AppConfig.OAuth.password}`);
    let service = Common.getAPiService('OAuth');
    let url = service.determineUrl('token');
    let headers = Common.getHeaders(getState, 'POST', 'Basic', encodedDn);

    return service.post(url, null, headers)
        .then((resp) => {
            dispatch(setTokenViaOAuth({token: resp.authctoken}));
        })
        .catch((error) => {
            console.error(error);
        });
  }
}

export function setTokenViaOAuth({ token }) {
  return {
    type: types.SET_TOKEN_VIA_OAUTH,
    token,
  }
}
