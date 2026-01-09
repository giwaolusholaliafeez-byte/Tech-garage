#!/bin/bash
# Push to GitHub using Personal Access Token

cd /Users/omega/solana-web3-login

# Set remote URL
git remote set-url origin https://github.com/giwaolusholaliafeez-byte/Tech-garage.git

# Push using token (replace YOUR_TOKEN with your actual token)
git push https://giwaolusholaliafeez-byte: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@github.com/giwaolusholaliafeez-byte/Tech-garage.git main

echo "✅ Push complete!"

