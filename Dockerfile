FROM nginx:alpine

# Set the working directory
WORKDIR /app

# Copy app files
COPY . /app

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
