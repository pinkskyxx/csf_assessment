# Starting with this Linux server
FROM maven:3-eclipse-temurin-21 AS builder

## Build the application
# Create a directory call /app
# go into the directory cd /app
WORKDIR /app

# everything after this is in /app

# COPY server/mvnw .
# COPY server/mvnw.cmd .
# COPY server/pom.xml .
# COPY server/.mvn .mvn
# COPY server/src src

COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src

# Build the application
RUN mvn package -Dmaven.test.skip=true

FROM openjdk:21-jdk-bullseye

WORKDIR /app 

COPY --from=builder /app/target/ecommerce-0.0.1-SNAPSHOT.jar askhelp.jar

## Run the application
# Define environment variable 
ENV PORT=8080
ENV S3_KEY_ACCESS=
ENV S3_KEY_SECRET=
ENV S3_BUCKET_ENDPOINT=
ENV S3_BUCKET_REGION=
ENV SPRING_DATA_MONGODB_URI=${MONGODB_URL}
# Expose the port
EXPOSE ${PORT}

# Run the program
ENTRYPOINT SERVER_PORT=${PORT} java -jar askhelp.jar