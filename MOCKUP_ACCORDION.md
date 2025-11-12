# Accordion Sidebar Mockup - Detailed Visual Guide

## Desktop View (1920x1080)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Chat Interface - Model: GPT-5 [▼]                     [☰] Toggle Sidebar   │
├──────────────────────────────────┬──────────────────────────────────────────┤
│                                  │  Project Workspace                       │
│                                  ├──────────────────────────────────────────┤
│  USER: How do I implement auth? │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│                                  │  ┃ 📝 Next Session Todos        [3] ▼┃  │
│  ────────────────────────────    │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │
│                                  │  ┃ ☐ Fix authentication bug         ┃  │
│  ASSISTANT: I can help with...  │  ┃    └─ Update JWT validation       ┃  │
│  Let me explain the process...  │  ┃ ☐ Add unit tests for API         ┃  │
│                                  │  ┃ ☑ Update documentation        ✓  ┃  │
│                                  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                  │                                          │
│                                  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│                                  │  ┃ 🎯 Active Goals             [2] ▼┃  │
│                                  │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │
│                                  │  ┃ 🟢 Launch MVP                     ┃  │
│                                  │  ┃    Status: Active                 ┃  │
│                                  │  ┃ 🟢 Implement authentication       ┃  │
│                                  │  ┃    Status: Active                 ┃  │
│                                  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                  │                                          │
│                                  │  ┌──────────────────────────────────┐  │
│  ─────────────────────────────   │  │ 🧠 Project Memory          [5] ▶ │  │
│                                  │  └──────────────────────────────────┘  │
│  USER: What about OAuth?         │                                          │
│                                  │  ┌──────────────────────────────────┐  │
│                                  │  │ 💡 Learnings              [8] ▶  │  │
│  ────────────────────────────    │  └──────────────────────────────────┘  │
│                                  │                                          │
│                                  │  [+ Add New...]                          │
│                                  │                                          │
├──────────────────────────────────┤                                          │
│ Type message... [📎] [Send]      │                                          │
└──────────────────────────────────┴──────────────────────────────────────────┘
                60%                              40%
```

## Key Features Breakdown

### 1. Visual States

#### Expanded Section (▼)
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ← Colored border (brand color)
┃ 📝 Next Session Todos        [3] ▼┃  ← Icon, title, count badge, chevron
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ☐ Fix authentication bug         ┃  ← Item 1 (incomplete)
┃    └─ Update JWT validation       ┃  ← Sub-description (indented)
┃ ☐ Add unit tests for API         ┃  ← Item 2 (incomplete)
┃ ☑ Update documentation        ✓  ┃  ← Item 3 (completed - gray)
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

#### Collapsed Section (▶)
```
┌──────────────────────────────────┐  ← Subtle border
│ 🧠 Project Memory          [5] ▶ │  ← Shows count even when collapsed
└──────────────────────────────────┘
    ↓ Click to expand
```

#### Collapsed with Preview (▶)
```
┌──────────────────────────────────┐
│ 💡 Learnings              [8] ▶  │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │  ← Optional: Show latest 2
│ • Prisma ORM best practices      │     items as preview
│ • React Query caching tips       │
└──────────────────────────────────┘
```

### 2. Color Coding System

```
📝 Next Session Todos
   Border: #3B82F6 (Blue)
   Badge: Blue background
   Progress bar: Blue gradient

🎯 Goals
   Border: #10B981 (Green)
   Active badge: Green
   Completed badge: Blue
   Archived badge: Gray

🧠 Project Memory
   Border: #8B5CF6 (Purple)
   Badge: Purple background

💡 Learnings
   Border: #F59E0B (Amber)
   Badge: Amber background
```

### 3. Interactive Elements

#### Hover State
```
┌──────────────────────────────────┐
│ 🧠 Project Memory     [5] ▶ [+]  │  ← Quick add button appears
└──────────────────────────────────┘
    ↑ Background lightens
    ↑ Cursor: pointer
```

#### Active/Focus State
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 📝 Next Session Todos    [3] ▼  ┃  ← Focus ring (accessibility)
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    ↑ Ring: 2px, brand color, offset
```

### 4. Empty States

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎯 Active Goals             [0] ▼┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                  ┃
┃         📭                       ┃
┃    No goals yet                  ┃
┃                                  ┃
┃   [+ Create your first goal]     ┃
┃                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### 5. Mobile View (< 768px)

```
┌─────────────────────────────┐
│ Chat - GPT-5 [▼]      [☰]   │
├─────────────────────────────┤
│                             │
│  Messages...                │
│                             │
├─────────────────────────────┤
│ Input [Send]                │
└─────────────────────────────┘

   ↓ Tap sidebar button ↓

┌─────────────────────────────┐
│ [✕] Project Workspace       │  ← Full screen overlay
├─────────────────────────────┤
│ 📝 Next Session      [3] ▼  │
│  ☐ Fix auth bug             │
│  ☐ Add tests                │
├─────────────────────────────┤
│ 🎯 Goals            [2] ▶   │
├─────────────────────────────┤
│ 🧠 Memory           [5] ▶   │
├─────────────────────────────┤
│ 💡 Learning         [8] ▶   │
└─────────────────────────────┘
```

