# Supabase Storage Setup Guide

## Overview
All images and videos are now stored in Supabase Storage instead of the GitHub repository. This keeps your private photos off of GitHub while maintaining the same directory structure.

## Supabase Configuration

- **Project URL**: `https://jkkucwnmpoeflwbvftio.supabase.co`
- **Bucket Name**: `images`
- **Storage URL Format**: `https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/[path]`

## Directory Structure in Supabase

Your Supabase Storage bucket should have the following directory structure:

```
images/
├── family_friends/
├── mandy/
│   ├── 2023/
│   ├── 2024/
│   └── 2025/
├── messages/
├── moments/
│   ├── 2023/
│   ├── 2024/
│   └── 2025/
└── pets/
```

## Setting Up Supabase Storage

### Step 1: Create the Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **New bucket**
5. Name it: `images`
6. Make it **Public** (so images can be accessed without authentication)
7. Click **Create bucket**

### Step 2: Upload Images

You can upload images in two ways:

#### Option A: Using Supabase Dashboard (Recommended for initial setup)

1. Go to **Storage** → **images** bucket
2. Create folders matching your directory structure:
   - `family_friends/`
   - `mandy/2023/`, `mandy/2024/`, `mandy/2025/`
   - `messages/`
   - `moments/2023/`, `moments/2024/`, `moments/2025/`
   - `pets/`
3. Upload files to their respective folders, maintaining the exact same file names

#### Option B: Using Supabase CLI (For bulk uploads)

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref jkkucwnmpoeflwbvftio

# Upload a directory
supabase storage upload images/mandy/2023 ./mandy/2023
```

### Step 3: Verify Upload

After uploading, verify that your images are accessible by visiting:
```
https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/[your-path]
```

For example:
```
https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:03:29_penguin.jpeg
```

## File Path Mapping

The HTML files now reference Supabase URLs. The mapping is:

| Local Path (Old) | Supabase Path (New) |
|-----------------|---------------------|
| `family_friends/file.jpg` | `https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/family_friends/file.jpg` |
| `mandy/2023/file.jpeg` | `https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/file.jpeg` |
| `moments/2024/file.jpg` | `https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/file.jpg` |
| `pets/file.jpeg` | `https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/file.jpeg` |
| `messages/file.gif` | `https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/messages/file.gif` |

## Adding New Images

When adding new images:

1. Upload the image to Supabase Storage in the appropriate folder
2. Use the same file name and path structure
3. The HTML files will automatically reference the correct Supabase URL

## Important Notes

- **File names must match exactly** - The HTML references use the exact file names from your local directories
- **Directory structure must match** - Keep the same folder structure in Supabase as you had locally
- **Public bucket** - The bucket is set to public so images load without authentication
- **No code changes needed** - All HTML files have been updated to use Supabase URLs

## Troubleshooting

### Images not loading?

1. Check that the bucket is set to **Public**
2. Verify the file path matches exactly (including case sensitivity)
3. Check the file exists in Supabase Storage dashboard
4. Test the direct URL in a browser

### Need to change bucket name?

If you need to use a different bucket name, update `supabase-config.js`:
```javascript
bucketName: 'your-new-bucket-name'
```

Then update all HTML files to use the new bucket name in the URLs.
