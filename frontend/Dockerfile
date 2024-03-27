FROM nginx:1.25.4

WORKDIR /usr/share/nginx/html

COPY index.html .
COPY index.js .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]