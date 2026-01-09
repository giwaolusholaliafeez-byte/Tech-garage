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

### File Uploads with Cloudinary

1. **Sign up for Cloudinary** (free tier available):
   - Go to [cloudinary.com](https://cloudinary.com)
   - Create a free account
   - Go to Dashboard → Settings

2. **Get your credentials**:
   - Cloud Name
   - API Key
   - API Secret

3. **Set Environment Variables in Vercel**:
   - Go to your project → Settings → Environment Variables
   - **Option 1 (Recommended):** Add single variable:
     - `CLOUDINARY_URL` = `cloudinary://your_api_key:your_api_secret@your_cloud_name`
   - **Option 2:** Add three separate variables:
     - `CLOUDINARY_CLOUD_NAME` = your cloud name
     - `CLOUDINARY_API_KEY` = your API key
     - `CLOUDINARY_API_SECRET` = your API secret
   - Click "Save"

4. **For Local Development**:
   - Copy `.env.example` to `.env.local`
   - Fill in your Cloudinary credentials (use `CLOUDINARY_URL` format recommended)
   - Restart your dev server

### Environment Variables

**Option 1 (Recommended):**
- `CLOUDINARY_URL` - Single variable: `cloudinary://api_key:api_secret@cloud_name`

**Option 2:**
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

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

