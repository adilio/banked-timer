# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 🚀 Quick Start

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Banked Timer"

# Create main branch
git branch -M main

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/banked-timer.git

# Push to GitHub
git push -u origin main
```

### 2. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**

That's it! The workflow will automatically trigger.

### 3. Update Base Path (Important!)

⚠️ **Before deploying, update the base path in `vite.config.js`:**

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/', // Replace with your actual repo name
})
```

For example, if your repo is `https://github.com/adil/my-timer`:
```javascript
base: '/my-timer/',
```

### 4. Commit and Push

```bash
git add vite.config.js
git commit -m "Configure base path for GitHub Pages"
git push
```

## 📍 Your Site URL

After successful deployment, your site will be available at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Example: `https://adil.github.io/banked-timer/`

## 🔄 How It Works

The GitHub Action (`.github/workflows/deploy.yml`) automatically:

1. **Triggers** on every push to `main` branch
2. **Installs** dependencies with `npm ci`
3. **Builds** the project with `npm run build`
4. **Deploys** the `dist/` folder to GitHub Pages

## 🛠️ Manual Deployment

You can manually trigger a deployment:

1. Go to the **Actions** tab in your repo
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select `main` branch
5. Click **Run workflow**

## 📊 Monitoring Deployments

- **Actions tab**: View build logs and deployment status
- **Environments**: Check deployment history under Settings → Environments → github-pages

## ✅ Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to `main` branch
- [ ] GitHub Pages source set to "GitHub Actions"
- [ ] `base` path in `vite.config.js` matches repo name
- [ ] Workflow has run successfully (check Actions tab)
- [ ] Site is accessible at the GitHub Pages URL

## 🐛 Troubleshooting

### Build Fails

**Check the Actions tab for error logs:**
```bash
# Common fixes:
npm install  # Ensure dependencies install locally
npm run build  # Test build locally first
```

### 404 Error on Assets

**Base path is wrong:**
- Update `vite.config.js` with correct repo name
- Commit and push changes

### Site Not Loading

**Wait a few minutes:**
- First deployment can take 2-5 minutes
- Check Actions tab for deployment status

### Permission Denied

**Enable workflow permissions:**
1. Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Save

## 🔐 Required Permissions

The workflow needs these permissions (already configured):
- `contents: read` - Read repository contents
- `pages: write` - Deploy to Pages
- `id-token: write` - OIDC token for deployment

## 📝 Customization

### Change Deployment Branch

Edit `.github/workflows/deploy.yml`:
```yaml
on:
  push:
    branches:
      - main  # Change to your preferred branch
```

### Deploy on Tag

```yaml
on:
  push:
    tags:
      - 'v*'  # Deploy when tags like v1.0.0 are pushed
```

### Add Preview Deployments

Create separate workflow for PRs to deploy to preview URLs.

## 🎉 Success!

Once deployed, your timer will be live and automatically update with every push to `main`!

Remember to update the start date and password in `src/App.jsx` as needed.
