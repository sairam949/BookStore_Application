# Smart Bookstore Management System

A modern, intuitive React application designed to streamline daily operations for independent bookstores and retail booksellers. The system integrates inventory control, sales processing, customer tracking, supplier management, and reporting into a unified interface.

---

## 🚀 Features

- 📊 **Interactive Dashboard**: High-level metrics tracking total catalog size, total revenue, customer count, and instant low-stock alerts.
- 📚 **Inventory Management**: Complete book catalog management including search, filtering, stock level monitoring, category tagging, and location tracking.
- 💳 **Sales & POS**: Smooth checkout flow with customer assignment, cart calculations, discount management, and transaction logging.
- 👥 **Customer Management**: Centralized customer directory tracking purchase history, contact information, and membership tiers (Standard, Student, Premium).
- 🚚 **Supplier Directory**: Vendor management tool to track publisher details, contact persons, payment terms, and vendor performance ratings.
- 📈 **Reports & Analytics**: Insights into sales performance, revenue metrics, category breakdowns, and low-stock replenishment priorities.
- ⚙️ **System Settings**: Configurable store parameters including tax rates, currency formatting, and notification settings.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://reactjs.org/)
- **Build Tool / Runner**: `react-scripts` (Create React App)
- **Styling**: Vanilla CSS with modern flexbox & grid design tokens
- **Testing**: React Testing Library & Jest

---

## 📂 Project Structure

```text
bookstore-application/
├── public/              # Static assets and index.html
├── src/
│   ├── components/      # Feature components
│   │   ├── Dashboard.js     # Business summary & quick stats
│   │   ├── Inventory.js     # Book catalog & stock management
│   │   ├── Sales.js         # POS transaction system
│   │   ├── Customers.js     # Customer profile management
│   │   ├── Suppliers.js     # Publisher & vendor directory
│   │   ├── Reports.js       # Business reports & charts
│   │   ├── Settings.js      # App preferences
│   │   └── ...             # Modals, Spinners, Headers, Notifications
│   ├── App.js           # Main app layout & global state logic
│   ├── App.css          # Application layout styles
│   └── index.js         # React DOM entry point
└── package.json         # Project metadata and dependencies
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v14.0.0 or higher) and **npm** installed on your system.

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd bookstore-application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the local development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- **`npm test`**: Launches the Jest test runner in interactive watch mode.
- **`npm run build`**: Builds the production bundle to the `build/` directory.
- **`npm run eject`**: Ejects Create React App configuration for advanced customizations.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

