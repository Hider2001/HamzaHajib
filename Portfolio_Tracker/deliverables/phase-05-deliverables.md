# Phase 05 Deliverables

## Task 1: Motion Principles (Direction-Aware) ✅

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Purposeful** | Every animation serves UX, never decorative |
| **Subtle** | Enhance, don't distract—premium feel |
| **Consistent** | Same easing across similar interactions |
| **Direction-Aware** | Horizontal motion respects LTR/RTL |
| **Performant** | 60fps, GPU-accelerated properties only |

### Easing Curves

| Purpose | Easing | CSS/Framer |
|---------|--------|------------|
| Enter | `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| Exit | `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| Move | `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Bounce | Spring | `{ stiffness: 300, damping: 20 }` |

### Duration Scale

| Type | Duration | Use Case |
|------|----------|----------|
| Micro | 100-150ms | Button press, hover |
| Short | 200-300ms | Fade, small transforms |
| Medium | 400-500ms | Page transitions, reveals |
| Long | 600-800ms | Hero animations |

---

## Task 2: Button & Link Micro-Interactions ✅

### Primary Button

| State | Transform | Transition |
|-------|-----------|------------|
| Default | — | — |
| Hover | `scale(1.02)`, brighter bg | 200ms ease-out |
| Active/Press | `scale(0.98)` | 100ms |
| Focus | Ring outline | 150ms |
| Disabled | Opacity 0.5 | — |

```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="btn-primary"
>
  {children}
</motion.button>
```

### Text Links

| State | Effect | Transition |
|-------|--------|------------|
| Default | — | — |
| Hover | Underline slide-in from start | 300ms |
| Active | Color darken | 100ms |

```css
.link {
  position: relative;
}
.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  inset-inline-start: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.3s ease-out;
}
.link:hover::after {
  width: 100%;
}
```

---

## Task 3: Loading & Success Animations ✅

### Animation Library

| Name | Use Case | Duration | Type |
|------|----------|----------|------|
| **Spinner** | Form submit, data fetch | Loop | CSS |
| **Pulse** | Skeleton loading | Loop | CSS |
| **Checkmark** | Success confirmation | 500ms | SVG/CSS |
| **Fade Progress** | File upload | Variable | CSS |
| **Shake** | Error feedback | 400ms | CSS |

### Spinner

```css
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--color-surface);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Success Checkmark

```jsx
const CheckmarkAnimation = () => (
  <motion.svg viewBox="0 0 24 24" className="checkmark">
    <motion.path
      d="M5 13l4 4L19 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
  </motion.svg>
);
```

### Error Shake

```css
.shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}
```

---

## Task 4: Cursor & Pointer Effects ✅

### Custom Cursor (Desktop Only)

```jsx
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  
  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: pos.x - 16,
        y: pos.y - 16,
        scale: hovering ? 1.5 : 1
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
};
```

```css
.custom-cursor {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}

/* Disable on touch devices */
@media (hover: none) {
  .custom-cursor { display: none; }
}
```

### Graceful Degradation

- Touch devices: No custom cursor
- Reduced motion: Cursor follows without spring
- Low-powered devices: Disabled via `matchMedia`

---

## Task 5: Reduced Motion Fallbacks ✅

### Detection

```jsx
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  
  return reduced;
};
```

### Fallback Strategy

| Animation | Normal | Reduced Motion |
|-----------|--------|----------------|
| Scroll reveal | Slide + fade | Instant opacity |
| Card hover | Scale + lift | Opacity change only |
| Page transition | Slide | Cut (instant) |
| Loading spinner | Rotate | Static + pulse |
| Success check | Draw path | Instant appear |

### CSS Fallback

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Task 6: RTL Animation Variants ✅

### Variant Factory

```jsx
// utils/rtlMotion.js
export const createDirectionalVariants = (isRTL) => ({
  // Slide from reading-start side
  slideInStart: {
    hidden: { opacity: 0, x: isRTL ? 40 : -40 },
    visible: { opacity: 1, x: 0 }
  },
  
  // Slide from reading-end side
  slideInEnd: {
    hidden: { opacity: 0, x: isRTL ? -40 : 40 },
    visible: { opacity: 1, x: 0 }
  },
  
  // Vertical (same for both)
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  
  // Scale (same for both)
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }
});
```

### Usage

```jsx
const ProjectCard = ({ project }) => {
  const { isRTL } = useDirection();
  const variants = createDirectionalVariants(isRTL);
  
  return (
    <motion.div
      variants={variants.slideInStart}
      initial="hidden"
      whileInView="visible"
    >
      {/* Card content */}
    </motion.div>
  );
};
```

### Complete Variant Library

| Variant | LTR | RTL |
|---------|-----|-----|
| `slideInStart` | From left | From right |
| `slideInEnd` | From right | From left |
| `slideUp` | From bottom | From bottom |
| `slideDown` | From top | From top |
| `scaleIn` | Center | Center |
| `fadeIn` | In place | In place |

---

## Phase 05 Complete ✅

All 6 tasks have deliverables documented. Ready for Phase 06.
