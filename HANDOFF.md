# Portfolio Restructuring - Work in Progress

## What's Been Done
1. ✅ Created new `src/data/projects.ts` (TypeScript file) to replace `src/data/projects.json`
   - Added `slug` field for URL-friendly identifiers (e.g., "ballpit-chase")
   - Added `order` field for easy reordering (lower numbers appear first)
   - Removed `id` field (using `slug` as the unique identifier now)
   - All existing project data preserved

2. ✅ Updated `src/components/ProjectCard.tsx`
   - Changed interface to use `slug` instead of `id`
   - Added `order: number` field to interface
   - Updated link to use `/projects/${slug}`

3. ✅ Updated `src/App.tsx`
   - Changed import from `projects.json` to `projects.ts`
   - Added sorting logic: `[...projectsData].sort((a, b) => a.order - b.order)`
   - Changed route from `/projects/:projectId` to `/projects/:slug`

## What Still Needs to Be Done

### 1. Update DynamicProjectPage Component
File: `src/components/DynamicProjectPage.tsx`

Change:
- Line 3: `import projectsData from '../data/projects.json'` → `import { projects as projectsData } from '../data/projects'`
- Line 7: `const { projectId } = useParams<{ projectId: string }>()` → `const { slug } = useParams<{ slug: string }>()`
- Line 20: `'No project ID provided'` → `'No project slug provided'`
- Line 26: `projectsData.find(p => p.id === projectId)` → `projectsData.find(p => p.slug === slug)`
- Line 28: Update error message to use `slug` instead of `projectId`
- Line 35: `import(\`../projects/${projectId}.tsx\`)` → `import(\`../projects/${slug}.tsx\`)`
- Line 39-40: Update error messages to use `slug` instead of `projectId`
- Line 46: Update dependency array from `[projectId]` to `[slug]`

### 2. Rename and Update Project Files

**File: `src/projects/1.tsx` → `src/projects/ballpit-chase.tsx`**
- Line 6: `projectsData.find(p => p.id === '1')` → `projectsData.find(p => p.slug === 'ballpit-chase')`

**File: `src/projects/2.tsx`** (this is a template file)
- Update all template comments to reference `slug` instead of `id`
- Line 6: Update the find logic to use slug
- Line 12: Change function name from `Project2()` to match the slug (e.g., `TotalWarfare()`)

### 3. Optional: Delete Old JSON File
After verifying everything works:
```bash
rm src/data/projects.json
```

## How to Test
1. Run the dev server: `npm run dev`
2. Check that project cards appear in the correct order (by the `order` field)
3. Click on a project card and verify the URL uses the slug (e.g., `/projects/ballpit-chase`)
4. Verify the project page loads correctly

## Current Project Slugs
- "ballpit-chase" (order: 1)
- "total-warfare" (order: 2)
- "gandalfs-magical-adventure" (order: 3)
- "a-greek-odyssey" (order: 4)

## To Change Project Order in the Future
Just edit `src/data/projects.ts` and change the `order` field values. Lower numbers appear first.

## Notes
- The old `projects.json` file still exists but is no longer used
- Only `ballpit-chase.tsx` project page currently exists (was `1.tsx`)
- The `2.tsx` file is a template with placeholder content
