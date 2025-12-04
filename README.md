# React Debugging Exercises

This repository contains a collection of **practical exercises for learning to debug in React**. Each exercise presents common challenges that developers face in real-world React applications.

## 🎯 Objective

The goal of these exercises is to develop debugging skills in React, learning to:
- Identify common errors in React components
- Use browser developer tools
- Understand data flow and state in React
- Debug rendering and event issues

## 📋 Exercises

### Exercise 1: Login Form
**Route:** `/exercise1`

A debugging exercise for a login form with validation. Students must identify and fix issues related to event handling and form logic.

**Components involved:**
- `LoginForm.tsx` - Main form with validation
- `Navbar.tsx` - Navigation bar
- `Footer.tsx` - Footer

### Exercise 2: Todo List
**Route:** `/exercise2`

An exercise to debug a todo list application. Contains errors in item deletion logic and state management.

**Components involved:**
- `SimpleTodos.tsx` - Main list component
- `TodosItem.tsx` - Individual task component

### Exercise 3: Movie Search (React 19 Migration)
**Route:** `/exercise3`

⚠️ **This exercise is special:** It consists of **updating the application to the new React 19 version and debugging to make it functional again**.

The application is a movie search engine that uses the TMDb (The Movie Database) API. It was originally written using old React patterns (class components, jQuery, Bloodhound/Typeahead) that may not be compatible with React 19.

**Exercise challenges:**
- Migrate class components to functional components with hooks
- Replace obsolete dependencies (jQuery, Bloodhound)
- Adapt code to new React 19 patterns
- Identify and fix compatibility errors

**Components involved:**
- `Exercise3.jsx` - Main class component
- `card.jsx` - Movie information card
- `search.jsx` - Search box with typeahead

## 🚀 Installation

To install dependencies:

```bash
bun install
```

## 💻 Development

To start the development server:

```bash
bun dev
```

## 🛠️ Technologies

- **React 19** - UI Library
- **TypeScript** - Static typing
- **Tailwind CSS** - Styling framework
- **Shadcn/UI** - UI Components
- **React Router** - Routing

## 📚 Debugging Resources

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Browser Debugging](https://developer.chrome.com/docs/devtools/)
- [React 19 Documentation](https://react.dev/)
