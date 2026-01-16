# Phase 03 Deliverables

## Task 1: Scroll-Triggered Reveal Sequences (RTL-Aware) ✅

### Reveal Storyboard

| Section | Animation | LTR Direction | RTL Direction | Trigger |
|---------|-----------|---------------|---------------|---------|
| Hero Headline | Fade + Rise | ↑ from bottom | ↑ from bottom | Page load |
| Hero Subtext | Fade + Rise | ↑ from bottom | ↑ from bottom | 200ms delay |
| Hero CTA | Scale in | Center | Center | 400ms delay |
| Section Title | Slide + Fade | ← from left | → from right | 20% in view |
| Project Cards | Stagger Rise | ↑ from bottom | ↑ from bottom | 30% in view |
| About Image | Slide + Fade | ← from left | → from right | 25% in view |
| About Text | Fade + Rise | ↑ from bottom | ↑ from bottom | 25% in view |
| Skill Items | Stagger Fade | Sequential | Sequential | 30% in view |
| Contact Form | Fade + Rise | ↑ from bottom | ↑ from bottom | 20% in view |

### Framer Motion Implementation

```jsx
// Direction-aware reveal variants
const useRevealVariants = () => {
  const isRTL = document.dir === 'rtl';
  
  return {
    slideIn: {
      hidden: { opacity: 0, x: isRTL ? 50 : -50 },
      visible: { opacity: 1, x: 0 }
    },
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    }
  };
};
```

---

## Task 2: Content Loading States ✅

### Skeleton Components

| Component | Skeleton Design | Animation |
|-----------|-----------------|-----------|
| **Hero** | Full-width gradient bar + 2 text lines | Shimmer |
| **Project Card** | Image placeholder + 2 text lines + tags | Shimmer |
| **About Section** | Circle (avatar) + 4 text lines | Shimmer |
| **Skill Item** | Rounded pill shape | Shimmer |
| **Contact Form** | 3 input outlines + button | Shimmer |

### Skeleton CSS

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    var(--color-muted) 50%,
    var(--color-surface) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* RTL: Shimmer direction reversed */
[dir="rtl"] .skeleton {
  animation: shimmer-rtl 1.5s infinite;
}

@keyframes shimmer-rtl {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## Task 3: Section Transition Choreography ✅

### Timing Matrix

| Element | Entry Duration | Entry Delay | Stagger | Easing |
|---------|---------------|-------------|---------|--------|
| Hero Headline | 600ms | 0ms | — | easeOut |
| Hero Subtext | 500ms | 200ms | — | easeOut |
| Hero CTA | 400ms | 400ms | — | spring |
| Section Title | 500ms | 0ms | — | easeOut |
| Card 1 | 500ms | 0ms | — | easeOut |
| Card 2 | 500ms | 100ms | 100ms | easeOut |
| Card 3 | 500ms | 200ms | 100ms | easeOut |
| Card N | 500ms | N×100ms | 100ms | easeOut |
| Skill Items | 300ms | N×50ms | 50ms | easeOut |

### Spring Configuration

```javascript
const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

const easeOutConfig = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5
};
```

---

## Task 4: Progressive Image Loading ✅

### Strategy

| Stage | Technique | Purpose |
|-------|-----------|---------|
| 1. Placeholder | Solid color `#CBD5E1` | Reserve space |
| 2. Low-res | 20px wide blur-up | Instant preview |
| 3. Full image | Lazy load on viewport | Quality |

### Implementation

```jsx
const ProgressiveImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const lowResSrc = src.replace(/(\.\w+)$/, '-thumb$1'); // e.g., image-thumb.jpg
  
  return (
    <div className="image-wrapper">
      {/* Blur placeholder */}
      <img
        src={lowResSrc}
        alt=""
        className={`blur-placeholder ${loaded ? 'hidden' : ''}`}
      />
      {/* Full image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`full-image ${loaded ? 'visible' : ''}`}
      />
    </div>
  );
};
```

### Image Formats

| Use Case | Format | Fallback |
|----------|--------|----------|
| Project thumbnails | WebP | JPEG |
| Profile photo | WebP | JPEG |
| Icons/logos | SVG | PNG |

---

## Task 5: Scroll Progress Indicators (RTL) ✅

### Design Spec

```
LTR Mode:
┌────────────────────────────────────┐
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← Progress fills left to right
└────────────────────────────────────┘

RTL Mode:
┌────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░████████ │  ← Progress fills right to left
└────────────────────────────────────┘
```

### Implementation

```jsx
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="scroll-progress-track">
      <div 
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
```

```css
.scroll-progress-track {
  position: fixed;
  top: 0;
  inset-inline-start: 0; /* RTL-aware: left in LTR, right in RTL */
  width: 100%;
  height: 3px;
  background: var(--color-surface);
  z-index: 1000;
}

.scroll-progress-bar {
  height: 100%;
  background: var(--color-accent);
  transition: width 0.1s;
}

/* RTL: Bar grows from right */
[dir="rtl"] .scroll-progress-bar {
  margin-inline-start: auto; /* Push to right */
}
```

---

## Task 6: Direction-Aware Animation Strategy ✅

### Rules

| Animation Type | LTR | RTL | CSS Property |
|----------------|-----|-----|--------------|
| Slide horizontal | `x: -50 → 0` | `x: 50 → 0` | `translateX` |
| Slide vertical | Same | Same | `translateY` |
| Scale | Same | Same | `scale` |
| Fade | Same | Same | `opacity` |
| Rotate | Same | Same | `rotate` |

### Direction Context Hook

```jsx
// hooks/useDirection.js
import { useEffect, useState } from 'react';

export const useDirection = () => {
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    setIsRTL(document.documentElement.dir === 'rtl');
    
    const observer = new MutationObserver(() => {
      setIsRTL(document.documentElement.dir === 'rtl');
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['dir'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  return { isRTL, dir: isRTL ? 'rtl' : 'ltr' };
};
```

### Framer Motion Variants Factory

```jsx
// utils/motionVariants.js
export const createSlideVariants = (isRTL) => ({
  hidden: { 
    opacity: 0, 
    x: isRTL ? 40 : -40 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
});

export const createStaggerContainer = (staggerMs = 100) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: staggerMs / 1000 }
  }
});
```

---

## Phase 03 Complete ✅

All 6 tasks have deliverables documented. Ready for Phase 04.
