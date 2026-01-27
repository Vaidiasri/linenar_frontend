---
description: Setup Prettier and ESLint with Flat Config in Vite React TypeScript project
---

# Workflow: Setup Prettier & Linting

Yeh workflow har project mein consistent code formatting aur linting safety ensure karne ke liye use karo.

## Prerequisites

- Node.js installed
- Vite + React + TypeScript project
- `eslint.config.js` (Flat Config) should exist

---

## Step 1: Install Dependencies

// turbo

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

---

## Step 2: Create .prettierrc configuration

Create a `.prettierrc` file in the root directory:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

## Step 3: Update ESLint Configuration

Update `eslint.config.js` to include Prettier integration and handle React Refresh for shadcn/ui components.

**Imports:**

```javascript
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
```

**Config Object:**
Add `eslintPluginPrettierRecommended` to the `extends` array and configure rules.

```javascript
export default defineConfig([
  // ... other configs
  {
    // ...
    extends: [
      // ... other extends
      eslintPluginPrettierRecommended,
    ],
    rules: {
      // Allow constant exports for shadcn/ui components (like buttonVariants)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])
```

---

## Step 4: Add Scripts

Add these scripts to `package.json`:

```json
"scripts": {
  "format": "prettier --write ."
}
```

---

## Step 5: Verify Setup

// turbo

```bash
npm run format
npm run lint
```

**Success Criteria:**

- `npm run format` formats files without error.
- `npm run lint` passes (warnings are okay/expected for specific cases).

---

## Troubleshooting

### Lint Error: Fast refresh only works when a file only exports components

**Solution:**
Ensure you added the rule override in `eslint.config.js`:

```javascript
'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
```
