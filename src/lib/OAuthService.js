import { Base64Service, ApiService } from '@lib/';
import { AppConfig } from '@constants/';

// export default class OAuthService extends ApiService {
export class OAuthService {    
    constructor() {
        this.serviceName = 'OAuth Service';
        console.debug(`${this.serviceName} - Start`);
    }

    // getTokenViaOAuth(dn) {
    //     let encodedDn = this.Base64Service.b64EncodeUnicode(`${dn}:${AppConfig.OAuth.password}`);


    //     return ApiService.getTokenViaOAuth("token", encodedDn);
    // }
    // public isTokenExpired(token: string): boolean {
    //     return this.jwtService.isTokenExpired(token);
    // }

    // public getToken(dn): Observable<any> {
    //     return Observable.fromPromise(
    //         this.authenticationService.getToken()
    //             .then((token) => {
    //                 return token;
    //             })
    //             .catch((error) => {
    //                 this.log.error(`${this.serviceName} => ${error}`)
    //             })
    //         )
    //         .flatMap((token) => {
    //             if(token) {
    //                 this.log.debug(`${this.serviceName} - Token found locally`);
    //                 if(this.jwtService.isTokenExpired(token)) {
    //                     this.log.debug(`Token expired => ${this.jwtService.getTokenExpirationDate(token)}`);
    //                     return this.getNewToken(dn);
    //                 } else {
    //                     return Observable.of(token);
    //                 }
    //             } else {
    //                 this.log.debug(`${this.serviceName} - Token not found locally`);
    //                 return this.getNewToken(dn);
    //             }
    //         });
    // }

    // private getNewToken(dn): Observable<any> {
    //     return this.apiGetToken(dn)
    //         .map((data) => {
    //             if(data) {
    //                 let results:any =  this.utilService.getPayload(data);
    //                 let authctoken: string = results.authctoken;

    //                 this.log.debug(`Results => ${authctoken}`);

    //                 // FIX: The below method is promise based, we are treating this as sequential which is incorrect
    //                 this.authenticationService.saveToken(authctoken);

    //                 this.log.debug(`${this.serviceName} - New token received and saved`);
    //                 return authctoken;

    //             } else {
    //                 return null;
    //             }
    //         });
    // }

}
