# Frontend Aesthetic Improvement Plan

## Forms & Inputs Redesign | Aligned with ANDA.com.uy Brand

---

## 📋 Design System Overview

Based on ANDA's professional brand (financial services) and modern form design principles:

### Color Palette

- **Primary:** `#0052CC` (Professional Blue - trust & authority)
- **Secondary:** `#6C757D` (Neutral Gray - supporting elements)
- **Success:** `#28A745` (Green - confirmations)
- **Error:** `#DC3545` (Red - validation errors)
- **Background:** `#F8F9FA` (Light Gray - page background)
- **Card Background:** `#FFFFFF` (White - form containers)
- **Text Primary:** `#212529` (Dark Gray - main text)
- **Text Secondary:** `#6C757D` (Medium Gray - helper text)
- **Border:** `#DEE2E6` (Light Border - input fields)

### Typography

- **Font Family:** `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` (modern, professional)
- **Headings (h1-h3):** Font weight 600-700, line-height 1.3
- **Body Text:** Font weight 400, line-height 1.5
- **Labels:** Font weight 500, size 14px
- **Helper Text:** Font weight 400, size 12px, color secondary

### Spacing System (8px base unit)

- `xs: 4px` (1px spacing)
- `sm: 8px` (1 unit)
- `md: 16px` (2 units)
- `lg: 24px` (3 units)
- `xl: 32px` (4 units)

### Border Radius

- Inputs & Buttons: `6px`
- Cards: `8px`
- Modals/Large:\*\* `12px`

---

## 🎯 Phase 1: Core Assets (Files to Create)

### 1.1 Create `src/front/styles/theme.css`

Define CSS custom properties (variables) for the entire design system:

- Colors (primary, secondary, success, error, warning, info)
- Typography scales (font sizes, weights)
- Spacing tokens
- Shadow utilities
- Breakpoints

**Example:**

```css
:root {
  /* Colors */
  --primary: #0052cc;
  --secondary: #6c757d;
  --success: #28a745;
  --error: #dc3545;
  --bg-page: #f8f9fa;
  --bg-card: #ffffff;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border: #dee2e6;

  /* Typography */
  --font-primary: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --fs-base: 16px;
  --fs-sm: 14px;
  --fs-xs: 12px;
  --fw-normal: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 24px rgba(0, 0, 0, 0.12);

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
}

/* Smooth scrolling & base styles */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  font-size: var(--fs-base);
  font-weight: var(--fw-normal);
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--bg-page);
}
```

### 1.2 Create `src/front/styles/forms.css`

Centralized form and input styling:

**Sections:**

- `.form-container` – Full-height centering wrapper
- `.form-card` – Card with shadow, padding, border-radius
- `.form-header` – Title/logo area
- `.form-body` – Field container area
- `.form-footer` – Actions area
- `.form-field` – Uniform field wrapper (label + input + helper text)
- `.form-input` – Standardized text/email/password fields
- `.form-label` – Consistent label styling
- `.form-helper-text` – Helper/error text below fields
- `.form-actions` – Button container (e.g., submit + links)
- `.form-link` – Links within forms (e.g., "Forgot password?")
- `.form-group` – Field grouping (e.g., radio/checkbox groups)

**Example structure:**

```css
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.form-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 420px;
  width: 100%;
  padding: var(--spacing-lg);
  animation: slideUpFade 0.5s ease-out;
}

.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
  gap: var(--spacing-xs);
}

.form-label {
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--text-primary);
}

.form-input {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--fs-base);
  font-family: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
}

.form-input:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Error state */
.form-field.has-error .form-input {
  border-color: var(--error);
}

.form-helper-text {
  font-size: var(--fs-xs);
  color: var(--text-secondary);
}

.form-helper-text.error {
  color: var(--error);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.form-link {
  color: var(--primary);
  text-decoration: none;
  font-size: var(--fs-sm);
  transition: color 0.2s;
}

.form-link:hover {
  color: #003d99;
  text-decoration: underline;
}

/* Animations */
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 576px) {
  .form-container {
    padding: var(--spacing-sm);
  }

  .form-card {
    padding: var(--spacing-md);
  }
}
```

