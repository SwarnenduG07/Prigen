FROM rust:1.76-slim-bookworm as builder

WORKDIR /usr/src/app
COPY . .

# Install build dependencies and sqlx-cli with specific version
RUN apt-get update && \
    apt-get install -y pkg-config libssl-dev && \
    cargo install sqlx-cli --version=0.7.1 --locked && \
    cargo build --release

FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y libssl3 ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    # Create assets directory and non-root user
    mkdir -p /app/assets && \
    useradd -m -u 1001 -U appuser && \
    chown -R appuser:appuser /app

# Copy the built binary and required files from builder
COPY --from=builder /usr/src/app/target/release/secureshare_backend /app/
COPY --from=builder /usr/src/app/.env /app/
COPY --from=builder /usr/src/app/migrations ./migrations
COPY --from=builder /usr/local/cargo/bin/sqlx /usr/local/bin/

# Switch to non-root user
USER appuser

EXPOSE 8000

# Command is now specified in docker-compose.yml