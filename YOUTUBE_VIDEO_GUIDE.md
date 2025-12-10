# Using YouTube Videos in Project Pages

## Why YouTube?
Large MP4 files (like your 122MB Ballpit-gamplay.mp4) exceed GitHub's file size limits. Using YouTube embeds solves this problem while providing better video streaming performance.

## How to Use

### Step 1: Upload Your Video to YouTube
1. Go to [YouTube Studio](https://studio.youtube.com)
2. Click "Create" → "Upload videos"
3. Upload your video (e.g., Ballpit-gamplay.mp4)
4. Set visibility to "Unlisted" if you don't want it in search results
5. Copy the video URL from the share button

### Step 2: Update Your Project Files
Replace MP4 paths with YouTube URLs in your project files (e.g., `src/projects/1.tsx`):

#### Supported URL Formats
```typescript
// Full YouTube URL
"https://www.youtube.com/watch?v=dQw4w9WgXcQ"

// Short YouTube URL
"https://youtu.be/dQw4w9WgXcQ"

// Both formats work automatically!
```

#### Example Updates

**Before:**
```typescript
videos: [
    "/projectAssets/1/videos/Ballpit-gamplay.mp4"
],
```

**After:**
```typescript
videos: [
    "https://www.youtube.com/watch?v=YOUR_ACTUAL_VIDEO_ID"
],
```

### Step 3: Where to Use YouTube URLs

YouTube URLs work in **three places**:

1. **Main project videos** (in the `videos` array)
2. **Hero/header images** (if you want a video as the main image)
3. **Code snippet videos** (in the `codeSnippets` array)

### Example from Your Project

```typescript
const projectData: ExtendedProjectData = {
    // ... other properties
    
    videos: [
        "https://www.youtube.com/watch?v=YOUR_VIDEO_ID" // Main gameplay video
    ],
    
    codeSnippets: [
        {
            title: "Player Tagging Mechanic",
            description: "Core tagging mechanic...",
            language: "csharp",
            video: "https://www.youtube.com/watch?v=ANOTHER_VIDEO_ID", // Or keep as GIF
            code: `...`
        }
    ]
};
```

## What About Small Files?

- **GIFs**: Keep them local (they're usually small)
- **Small videos** (< 10MB): You can keep them local
- **Large videos** (> 50MB): Use YouTube

## Next Steps

1. Upload your `Ballpit-gamplay.mp4` to YouTube
2. Get the video URL
3. Replace `"https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE"` in `src/projects/1.tsx` with your actual URL
4. Test locally: `npm run dev`
5. Commit and push to GitHub (the MP4 file will no longer be needed)

## Optional: Remove Old MP4 File

After confirming the YouTube embed works:
```bash
git rm public/projectAssets/1/videos/Ballpit-gamplay.mp4
git commit -m "Replace large MP4 with YouTube embed"
```
