export class login {
  status: boolean;
  token: string;
  constructor(token: string, status: boolean) {
    this.status = status || false;
    this.token = token || '';
  }
}