### 1.3 Create `src/front/js/component/FormWrapper.js`

Reusable form container component with:

- Centered card layout
- Smooth fade/slide animation
- Responsive design
- Built-in submission handling
- Loading state for submit button

---

## 📄 Phase 2: Refactor Existing Components

### 2.1 Update `src/front/js/component/login.js`

- Remove custom `.login-form` styling
- Use `.form-container`, `.form-card`, `.form-field` classes
- Apply `.form-input` class to inputs
- Move logo to form header
- Update button to use Bootstrap `.btn-primary`

### 2.2 Update `src/front/js/component/register.js`

- Same refactoring as login
- Add helper text for password requirements
- Show validation errors inline using `.form-helper-text.error`

### 2.3 Update `src/front/js/component/recover_account1.js` & `recover_account2.js`

- Wrap in form container
- Consistent spacing and styling

### 2.4 Update `src/front/js/pages/TuPerfil.js` & `TuPerfilUser.js`

- Replace inline form styling
- Use `.form-field`, `.form-card`, `.form-actions`
- Add dividers between form sections if needed

---

## 🎨 Phase 3: Global Styling Updates

### 3.1 Update `src/front/styles/index.css`

- Import `theme.css` and `forms.css`
- Add responsive utilities (margins, paddings)
- Add accessibility utilities (sr-only, focus indicators)

### 3.2 Simplify `src/front/styles/login.css`

- Keep only animation-specific rules
- Remove duplicate button/card styles

---

## 🧪 Phase 4: Testing & Validation

### 4.1 Manual UI Testing

- **Desktop (1920px):** Form centered, no overflow
- **Tablet (768px):** Responsive resize
- **Mobile (375px):** Full-width, touch-friendly buttons

### 4.2 Accessibility Checklist

- [ ] All inputs have associated `<label>` elements
- [ ] Form submission accessible via Enter key
- [ ] Error messages linked to inputs using `aria-describedby`
- [ ] Focus states visible and logical
- [ ] Sufficient contrast ratios (WCAG AA minimum)

### 4.3 Browser Compatibility

- Test in Chrome, Firefox, Safari, Edge
- Verify CSS custom properties supported

---

## 📋 Component Checklist

| Component     | Current    | Refactored | Status            |
| ------------- | ---------- | ---------- | ----------------- |
| Login         | ❌ Custom  | ⏳ Pending | Use forms.css     |
| Register      | ❌ Inline  | ⏳ Pending | Add validation    |
| Recover 1     | ❌ Minimal | ⏳ Pending | Standardize       |
| Recover 2     | ❌ Minimal | ⏳ Pending | Standardize       |
| TuPerfil      | ❌ Inline  | ⏳ Pending | Use form sections |
| TuPerfilUser  | ❌ Inline  | ⏳ Pending | Use form sections |
| Global Styles | ⏳ Partial | ⏳ Pending | Import theme      |

---

## 🚀 Implementation Order

1. Create `theme.css` – Define design tokens
2. Create `forms.css` – Build reusable form styles
3. Create `FormWrapper.js` – Build reusable component
4. Refactor `login.js` – Test and validate
5. Refactor `register.js` – Build on foundation
6. Refactor recovery forms – Quick wins
7. Refactor profile pages – Complex sections
8. Update `index.css` – Global imports
9. Testing & refinement – Cross-browser

---

## 🎯 Success Criteria

✅ All forms visually consistent  
✅ Responsive on mobile/tablet/desktop  
✅ WCAG AA accessibility compliance  
✅ Smooth animations (fade/slide)  
✅ Professional appearance aligned with ANDA brand  
✅ Code DRY – no duplication  
✅ Semantic HTML & accessible inputs
