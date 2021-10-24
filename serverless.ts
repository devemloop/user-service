/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'user-service',
  useDotenv: true,
  variablesResolutionMode: '20210326',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    customDomain: {
      domainName: '${env:API_DOMAIN}',
      stage: '${env:STAGE}',
      basePath: 'users',
      createRoute53Record: false,
      // certificateArn: '${env:DOMAIN_CERT, ""}',
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-dotenv-plugin',
    'serverless-domain-manager',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    memorySize: 128,
    region: 'us-east-1',
    lambdaHashingVersion: '20201221',
    deploymentBucket: 'lambda-serverless-deployment-bucket-7rpp414mb8',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: [
        {
          name: 'UserServiceAPIKey',
          value: 'lXw2RwV6JYVAGyKbRLILSQ1KhvPRxB9l8Q1BdNToL7CexLzM',
          description: 'Chave de acesso as APIs privadas',
        },
      ],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    api: {
      handler: 'src/server.handler',
      role: 'LambdaRole',
      timeout: 30,
      events: [
        {
          http: {
            method: 'post',
            path: 'master/create',
            private: true,
          },
        },
        {
          http: {
            method: 'post',
            path: 'create',
            cors: {
              origin: '*',
              maxAge: 86400,
            }
          },
        },
        {
          http: {
            method: 'post',
            path: 'login',
            cors: {
              origin: '*',
              maxAge: 86400,
            }
          },
        },
        {
          http: {
            method: 'get',
            path: 'me',
            cors: {
              origin: '*',
              maxAge: 86400,
            }
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      LambdaRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: 'UserService',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: {
              Effect: 'Allow',
              Principal: {
                Service: ['lambda.amazonaws.com'],
              },
              Action: 'sts:AssumeRole',
            },
          },
          Policies: [
            {
              PolicyName: 'user-service',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: [
                      'logs:createLogGroup',
                      'logs:createLogStream',
                      'logs:putLogEvents',
                    ],
                    Resource: 'arn:aws:logs:${self:provider.region}:*:*:*:*',
                  },
                  {
                    Effect: 'Allow',
                    Action: [
                      'dynamodb:GetItem',
                      'dynamodb:PutItem',
                      'dynamodb:Scan',
                      'dynamodb:UpdateItem',
                      'dynamodb:CreateTable',
                      'dynamodb:DescribeTable',
                      'dynamodb:DeleteItem',
                      'dynamodb:Query',
                      'dynamodb:Scan',
                    ],
                    Resource: [
                      'arn:aws:dynamodb:${self:provider.region}:*:table/Users',
                      'arn:aws:dynamodb:${self:provider.region}:*:table/Users/index/*',
                    ],
                  },
                  {
                    Effect: 'Allow',
                    Action: [
                      'dynamodb:GetItem',
                      'dynamodb:CreateTable',
                      'dynamodb:DescribeTable',
                    ],
                    Resource: [
                      'arn:aws:dynamodb:${self:provider.region}:*:table/Tenants',
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
