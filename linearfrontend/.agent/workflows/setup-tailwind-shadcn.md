---
description: Setup Tailwind CSS v4 + shadcn/ui in Vite React TypeScript project
---

# Workflow: Tailwind CSS v4 + shadcn/ui Setup

Yeh workflow har naye Vite + React + TypeScript project mein Tailwind CSS v4 aur shadcn/ui setup karne ke liye use karo.

## Prerequisites

- Node.js installed ho
- Vite + React + TypeScript project already created ho
- `@types/node` package installed ho

---

## Step 1: Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

**Expected Output:**

- Packages successfully installed
- 0 vulnerabilities

---

## Step 2: Update vite.config.ts

`vite.config.ts` file mein Tailwind plugin add karo:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Changes:**

- Import `tailwindcss from '@tailwindcss/vite'`
- Add `tailwindcss()` to plugins array

---

## Step 3: Update src/index.css

`src/index.css` file ko replace karo with:

```css
@import 'tailwindcss';
```

**Note:** Yeh Tailwind v4 ka naya CSS-first approach hai. Config file ki zarurat nahi!

---

## Step 4: Verify TypeScript Path Aliases

`tsconfig.json` aur `tsconfig.app.json` mein check karo:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**If missing:** Add these settings to both files.

---

## Step 5: Initialize shadcn/ui

// turbo

```bash
npx shadcn@latest init
```

**Interactive Prompts:**

- **Which color would you like to use as base color?** → Press Enter for `Neutral`
- Other settings will be auto-detected

**Expected Output:**

- ✅ Validating Tailwind CSS config
- ✅ Verifying framework
- ✅ Writing components.json
- ✅ Updating CSS variables
- ✅ Installing dependencies
- ✅ Created src/lib/utils.ts

---

## Step 6: Install Test Component (Button)

// turbo

```bash
npx shadcn@latest add button
```

**Expected Output:**

- ✅ Created src/components/ui/button.tsx

---

## Step 7: Test the Setup

Update `src/App.tsx` with test UI:

```tsx
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-white">Tailwind CSS v4 + shadcn/ui</h1>
        <p className="text-xl text-slate-300">✅ Setup successful! 🎉</p>

        <div className="flex gap-4 justify-center">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  )
}

export default App
```

---

## Step 8: Start Dev Server

// turbo

```bash
npm run dev
```

**Expected Output:**

- ✅ Vite server starts successfully
- ✅ No build errors
- ✅ No TypeScript errors

---

## Step 9: Verify in Browser

1. Open browser: `http://localhost:5173/`
2. Check:
   - ✅ Gradient background visible
   - ✅ Title displayed correctly
   - ✅ All button variants render
   - ✅ Hover effects work
   - ✅ No console errors

---

## Step 10: Add More Components (Optional)

```bash
# List all available components
npx shadcn@latest add

# Add specific components
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add form
```

---

## Troubleshooting

### Issue: Import errors for @/components

**Solution:** Check path aliases in `tsconfig.json` and `vite.config.ts`

### Issue: Tailwind classes not working

**Solution:**

1. Verify `@import "tailwindcss";` in `src/index.css`
2. Check `tailwindcss()` plugin in `vite.config.ts`
3. Restart dev server

### Issue: shadcn init fails

**Solution:**

1. Ensure `@types/node` is installed
2. Verify Tailwind CSS is installed first
3. Check Node.js version (should be 18+)

---

## Files Created/Modified

**Created:**

- `components.json` - shadcn/ui config
- `src/lib/utils.ts` - Utility functions
- `src/components/ui/button.tsx` - Button component

**Modified:**

- `vite.config.ts` - Added Tailwind plugin
- `src/index.css` - Replaced with Tailwind import
- `package.json` - New dependencies added

---

## Success Checklist

- [ ] Tailwind CSS v4 installed
- [ ] Vite config updated with Tailwind plugin
- [ ] index.css has `@import "tailwindcss";`
- [ ] Path aliases configured
- [ ] shadcn/ui initialized
- [ ] components.json created
- [ ] src/lib/utils.ts created
- [ ] Button component installed
- [ ] Test UI created in App.tsx
- [ ] Dev server running without errors
- [ ] Browser shows correct UI

---

## Next Steps

1. **Customize theme:** Edit CSS variables in `src/index.css`
2. **Add components:** Use `npx shadcn@latest add [component]`
3. **Build for production:** Run `npm run build`

---

## Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Vite Documentation](https://vite.dev/)
