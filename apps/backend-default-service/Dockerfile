# 1단계: 빌드
FROM gradle:8.5-jdk21 AS builder

# 빌드 시 인자로 받을 변수
ARG DB_URL
ARG DB_USERNAME
ARG DB_PASSWORD
ARG JWT_SECRET_KEY

# ARG로 받은 값을 ENV로 설정하여 런타임에 사용할 수 있도록 함
ENV DB_URL=${DB_URL}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}

# JVM 옵션 (환경변수로 받아서 실행)
ENV JAVA_OPTS="-Xms512m -Xmx1024m -XX:+UseG1GC"


WORKDIR /app
COPY . .
RUN gradle clean build -x test

# 2단계: 실행
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 7201

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]