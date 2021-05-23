#!/usr/bin/env bash
mkdir -p ~/.aws

cat > ~/.aws/credentials << EOL
[prod]
aws_access_key_id=$aws_access_key_id
aws_secret_access_key=$aws_secret_access_key
EOL