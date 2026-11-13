# Build a minimal, static Nginx site with Alpine.
FROM nginx:alpine

# Remove the default Nginx page so our site is served at the root.
RUN rm -rf /usr/share/nginx/html/* || true

# Copy the whole project into the Nginx document root.
COPY . /usr/share/nginx/html

# Nginx runs as non-root user "nginx" in the official Alpine image.
# Port 80 is the default for HTTP; expose it to the host via compose.
EXPOSE 80

# Start Nginx in the foreground (keeps the container alive).
CMD ["nginx", "-g", "daemon off;"]
