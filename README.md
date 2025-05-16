# New Maps - React + TypeScript + Vite

New Maps is a web application built with **React**, **TypeScript**, and **Vite**. It provides an interactive map interface to visualize data such as companies, markets, crops, and irrigation schemes. The application uses **Leaflet** for map rendering and supports features like clustering, custom markers, and dynamic filtering.

---

## Features

- **Interactive Map**:
  - Displays companies, markets, crops, and irrigation schemes on a map.
  - Supports clustering for better performance with large datasets.
  - Custom markers for different categories.

- **Dynamic Sidebar**:
  - Toggle between different data views (e.g., companies, markets, crops).
  - Responsive design for mobile and desktop.

- **Custom Controls**:
  - Enable or disable clustering.
  - Toggle visibility of irrigation schemes.

- **Responsive Design**:
  - Fully responsive layout with a collapsible sidebar for mobile devices.

- **Data Visualization**:
  - Integrates with charts and tables to display detailed information.

---

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language.
  - [Vite](https://vitejs.dev/) - A fast build tool for modern web projects.

- **Mapping**:
  - [Leaflet](https://leafletjs.com/) - An open-source JavaScript library for interactive maps.
  - [React-Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps.
  - [React-Leaflet-MarkerCluster](https://github.com/YUzhva/react-leaflet-markercluster) - Marker clustering for Leaflet.

- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.

---

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/new-maps.git
   cd new-maps
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
new-maps/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── data/              # Static data files (e.g., companies, markets, crops)
│   ├── pages/             # Page components (e.g., Dashboard, Map)
│   ├── utils/             # Utility functions (e.g., weather fetching)
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point for the React app
│   └── index.css          # Global styles
├── .eslintrc.js           # ESLint configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies and scripts
```

---

## Available Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the production build locally.
- **`npm run lint`**: Run ESLint to check for code issues.

---

## Data Sources

The application uses static data files located in the `src/data/` directory. These include:

- **Companies**: Information about companies, including their categories and locations.
- **Markets**: Details about markets, including their LGAs and operating days.
- **Crops**: Data about crops grown in different LGAs.
- **Irrigation Schemes**: Information about irrigation schemes.

---

## Deployment

To deploy the application:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider (e.g., Netlify, Vercel, or GitHub Pages).

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [React-Leaflet](https://react-leaflet.js.org/) for providing React components for Leaflet.
- [Vite](https://vitejs.dev/) for the fast development experience.
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful and responsive design.

---

## Screenshots

### Desktop View
![Desktop View](https://via.placeholder.com/800x400?text=Desktop+View)

### Mobile View
![Mobile View](https://via.placeholder.com/400x800?text=Mobile+View)

---

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)
