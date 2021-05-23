import { Document } from 'dynamoose/dist/Document';

interface IUser extends Document {
  tenant_id: string;
  user_id: string;
  email: string;
  password: string;
}

interface IUserCreate {
  tenant_id: string;
  user_id: string;
  email: string;
  password: string;
}

export { IUser, IUserCreate };
