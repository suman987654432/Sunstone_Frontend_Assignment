# Task Manager

A modern task management application built with React, Vite, and TailwindCSS featuring drag-and-drop functionality.

**Live Demo:** [https://sunstone-frontend-assignment.vercel.app/](https://sunstone-frontend-assignment.vercel.app/)

# Features

- Click on "Add New Task" button.
- Fill in the task details (Title, Description, Priority, Status, Due Date).
- Click "Add Task" to save the task.
- The new task will appear on the dashboard and is stored in your browser (localStorage).
- You can drag a task card and drop it into another status column (e.g., To-Do, In-Progress,     Completed).

## Tech Stack

- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool & dev server
- **TailwindCSS** 3.4.18 - Styling
- **@hello-pangea/dnd** - Drag and drop functionality
- **date-fns** - Date manipulation

## Project Setup

### Installation

1. Clone the repository
```bash
git clone https://github.com/suman987654432/Sunstone_Frontend_Assignment
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Build for production |


## Folder Structure

```
frontend/
├── public/              
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── Task.json   # Task data
│   ├── pages/          # Page components
│   │   └── Dashboard.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles & Tailwind imports
├── eslint.config.js    
├── postcss.config.js  
├── tailwind.config.js  # TailwindCSS configuration
├── vite.config.js      # Vite configuration
├── index.html          # HTML entry point
└── package.json        # Dependencies & scripts
```


## Deployment

### Build for Production
```bash
npm run build
```




