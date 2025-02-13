# MBTA Schedule Viewer

A React-based MBTA schedule viewer that provides comprehensive commuter rail time information with full daily schedule coverage.

## Deployment Instructions

1. Create a new repository on GitHub
2. Push this code to your repository:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

3. Go to your repository's Settings > Pages
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - You don't need to select a branch as we're using GitHub Actions

The app will be automatically deployed when you push to the main branch. The first deployment will start automatically after pushing the code.

## Development

To run locally:
```bash
npm install
npm run dev
```

The app will be available at http://localhost:5000
