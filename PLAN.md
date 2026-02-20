# OKR Roadmap Tool - Implementation Plan

## Approach

Use Next.js App Router (file-based routing) instead of React Router v7. The app will be primarily client-side (`"use client"`) with Zustand stores for state, mock data seeding, and Tailwind CSS v4 for styling.

## Dependencies to Install

- `zustand` — state management

No other dependencies needed. Tailwind CSS v4, TypeScript, React 19, Next.js 16 are already installed.

## Phase 1: Data Layer (types, mock data, stores, utils)

### 1.1 Types — `src/types/index.ts`
All TypeScript interfaces as specified: Tag, Quarter, Product, KeyResult, Objective, OKRLinkTarget, Project.

### 1.2 Constants — `src/lib/constants.ts`
Status labels/colors, quarter labels, default quarter ID.

### 1.3 Utils — `src/lib/utils.ts`
- `calcProgress(keyResults)` — average of (current/target) across KRs
- `statusColor(status)` — maps status to tailwind color classes
- `cn(...classes)` — classname joiner (filter falsy values)

### 1.4 Mock Data
- `src/data/mock-tags.ts` — 4-5 tags (Growth, Reliability, UX, etc.)
- `src/data/mock-products.ts` — 3 products (Product Alpha, Beta, Gamma)
- `src/data/mock-objectives.ts` — 6-8 objectives (mix of company + product level, with key results)
- `src/data/mock-projects.ts` — 6-8 roadmap projects linked to objectives

### 1.5 Zustand Stores
- `src/stores/useOKRStore.ts` — as specified (objectives + key results CRUD + queries)
- `src/stores/useProductStore.ts` — products CRUD
- `src/stores/useProjectStore.ts` — projects CRUD + queries (getByProduct, getLinkedToObjective)
- `src/stores/useTagStore.ts` — tags CRUD
- `src/stores/useQuarterStore.ts` — quarters list + activeQuarterId

## Phase 2: Layout + Routing

### 2.1 App Shell — `src/components/layout/AppShell.tsx`
Client component wrapping `<Sidebar />` + `<TopBar />` + `{children}`. Flexbox layout: sidebar fixed-width left, content area fills remaining space.

### 2.2 Sidebar — `src/components/layout/Sidebar.tsx`
- Company section: Dashboard link, Alignment link
- Products section: list from useProductStore, each links to `/products/[id]`
- Bottom: QuarterSelector, Settings link

### 2.3 TopBar — `src/components/layout/TopBar.tsx`
Breadcrumb/page title bar at the top of the content area.

### 2.4 Next.js Route Structure
```
src/app/
  layout.tsx                          (root layout — wraps AppShell)
  page.tsx                            (Dashboard)
  products/[productId]/page.tsx       (ProductDetail)
  objectives/[objectiveId]/page.tsx   (ObjectiveDetail)
  alignment/page.tsx                  (AlignmentView)
  settings/page.tsx                   (Settings)
```

All page files will be `"use client"` since they use Zustand stores.

## Phase 3: Shared Components

- `src/components/shared/TagChip.tsx` — colored tag pill
- `src/components/shared/StatusBadge.tsx` — status indicator with color
- `src/components/shared/QuarterSelector.tsx` — dropdown to switch active quarter
- `src/components/shared/EmptyState.tsx` — placeholder for empty lists
- `src/components/shared/ConfirmDialog.tsx` — confirmation modal
- `src/components/shared/AvatarGroup.tsx` — owner avatar display

## Phase 4: Dashboard Page

- `src/components/okr/OKRProgressBar.tsx` — progress bar with percentage
- `src/components/okr/KeyResultRow.tsx` — single KR with progress indicator
- `src/components/okr/ObjectiveCard.tsx` — card showing objective + KRs + tags + progress
- `src/app/page.tsx` — Dashboard: company OKRs grouped by tag, summary stats

## Phase 5: ProductDetail Page

- `src/app/products/[productId]/page.tsx` — tabs for OKRs and Roadmap
- `src/components/roadmap/ProjectCard.tsx` — project card with status, dates, linked OKRs
- `src/components/roadmap/BoardView.tsx` — kanban columns by status

## Phase 6: ObjectiveDetail Page

- `src/app/objectives/[objectiveId]/page.tsx` — full objective view
- Inline-editable KRs with progress sliders
- Linked projects (reverse lookup from ProjectStore)

## Phase 7: AlignmentView Page

- `src/app/alignment/page.tsx` — tag picker + alignment grid
- `src/components/alignment/AlignmentGrid.tsx` — cross-cutting tag view

## Phase 8: Forms + Modals

- `src/components/okr/ObjectiveForm.tsx` — create/edit objective modal
- `src/components/okr/KeyResultForm.tsx` — create/edit KR
- `src/components/roadmap/ProjectForm.tsx` — create/edit project
- `src/components/roadmap/OKRLinkSelector.tsx` — picker to link project to OKR

## Phase 9: Settings Page

- `src/app/settings/page.tsx` — manage products, tags, quarters with CRUD tables/forms

## Build Order Summary

1. Types + constants + utils + mock data + stores
2. AppShell + Sidebar + TopBar + routing skeleton
3. Shared components (TagChip, StatusBadge, QuarterSelector, EmptyState, ConfirmDialog, AvatarGroup)
4. Dashboard page (ObjectiveCard, KeyResultRow, OKRProgressBar)
5. ProductDetail page (ProjectCard, BoardView, tabs)
6. ObjectiveDetail page (editable KRs, linked projects)
7. AlignmentView page (AlignmentGrid)
8. Forms/modals (ObjectiveForm, KeyResultForm, ProjectForm, OKRLinkSelector)
9. Settings page
