import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  tokenKey: string = 'token';

  constructor(private localStorageService:LocalStorageService) { }

  setToken(token: string) {
    this.localStorageService.set(this.tokenKey, token)
  }

  getToken() {
    return this.localStorageService.get(this.tokenKey)
  }

  getDecodeToken() {
    const token = this.getToken()
    if(!token) return null
    return jwt_decode(token)
  }

  isTokenExpired(token: any): boolean {
    const expiryTime: number = token.exp;
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
  }

  generateNewToken() {

  }

  removeToken() {
    this.localStorageService.remove(this.tokenKey)
  }
}
