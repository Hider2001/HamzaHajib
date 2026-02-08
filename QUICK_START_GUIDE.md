# 🚀 Quick Start Guide - World-Class UI/UX

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🎨 Using New Components

### Toast Notifications

**Step 1:** Wrap your app with ToastProvider (already done in App.tsx)
```tsx
import { ToastProvider } from '@/components/ui/Toast';

<ToastProvider>
  <YourApp />
</ToastProvider>
```

**Step 2:** Use the hook in any component
```tsx
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleSuccess = () => {
    showToast('Operation successful!', 'success');
  };
  
  const handleError = () => {
    showToast('Something went wrong', 'error');
  };
  
  return (
    <button onClick={handleSuccess}>Show Success</button>
  );
}
```

---

### Button Component

**Import:**
```tsx
import { Button } from '@/components/ui/Button';
```

**Basic Usage:**
```tsx
<Button>Click Me</Button>
```

**With Variants:**
```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="gradient">Gradient ✨</Button>
```

**With Sizes:**
```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

**With Loading State:**
```tsx
<Button loading={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

**With Icons:**
```tsx
<Button 
  icon={<YourIcon />} 
  iconPosition="left"
>
  With Icon
</Button>
```

**Full Width:**
```tsx
<Button fullWidth>Full Width Button</Button>
```

---

### Animated Counter

**Import:**
```tsx
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
```

**Usage:**
```tsx
<AnimatedCounter 
  end={100} 
  suffix="+" 
  duration={2}
  className="text-4xl font-bold"
/>
```

**Examples:**
```tsx
// Projects completed
<AnimatedCounter end={50} suffix="+" />

// Years of experience
<AnimatedCounter end={8} suffix=" Years" />

// Percentage
<AnimatedCounter end={100} suffix="%" />

// With prefix
<AnimatedCounter end={1000} prefix="$" />
```

---

### Theme Toggle

**Import:**
```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle';
```

**Usage:**
```tsx
<ThemeToggle />
```

That's it! The component handles:
- System preference detection
- Manual toggle
- LocalStorage persistence
- Smooth transitions

---

### Gradient Blobs

**Import:**
```tsx
import { GradientBlob } from '@/components/ui/GradientBlob';
```

**Usage:**
```tsx
<GradientBlob 
  color="#38BDF8" 
  size="lg" 
  animate={true}
  className="absolute top-20 left-10"
/>
```

**Sizes:** `sm`, `md`, `lg`, `xl`

**Example Background:**
```tsx
<div className="relative">
  <GradientBlob className="absolute top-0 left-0" color="#38BDF8" />
  <GradientBlob className="absolute bottom-0 right-0" color="#6366f1" />
  <YourContent />
</div>
```

---

### Back to Top Button

**Import:**
```tsx
import { BackToTop } from '@/components/ui/BackToTop';
```

**Usage:**
```tsx
<BackToTop />
```

Automatically shows after scrolling 500px down!

---

### Custom Cursor

**Import:**
```tsx
import { CursorFollower } from '@/components/ui/CursorFollower';
```

**Usage:**
```tsx
<CursorFollower />
```

Automatically:
- Only shows on desktop
- Follows mouse movement
- Grows on hover over links/buttons
- Uses mix-blend-mode for effect

---

## 🌙 Dark Mode

### Automatic Setup
Dark mode is automatically configured! It:
1. Detects system preference on first load
2. Allows manual toggle via ThemeToggle component
3. Persists choice in localStorage
4. Applies to all components

### Using Dark Mode Classes
```tsx
<div className="bg-white dark:bg-[#0F172A]">
  <h1 className="text-[#0A2540] dark:text-white">
    Hello World
  </h1>
</div>
```

### CSS Variables
```css
/* Automatically switch based on theme */
.my-element {
  background-color: var(--color-background);
  color: var(--color-text);
}
```

---

## ✨ Animation Patterns

### Reveal on Scroll
```tsx
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

<RevealOnScroll direction="up" delay={0.2}>
  <YourContent />
</RevealOnScroll>
```

**Directions:** `up`, `down`, `left`, `right`, `scale`

### Framer Motion Basics
```tsx
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="your-classes"
>
  Interactive Element
</motion.div>
```

### Common Patterns
```tsx
// Hover lift
<motion.div whileHover={{ y: -8 }}>

// Scale on hover
<motion.div whileHover={{ scale: 1.1 }}>

// Rotate on hover
<motion.div whileHover={{ rotate: 5 }}>

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
```

---

## 🎨 Styling Tips

### Gradient Text
```tsx
<h1 className="bg-gradient-to-r from-[#0A2540] to-[#38BDF8] bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### Glassmorphism
```tsx
<div className="glass">
  Content with glass effect
</div>
```

### Custom Shadows
```tsx
<div className="shadow-lg hover:shadow-2xl transition-shadow">
  Elevated Card
</div>
```

---

## 📱 Responsive Design

### Breakpoints
```tsx
<div className="
  px-4           // Mobile
  md:px-6        // Tablet
  lg:px-8        // Desktop
">
```

### Grid Layouts
```tsx
<div className="
  grid 
  grid-cols-1      // Mobile: 1 column
  md:grid-cols-2   // Tablet: 2 columns
  lg:grid-cols-3   // Desktop: 3 columns
  gap-8
">
```

---

## ♿ Accessibility

### Focus States
```tsx
<button className="
  focus-visible:ring-4 
  focus-visible:ring-[#38BDF8]/30
">
```

### ARIA Labels
```tsx
<button aria-label="Close menu">
  <CloseIcon />
</button>
```

### Skip Link (already implemented)
```tsx
<SkipLink />
```

---

## 🚀 Performance Tips

### Lazy Loading
```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSkeleton />}>
  <HeavyComponent />
</Suspense>
```

### Viewport Detection
```tsx
import { useInView } from 'framer-motion';

const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<div ref={ref}>
  {isInView && <ExpensiveComponent />}
</div>
```

---

## 🎯 Best Practices

### 1. Use Semantic HTML
```tsx
<header>, <nav>, <main>, <section>, <article>, <footer>
```

### 2. Consistent Spacing
```tsx
// Use Tailwind's spacing scale
gap-4, gap-6, gap-8, gap-12
```

### 3. Color Consistency
```tsx
// Use design system colors
text-[#0A2540] dark:text-white
bg-[#38BDF8]
```

### 4. Animation Performance
```tsx
// Prefer transform and opacity
transform: translateY(-8px)  ✅
top: -8px                    ❌
```

### 5. Accessibility First
```tsx
// Always include ARIA labels
<button aria-label="Menu">
```

---

## 🔧 Troubleshooting

### Dark Mode Not Working?
1. Check if ThemeToggle is rendered
2. Verify localStorage is accessible
3. Check browser console for errors

### Animations Choppy?
1. Use GPU-accelerated properties (transform, opacity)
2. Reduce animation complexity
3. Check for heavy re-renders

### Toast Not Showing?
1. Verify ToastProvider wraps your app
2. Check useToast is called inside ToastProvider
3. Verify no z-index conflicts

---

## 📚 Resources

### Documentation
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

### Design Inspiration
- [Dribbble](https://dribbble.com)
- [Awwwards](https://www.awwwards.com)
- [Behance](https://www.behance.net)

---

## 🎉 You're Ready!

Your portfolio now has world-class UI/UX. Start customizing:

1. Update colors in `src/index.css`
2. Modify animations in components
3. Add your own content
4. Deploy and impress! 🚀

**Happy coding!** ✨
