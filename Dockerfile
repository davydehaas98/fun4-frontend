# Get latest nginx image 
FROM nginx
# Set WORKDIR to root
WORKDIR .
# Copy build into nginx image
COPY ./dist /var/www/
# Copy nginx config file to default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf