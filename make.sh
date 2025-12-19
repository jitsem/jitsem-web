#!/bin/sh
DIR="$(dirname "$0")"
TAILWIND_VERSION="v4.1.18"
TAILWIND_BINARY="$DIR/tailwindcss"

# Install Tailwind if not exists
if [ ! -f "$TAILWIND_BINARY" ]; then
    curl -L -o "$TAILWIND_BINARY" "https://github.com/tailwindlabs/tailwindcss/releases/download/$TAILWIND_VERSION/tailwindcss-linux-x64"
    chmod +x "$TAILWIND_BINARY"
fi

# Run cargo and copy resources
if cargo "$@"; then
    # Run Tailwind build
    "$TAILWIND_BINARY" -i "$DIR/styles.css" -o "$DIR/assets/site.css"

     mkdir -p "$DIR/target/debug/"
     mkdir -p "$DIR/target/release/"

     # Remove and copy assets to target directories
     rm -rf "$DIR/target/debug/assets"
     cp -r "$DIR/assets" "$DIR/target/debug/assets"

     rm -rf "$DIR/target/release/assets"
     cp -r "$DIR/assets" "$DIR/target/release/assets"
fi
