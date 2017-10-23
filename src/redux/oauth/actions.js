import * as types from '../types'
import { OAuthService, Base64Service, ApiService } from '@lib/'
import { AppConfig } from '@constants/';

export function getTokenViaOAuth(dn) {
  return (dispatch, getState) => {
    let encodedDn = Base64Service.b64EncodeUnicode(`${dn}:${AppConfig.OAuth.password}`);
    let service = new ApiService('OAuth');
    return service.getTokenViaOAuth("token", encodedDn)
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
