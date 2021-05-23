interface ITokenData {
  user_id: string;
  tenant_id: string;
  email: string;
}

declare namespace Express {
  interface Request {
    tokenData: ITokenData;
  }
}
