# Project Page Templates

This folder contains templates for creating new project detail pages.

## How to Create a New Project Page

1. **Copy the template**: Copy `ProjectPageTemplate.tsx` to `../projects/[ID].tsx`
   - Example: Copy to `../projects/2.tsx` for project ID "2"

2. **Replace placeholders**:
   - Change `Project[PROJECT_ID]` to `Project2` (or your actual ID)
   - Change `'[PROJECT_ID]'` to `'2'` (or your actual ID) 
   - Fill in all `ADD ... HERE` placeholders with your content

3. **Remove unused sections**:
   - Don't need videos? Delete the entire `videos: [...]` property
   - Don't want challenges? Delete the entire `challenges: [...]` property
   - Only need 2 code snippets? Delete the extras

4. **Add your content**:
   - Replace placeholder text with your actual project details
   - Add your real code snippets
   - Include paths to your actual images/videos

## Example File Structure After Creating Project 2:

```
src/
├── projects/
│   ├── 1.tsx          (existing - Ballpit Chase)
│   └── 2.tsx          (new - copied from template)
├── templates/
│   ├── ProjectPageTemplate.tsx
│   └── README.md
```

## Tips:

- **Start simple**: You can always add more content later
- **Code snippets**: Each project can have different amounts (1-10+ is fine)
- **Media**: Images/videos are optional - only add if you have them
- **Languages**: Supported code languages include `csharp`, `javascript`, `typescript`, `python`, `hlsl`, etc.
- **Sections**: Every section except `longDescription` is optional

## Need Help?

Look at `../projects/1.tsx` for a complete example of how the template should look when filled out.
