#!/bin/sh

# Create a temporary file for the replaced index.html
cp /usr/share/nginx/html/index.html /usr/share/nginx/html/index.temp.html

# Replace environment variable placeholders in index.html
envsubst '$$REACT_APP_API_URL $$REACT_APP_KAKAO_REDIRECT_URI $$REACT_APP_KAKAO_CLIENT_ID' < /usr/share/nginx/html/index.temp.html > /usr/share/nginx/html/index.html

# Remove the temporary file
rm /usr/share/nginx/html/index.temp.html

# Start Nginx in the foreground
exec nginx -g 'daemon off;'