## Interaction Flow

### Opening/Closing Sections

```
Step 1: All collapsed except priority
┌────────────────┐
│ 📝 Todos  [3]▼ │ ← Expanded (has incomplete items)
│  ☐ Item 1      │
│  ☐ Item 2      │
├────────────────┤
│ 🎯 Goals  [2]▶ │ ← Collapsed
├────────────────┤
│ 🧠 Memory [5]▶ │ ← Collapsed
├────────────────┤
│ 💡 Learn  [8]▶ │ ← Collapsed
└────────────────┘

Step 2: User clicks Goals ▶
┌────────────────┐
│ 📝 Todos  [3]▼ │ ← Still expanded (multiple allowed)
│  ☐ Item 1      │
│  ☐ Item 2      │
├────────────────┤
│ 🎯 Goals  [2]▼ │ ← Now expanded
│  🟢 Launch MVP  │
│  🟢 Add auth    │
├────────────────┤
│ 🧠 Memory [5]▶ │
├────────────────┤
│ 💡 Learn  [8]▶ │
└────────────────┘
```

## Advanced Features

### 1. Progress Indicators

For Todos section:
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 📝 Next Session Todos   [1/3] ▼  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱▱▱▱▱  33%     ┃  ← Progress bar
┃ ─────────────────────────────     ┃
┃ ☑ Update docs               ✓     ┃
┃ ☐ Fix auth bug                    ┃
┃ ☐ Add tests                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### 2. Quick Actions

Hover on item:
```
☐ Fix authentication bug    [✏️] [🗑️]
                            Edit Delete
```

### 3. Search/Filter (Future)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Project Workspace                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ [🔍 Search all sections...]      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 📝 Next Session Todos       [3]▼ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### 4. Keyboard Shortcuts

```
Alt+1  → Toggle Todos section
Alt+2  → Toggle Goals section
Alt+3  → Toggle Memory section
Alt+4  → Toggle Learnings section

Cmd+K  → Quick search all sections
Tab    → Navigate between sections
Enter  → Expand/collapse focused section
```

## Responsive Breakpoints

```
Desktop (> 1024px):
├─ Sidebar: 400px fixed width
├─ Chat: Remaining space (60-70%)
└─ Both visible side-by-side

Tablet (768px - 1024px):
├─ Sidebar: 350px fixed width
├─ Chat: Remaining space
└─ Collapsible sidebar with overlay option

Mobile (< 768px):
├─ Chat: Full width
├─ Sidebar: Full-screen overlay
│   └─ Triggered by hamburger menu
└─ Bottom sheet alternative (swipe up)
```

## Animation Specifications

```css
/* Accordion expand/collapse */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Hover effects */
transition: background-color 150ms ease-in-out;

/* Focus ring */
transition: box-shadow 200ms ease-in-out;

/* Badge pulse (when new item added) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

## Accessibility Features

```
- ARIA labels on all interactive elements
- Keyboard navigation with clear focus indicators
- Screen reader announcements for expand/collapse
- Reduced motion support for animations
- High contrast mode compatibility
- Semantic HTML structure
- Focus trap in mobile overlay mode
```

## Component Hierarchy

```
<Sidebar>
  <SidebarHeader>
    <Title>Project Workspace</Title>
    <CloseButton /> {/* Mobile only */}
  </SidebarHeader>

  <Accordion multiple defaultValue={['todos', 'goals']}>
    <AccordionItem
      value="todos"
      icon={📝}
      label="Next Session Todos"
      badge={todoCount}
      color="blue"
    >
      <NextSessionTodos />
    </AccordionItem>

    <AccordionItem
      value="goals"
      icon={🎯}
      label="Goals"
      badge={activeGoalsCount}
      color="green"
    >
      <Goals />
    </AccordionItem>

    <AccordionItem
      value="memory"
      icon={🧠}
      label="Project Memory"
      badge={memoryCount}
      color="purple"
    >
      <ProjectMemory />
    </AccordionItem>

    <AccordionItem
      value="learnings"
      icon={💡}
      label="Learnings"
      badge={learningsCount}
      color="amber"
    >
      <Learnings />
    </AccordionItem>
  </Accordion>
</Sidebar>
```

---

## Why This Design Works

1. **Visual Hierarchy**: Color coding + icons = instant recognition
2. **Information Density**: See all 4 sections without scrolling
3. **User Control**: Expand what matters, collapse the rest
4. **Scannable**: Counts and status at a glance
5. **Familiar Pattern**: Accordion is universally understood
6. **Accessible**: Full keyboard + screen reader support
7. **Responsive**: Graceful degradation on smaller screens
8. **Performant**: Only renders visible content

---

## Implementation Checklist

- [ ] Replace Tabs with Mantine Accordion component
- [ ] Add count badges to section headers
- [ ] Implement color coding for each section
- [ ] Add expand/collapse animations
- [ ] Store expansion state in localStorage
- [ ] Add hover effects and quick actions
- [ ] Implement keyboard shortcuts
- [ ] Create mobile overlay/bottom sheet
- [ ] Add empty states
- [ ] Test accessibility (keyboard, screen reader)
- [ ] Add progress indicators for todos
- [ ] Optimize performance (virtualization for long lists)

