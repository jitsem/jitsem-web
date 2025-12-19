# ---- build stage ----
FROM rust:1.92 AS builder
WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY templates ./templates
COPY assets ./assets
COPY styles.css ./styles.css
COPY make.sh ./make.sh

RUN sh make.sh build --release

# ---- runtime stage ----
FROM debian:trixie-slim
WORKDIR /app

COPY --from=builder /app/assets /app/assets
COPY --from=builder /app/target/release/jitsem_website /app/app

EXPOSE 8080
CMD ["/app/app"]
