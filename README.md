# NamePad: A Web Application for Managing Favourite First Names

## Overview
**NamePad** is a web application designed to help users search for, filter, and manage a list of favourite first names. The application provides a clean and user-friendly interface for browsing a comprehensive database of names, which can be filtered by various criteria. Users can save their favourite names to a personal notepad for prioritization or further management.

The application is powered by **Node.js** and **Express** on the server side and uses a modern browser-based client-side application. Persistent data storage is handled by **MongoDB**. Additionally, advanced build tools like **esbuild** and **Less** are used to ensure a streamlined development process.

## Features

The application is powered by Node.js and Express on the server side and uses a modern browser-based client-side application. Persistent data storage is handled by MongoDB. Additionally, advanced build tools like esbuild and Less are used to ensure a streamlined development process.

## Features
### Core Functionalities:
- **Name Search:**
  - View a list of names in ascending lexicographical order.
  - Pagination support to display a limited number of names per page with navigation controls.
  - Display the current page index and total number of pages.
- **Filter Options:**
  - Filter by gender (male/female).
  - Filter by prefix (names starting or not starting with specific letters).
  - Filter by suffix (names ending or not ending with specific letters).
  - Filter by the number of syllables using the **syllabificate** npm module.
- **Notepad Management:**
  - Add names to a personal notepad.
  - Filter names in the notepad by gender.
  - Prioritize or remove names from the notepad.
    
### Technical Features:
- **Database Management:**
  - Persist data using **MongoDB**.
  - Initial database population from a provided CSV file using a custom Node.js script.
- **Responsive and Modular Design:**
  - Modularized and structured project architecture.
  - CSS styling generated from **Less** files and minified with **less-plugin-clean-css**.
  - JavaScript bundling and minification using **esbuild** and **terser**.
- **Build Automation:**
  - Build, clean, lint, and run the project using npm scripts:
    - `npm run initdb`: Populate the database with initial data.
    - `npm run clean`: Remove generated and downloaded files.
    - `npm run lint`: Check for semistandard rule compliance in all JS files.
    - `npm run debug`: Build the project without minification.
    - `npm run build`: Build the project with minified CSS and JS files.
    - `npm run start`: Start the HTTP server on port 8080.
  
## Technologies Used
- **Server-Side:**
  - **Node.js** and **Express** for HTTP server functionality.
  - Database: **MongoDB** for resource persistence.
- **Client-Side:**
  - Vanilla JavaScript, CSS (generated from Less).
  - No preprocessors or frameworks used.
- **Build Tools:**
  - **Less** for CSS generation.
  - **esbuild** for JavaScript bundling.
  - **terser** for JavaScript minification.
  - **less-plugin-clean-css** for CSS minification.

## Demo
For a detailed demonstration of the application, including screenshots and an analysis of the results, please refer to the **Documentation.pdf** located in the **latex-vorlage-ausarbeitung** folder of this repository. The documentation includes visual aids in the section **"Ergebnisse und Analyse"** for a deeper understanding of the application’s functionality and user interface.

## Acknowledgments
- Special thanks to **Christian Bettinger, M. Sc.**, for his guidance on the system architecture and support throughout the project.
