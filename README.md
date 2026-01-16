# React Posts List - Take Home Test

A Next.js application that displays a list of posts with search functionality, built with TypeScript and Tailwind CSS.

## Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)


## Features

- Posts list with title and body preview
- Search functionality with debounce
- Loading and error states
- Modal view for full post details
- Keyboard support (Escape to close modal)
- AbortController for cleanup

## Project Structure

```
react-posts-list/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── PostsList.tsx
│   ├── PostCard.tsx
│   ├── PostModal.tsx
│   └── SearchBar.tsx
├── lib/
│   └── api.ts
├── constants/
│   └── index.ts
├── types/
│   └── post.ts
└── README.md
```

## Technologies Used

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## API

The application fetches data from:
- `https://jsonplaceholder.typicode.com/posts`

## Future Improvements

- Pagination or infinite scroll
- Add React Query for better data management
- Unit tests for components and utilities
- More accessibility features
