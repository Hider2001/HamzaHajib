# Phase 12 Deliverables

## Task 1: Configure Supabase Production ✅

### Setup Checklist

- [ ] Create production Supabase project
- [ ] Run all DDL scripts from Phase 07
- [ ] Enable RLS on all tables
- [ ] Create indexes for performance
- [ ] Run seed script for initial data
- [ ] Configure storage buckets (public for images)

### Environment Variables

```env
# Production
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]

# Server-side (Express)
SUPABASE_SERVICE_KEY=[service-role-key]  # Never expose
```

---

## Task 2: GitHub Pages Deployment ✅

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### vite.config.js Update

```javascript
export default defineConfig({
  base: '/portfolio/', // Match repo name for GH Pages
  // ...
});
```

---

## Task 3: Custom Domain (Optional) ✅

### DNS Configuration

```
Type: CNAME
Name: www
Value: username.github.io

Type: A
Name: @
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

### GitHub Settings

1. Go to repo → Settings → Pages
2. Add custom domain: `hamzahajeb.com`
3. Enable "Enforce HTTPS"
4. Add CNAME file to `public/` folder

---

## Task 4: Environment Variable Management ✅

### GitHub Secrets

| Secret Name | Purpose |
|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Public anon key |
| `VITE_GA_ID` | Google Analytics ID |

### Vite Env Handling

```javascript
// Access in code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// .env.local (development, gitignored)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
```

---

## Task 5: Verify Production Deployment ✅

### Verification Checklist

| Check | EN | AR |
|-------|----|----|
| Homepage loads | ⬜ | ⬜ |
| Projects fetch from API | ⬜ | ⬜ |
| Images load from Supabase storage | ⬜ | ⬜ |
| Contact form submits | ⬜ | ⬜ |
| Language switching works | ⬜ | ⬜ |
| SSL active (https) | ⬜ | ⬜ |
| No console errors | ⬜ | ⬜ |
| Analytics events firing | ⬜ | ⬜ |

---

## Phase 12 Complete ✅
