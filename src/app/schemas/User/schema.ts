import dynamoose from '@config/database';
import { IUser } from '@interfaces/user';

export enum INDEXES {
  USER_TENANT_INDEX = 'UserTenantIndex',
  USER_EMAIL_INDEX = 'UserEmailIndex',
}

const schema = new dynamoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      hashKey: true,
    },
    tenant_id: {
      type: String,
      required: true,
      index: {
        name: INDEXES.USER_TENANT_INDEX,
        global: true,
        project: false,
      },
    },
    email: {
      type: String,
      required: true,
      index: {
        name: INDEXES.USER_EMAIL_INDEX,
        global: true,
        project: false,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default dynamoose.model<IUser>('Users', schema, {
  throughput: 'ON_DEMAND',
});
