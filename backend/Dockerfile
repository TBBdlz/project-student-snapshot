FROM python:alpine3.18

# Set working directory in the container
WORKDIR /src/app

# COPY requirements.txt to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the source code to the working directory
COPY app.py /src/app/

# Expose the port
EXPOSE 5000

CMD ["python", "app.py"]