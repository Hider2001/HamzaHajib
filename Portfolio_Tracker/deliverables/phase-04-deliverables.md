# Phase 04 Deliverables

## Task 1: Card Hover States ✅

### Hover Transforms

| Property | Default | Hover | Duration |
|----------|---------|-------|----------|
| Scale | 1 | 1.02 | 300ms |
| Y Position | 0 | -8px | 300ms |
| Shadow | `0 4px 6px rgba(0,0,0,0.1)` | `0 20px 40px rgba(0,0,0,0.15)` | 300ms |
| Image Scale | 1 | 1.05 | 400ms |
| Overlay Opacity | 0 | 0.3 | 200ms |

### Framer Motion Implementation

```jsx
const cardVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

<motion.div
  variants={cardVariants}
  initial="rest"
  whileHover="hover"
  className="project-card"
>
```

---

## Task 2: Card Expansion Behavior ✅

### Expansion Flow

```
[Card in Grid]
     ↓ Click
[Card expands to modal/overlay]
     ↓
[Shows full project details]
     ↓ Click outside / X button
[Card contracts back to grid position]
```

### Shared Element Transition

```jsx
// Grid Card
<motion.div layoutId={`card-${project.id}`}>
  <motion.img layoutId={`image-${project.id}`} src={thumbnail} />
  <motion.h3 layoutId={`title-${project.id}`}>{title}</motion.h3>
</motion.div>

// Expanded Modal
<motion.div layoutId={`card-${project.id}`} className="expanded-card">
  <motion.img layoutId={`image-${project.id}`} src={fullImage} />
  <motion.h3 layoutId={`title-${project.id}`}>{title}</motion.h3>
  <p>{fullDescription}</p>
  <button onClick={close}>✕</button>
</motion.div>
```

### Expansion Specs

| Property | Grid State | Expanded State |
|----------|------------|----------------|
| Width | 100% of column | 80vw (max 900px) |
| Height | Auto | 80vh |
| Position | In grid flow | Fixed center |
| Backdrop | None | Black 50% opacity |
| Scroll | Page scrolls | Content scrolls |

---

## Task 3: Card Content Layers (EN/AR) ✅

### 3-Layer Hierarchy

| Layer | Visibility | Content EN | Content AR |
|-------|------------|------------|------------|
| **Layer 1: Default** | Always | Title, Thumbnail, Category badge | العنوان، الصورة، التصنيف |
| **Layer 2: Hover** | On hover | +Description excerpt, Tech tags | +وصف مختصر، التقنيات |
| **Layer 3: Expanded** | On click | +Full description, Gallery, Links | +الوصف الكامل، المعرض، الروابط |

### Text Length Considerations

| Content | EN Max | AR Max | Strategy |
|---------|--------|--------|----------|
| Title | 40 chars | 35 chars | Truncate with `...` |
| Excerpt | 100 chars | 90 chars | Line clamp (2 lines) |
| Full desc | Unlimited | Unlimited | Scroll in container |

### CSS Line Clamp

```css
.card-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## Task 4: Card Grid Responsiveness (RTL) ✅

### Breakpoints

| Breakpoint | Columns | Gap | Container |
|------------|---------|-----|-----------|
| Mobile (<640px) | 1 | 16px | 100% - 32px |
| Tablet (640-1024px) | 2 | 24px | 100% - 48px |
| Desktop (>1024px) | 3 | 32px | Max 1200px |

### Tailwind Grid Classes

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
  {projects.map(project => (
    <ProjectCard key={project.id} {...project} />
  ))}
</div>
```

### RTL Grid Flow

```css
/* Grid automatically flows RTL when dir="rtl" on parent */
[dir="rtl"] .project-grid {
  /* No changes needed - CSS Grid respects direction */
}

/* LTR: [1] [2] [3] */
/* RTL: [3] [2] [1] */
```

---

## Task 5: Card Interaction Feedback ✅

### Feedback States

| Action | Visual Feedback | Duration |
|--------|-----------------|----------|
| **Hover** | Lift + shadow | 300ms |
| **Press/Tap** | Scale 0.98 | 100ms |
| **Click** | Ripple effect | 400ms |
| **Loading** | Pulse overlay | Loop |
| **Success** | Check icon flash | 500ms |

### Press Animation

```jsx
<motion.div
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.1 }}
>
  {children}
</motion.div>
```

### Ripple Effect

```css
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, var(--color-accent) 10%, transparent 10%);
  background-size: 200% 200%;
  background-position: center;
  opacity: 0;
  transition: opacity 0.4s, background-size 0.4s;
  pointer-events: none;
}

.card:active::after {
  opacity: 0.2;
  background-size: 0% 0%;
  transition: 0s;
}
```

---

## Task 6: Bilingual Card Content Layout ✅

### Layout Comparison

```
EN Card (LTR):                    AR Card (RTL):
┌─────────────────────┐           ┌─────────────────────┐
│ [    IMAGE    ]     │           │     [    IMAGE    ] │
│                     │           │                     │
│ ← Title             │           │             العنوان →│
│ ← Description...    │           │        ...الوصف →│
│                     │           │                     │
│ [React] [Node] →    │           │ ← [React] [Node]    │
│                     │           │                     │
│ [View] [GitHub] →   │           │ ← [عرض] [GitHub]    │
└─────────────────────┘           └─────────────────────┘
```

### CSS Logical Properties

```css
.card-content {
  text-align: start;               /* Left in LTR, Right in RTL */
  padding-inline-start: 1rem;      /* Padding on reading start side */
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;     /* Follows text direction */
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-inline-start: auto;
}
```

### Icon Mirroring Rules

| Icon Type | Mirror in RTL? |
|-----------|----------------|
| Arrows (→) | ✅ Yes |
| External link | ❌ No |
| GitHub logo | ❌ No |
| Play button | ❌ No |
| Chevrons | ✅ Yes |

```css
[dir="rtl"] .icon-arrow {
  transform: scaleX(-1);
}
```

---

## Phase 04 Complete ✅

All 6 tasks have deliverables documented. Ready for Phase 05.
