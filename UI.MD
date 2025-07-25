# UI Documentation - RDebrid UI

This document provides comprehensive documentation of the UI structure, HeroUI components, styling patterns, and architectural decisions for the RDebrid UI application.

## Overview

RDebrid UI is a React-based torrent and file management interface built with:
- **HeroUI** (v2.6.11) - Primary UI component library
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Query** for data management

## Application Structure - Page Layout and UI Elements

### Global Navigation
Every page has consistent navigation elements:
- **Top navbar** with the "Rdebrid" logo that links to home
- **Side navigation** (desktop sidebar, mobile bottom bar) with 4 main sections:
  - Home (unrestrict links)
  - Torrents (your torrent list)
  - Downloads (your download list)
  - Search (find new torrents)

---

## Page-by-Page UI Elements

### Home Page (`/downloader/links` or `/downloader/torrents`)
Purpose: Main hub for adding new downloads

Navigation Tabs:
- "Links" tab - for unrestricting direct download links
- "Torrents" tab - for adding torrent files or magnet links

Links Tab Elements:
- Large text area for pasting multiple download URLs
- Optional password field for protected links
- "Unrestrict" button to process the links
- Results section showing processed files with download buttons

Torrents Tab Elements:
- File upload area to browse for .torrent files
- Text field for pasting magnet links with clear button
- "Add Torrent" button to add the torrent
- "Availability" button to check if torrent can be downloaded
- Status indicator showing if torrent is available or not

### Torrents Page (`/view?type=torrents`)
Purpose: View and manage all your torrents

Top Controls:
- Page navigation (previous/next page buttons)
- "Select Mode" toggle to enable bulk actions
- "Select All" checkbox when in select mode
- "Delete" button for removing selected torrents

Torrent List:
Each torrent shows:
- Torrent filename and download progress percentage
- File size and date added
- Status icons (downloading, completed, error, waiting)
- Download speed (when actively downloading)
- Three-dot menu with options: View files, Unrestrict, Copy links, Delete

### Downloads Page (`/view?type=downloads`)
Purpose: View and manage completed downloads

Top Controls: Same as torrents page
Download List:
Each download shows:
- Filename and host/service it came from
- File size and download date
- Status (success or error with details)
- Action buttons for each file

### Search Page (`/btsearch`)
Purpose: Search for new torrents to download

Search Header:
- Search input field with magnifying glass icon
- Category dropdown (All, Movie, Audio, Document, Application, Other)
- Sort dropdown (by Date, Size, Seeders, Relevance)

Results Area:
- Page navigation controls
- List of search results, each showing:
  - Torrent title and description
  - File size and upload date
  - Three-dot menu with options:
    - Open original torrent page
    - Add torrent to your collection
    - Check if available for download
    - Copy magnet link
    - Open magnet link in torrent client

Empty States:
- "Search BTDig Index" message when no search performed
- "No torrents found" when search returns nothing

### Video Player Page (`/watch/*`)
Purpose: Stream video files directly in browser

Video Player Elements:
- Full-screen video player with standard controls
- Play/pause, volume slider, progress bar
- Settings menu for video quality selection
- Fullscreen button
- Picture-in-picture mode button
- Screenshot capture button
- Playback speed controls
- Aspect ratio switching

## Popup Windows and Overlays

### File Selection Modal
Appears when: Adding a multi-file torrent

Elements:
- Modal title "Torrent Files"
- Torrent name and total size
- Folder tree structure with checkboxes for selecting specific files
- File sizes shown for each item
- "Add" button to confirm file selection

### Toast Notifications
Appears for: Success/error messages
- Slide in from bottom-right corner
- Green checkmark for success messages
- Red warning icon for error messages
- Auto-dismiss after a few seconds

### Loading States
- Spinning icons during searches and downloads
- Progress bars for file uploads
- Loading overlays during processing

### Error Handling
- Error messages with retry options
- Tooltips showing detailed error information
- Warning indicators for failed operations
