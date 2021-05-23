#!/usr/bin/env bash
mkdir -p ~/.aws

cat > ~/.aws/credentials << EOL
[prod]
AWS_ACCESS_KEY_ID=$aws_access_key_id
AWS_SECRET_ACCESS_KEY=$aws_secret_access_key
EOL