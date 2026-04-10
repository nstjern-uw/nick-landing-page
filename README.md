# Assignment 1: Personal Landing Page

A starter template for your personal landing page deployed to AWS S3.

## Getting Started

1. Click **"Use this template"** on GitHub to create your own copy
2. Clone your new repo locally
3. Open in Cursor or VS Code
4. Deploy to S3 as-is to verify your setup works
5. Customize with your own content
6. Re-deploy to S3

## What's Included

```
├── index.html        ← Your landing page
├── style.css         ← Responsive grid styles
├── .gitignore        ← Keeps junk files out of your repo
├── README.md         ← This file
└── images/
    ├── cat-sleeping.jpg  ← Placeholder — replace with your photo
    ├── dog-happy.jpg     ← Placeholder — replace with your photo
    ├── cat-curious.jpg   ← Placeholder — replace with your photo
    └── dog-sitting.jpg   ← Placeholder — replace with your photo
```

## Customizing

Replace the placeholder images with your own photos, update the bio and links in `index.html`, and modify `style.css` to match your taste. Use AI to help — good prompts to try:

- "Make this a dark theme"
- "Add a hover zoom effect on the photos"
- "Change the grid to a masonry layout"
- "Add a skills section below the gallery"

## Uploading to S3

Upload `index.html`, `style.css`, and the `images/` folder to your S3 bucket. **Do NOT upload `.git`, `.gitignore`, or `README.md`** — those are for your repo, not your website.

## Image Tips

Resize photos to under 500 KB before uploading:

- **Mac:** `sips --resampleWidth 1000 photo.jpg`
- **Linux/WSL:** `convert photo.jpg -resize 1000x photo_resized.jpg`

Keep filenames simple, lowercase, no spaces.

## Submission

Do not submit this template unmodified. Your site must have your own photos and bio.
