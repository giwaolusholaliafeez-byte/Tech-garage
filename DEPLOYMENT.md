# Deployment Guide for Tech Garage

## 🚀 Deploy to GitHub

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `tech-garage` (or any name you prefer)
5. Set it to **Public** or **Private** (your choice)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Step 2: Push Your Code to GitHub

Run these commands in your terminal:

```bash
cd /Users/omega/solana-web3-login

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/tech-garage.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Note:** You may need to authenticate. GitHub will prompt you for credentials or use a personal access token.

---

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in (use GitHub to sign in for easier integration)

2. Click "Add New..." → "Project"

3. Import your GitHub repository:
   - Select the `tech-garage` repository you just created
   - Click "Import"

4. Vercel will auto-detect Next.js settings:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

5. Click "Deploy"

6. Wait for deployment (usually 1-2 minutes)

7. Your site will be live at: `https://tech-garage-xxxxx.vercel.app`

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd /Users/omega/solana-web3-login
vercel
```

3. Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

---

## 📝 Important Notes

### File Uploads
- **Local uploads won't work on Vercel** (serverless functions are read-only)
- For production, you'll need to use:
  - **Cloudinary** (recommended)
  - **AWS S3**
  - **Image URLs** (external hosting)

### Environment Variables
- Currently none required
- If you add image hosting services, add them in Vercel dashboard → Settings → Environment Variables

### Custom Domain
1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## ✅ Post-Deployment Checklist

- [ ] Test the homepage
- [ ] Test product browsing
- [ ] Test shopping cart
- [ ] Test checkout flow
- [ ] Test admin panel (if accessible)
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)

---

## 🔧 Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure TypeScript errors are resolved
- Check Vercel build logs

### Image Upload Not Working
- This is expected on Vercel (serverless limitation)
- Use external image hosting or Cloudinary integration

### Module Not Found
- Ensure all dependencies are installed
- Check `package.json` for missing packages

---

**Need Help?** Check Vercel's [Next.js documentation](https://vercel.com/docs/frameworks/nextjs)

