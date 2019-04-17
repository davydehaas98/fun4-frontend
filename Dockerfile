# Get latest nginx image 
FROM nginx
# Set WORKDIR to root
WORKDIR .
# Copy build into nginx image
COPY ./dist /var/www/
# Copy nginx config file to default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Run server
# -g daemon off; is used so Docker can track the process properly,
# otherwise the container will stop immediately after starting
CMD ["nginx", "-g", "daemon off;"]