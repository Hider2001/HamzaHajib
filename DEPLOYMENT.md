# Deployment Guide

## Prerequisites

1. GitHub account
2. Supabase project configured

---

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name: `portfolio`
3. Visibility: **Public** (required for free GitHub Pages)
4. Create repository

---

## Step 2: Add GitHub Secrets

Go to **Settings → Secrets and variables → Actions → New repository secret**

### Secret 1
- **Name**: `VITE_SUPABASE_URL`  *(no backticks, just the text)*
- **Secret**: `https://uegqbitlasygvxbenlmd.supabase.co`

### Secret 2
- **Name**: `VITE_SUPABASE_ANON_KEY`  *(no backticks, just the text)*
- **Secret**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3FiaXRsYXN5Z3Z4YmVubG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTU5NjQsImV4cCI6MjA4NDIzMTk2NH0.O6Y_41IJL1fr-XB_bQcwa4lNgTKH4LWLP6m9qQleduc`

> ⚠️ **Important**: Type the secret name exactly as shown (no backticks, no spaces)

---

## Step 3: Push Code to GitHub

```bash
cd "d:\EnovaStudio\proficienal portofolio\portfolio"

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio deployment"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push
git push -u origin main
```

---

## Step 4: Enable GitHub Pages

1. Go to **Settings → Pages**
2. Source: **GitHub Actions**
3. The workflow will automatically run on push

---

## Your Site URL

After deployment, your site will be available at:

```
https://YOUR_USERNAME.github.io/portfolio/
```

---

## Verification

After deployment, verify:

- [ ] Site loads at your GitHub Pages URL
- [ ] Projects load from Supabase
- [ ] Contact form works
- [ ] Language switching works (EN ↔ AR)
- [ ] No console errors

---

## Troubleshooting

### Build fails
- Check GitHub Actions logs
- Ensure secrets are set correctly (exactly as shown above)

### Page shows 404
- Wait a few minutes after deployment
- Check if workflow completed successfully

### Supabase connection fails
- Verify secrets are correct in GitHub
- Check Supabase RLS policies allow public reads
