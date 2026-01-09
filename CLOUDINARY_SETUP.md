# Cloudinary Setup Guide

## Why Cloudinary?

Cloudinary provides:
- ✅ Image hosting and CDN
- ✅ Automatic image optimization
- ✅ Responsive image delivery
- ✅ Works perfectly with Vercel
- ✅ Free tier: 25GB storage, 25GB bandwidth/month

## Step-by-Step Setup

### 1. Create Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Click "Sign Up" (free)
3. Fill in your details
4. Verify your email

### 2. Get Your Credentials

1. After logging in, go to **Dashboard**
2. You'll see your account details:
   - **Cloud Name** (e.g., `dxyz1234`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Reveal" to see it)

### 3. Local Development Setup

1. In your project root, create `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your credentials:

**Option 1: Using CLOUDINARY_URL (recommended):**
```env
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
```

**Option 2: Using individual variables:**
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

3. Restart your dev server:
```bash
npm run dev
```

### 4. Vercel Deployment Setup

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add environment variable(s):

   **Option 1: Using CLOUDINARY_URL (recommended - single variable):**
   | Name | Value |
   |------|-------|
   | `CLOUDINARY_URL` | `cloudinary://your_api_key:your_api_secret@your_cloud_name` |

   **Option 2: Using individual variables:**
   | Name | Value |
   |------|-------|
   | `CLOUDINARY_CLOUD_NAME` | Your cloud name |
   | `CLOUDINARY_API_KEY` | Your API key |
   | `CLOUDINARY_API_SECRET` | Your API secret |

4. Click **Save**
5. Redeploy your project (or it will auto-deploy on next push)

### 5. Test Image Upload

1. Go to `/admin` page
2. Click "Add Product"
3. Click "Choose File" and select an image
4. The image should upload and appear in the preview
5. Save the product

## Features

- **Automatic Optimization**: Images are automatically optimized for web
- **Responsive Images**: Cloudinary serves the right size for each device
- **CDN**: Fast global delivery
- **Transformations**: Images are resized to max 1000x1000px automatically

## Troubleshooting

### "Cloudinary not configured" error
- Check that `.env.local` exists and has correct values
- Restart your dev server after adding env variables
- In Vercel, ensure environment variables are set correctly

### Upload fails
- Check file size (max 10MB)
- Ensure file is an image (jpg, png, gif, webp)
- Check Cloudinary dashboard for any account limits

### Images not showing
- Check browser console for errors
- Verify the URL returned from upload API
- Check Cloudinary dashboard → Media Library to see uploaded images

## Free Tier Limits

- **Storage**: 25GB
- **Bandwidth**: 25GB/month
- **Transformations**: Unlimited
- **Uploads**: Unlimited

Perfect for small to medium stores! 🚀

