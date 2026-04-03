# FinBoard - Personal Finance Dashboard

A modern, responsive personal finance management application built with React, Redux, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Summary cards, balance trend charts, and spending breakdowns
- **Transaction Management**: Add, edit, delete, and view transactions with filtering and sorting
- **Insights & Analytics**: Monthly comparisons, spending categories, and financial insights
- **Role-Based Access**: Admin and user roles with different permissions
- **Data Export**: Export transactions to JSON or CSV formats

### Advanced Features
- **Real-time Filtering**: Filter by category, type, amount range, date range, and sort options
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Data Persistence**: Automatic localStorage saving and restoration
- **Smooth Animations**: Hover effects and transitions throughout the UI
- **Currency Support**: Dynamic currency selection with proper formatting

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FinBoard
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
client/
├── src/
│   ├── app/
│   │   └── store.js              # Redux store configuration
│   ├── components/
│   │   ├── ui/                   # Reusable UI components (shadcn/ui)
│   │   ├── BalanceChart.jsx      # Balance trend visualization
│   │   ├── CategoryChart.jsx     # Spending breakdown pie chart
│   │   ├── MonthlyChart.jsx      # Monthly income/expense comparison
│   │   ├── SummaryCards.jsx      # Financial summary cards
│   │   ├── TransactionList.jsx   # Transaction table with actions
│   │   ├── TransactionFilters.jsx # Advanced filtering component
│   │   └── Layout.jsx            # Main layout with sidebar
│   ├── features/
│   │   ├── transactionsSlice.js  # Transaction state management
│   │   ├── uiSlice.js           # UI state (currency, etc.)
│   │   └── roleSlice.js         # User role management
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard page
│   │   ├── Transactions.jsx     # Transaction management page
│   │   ├── Insights.jsx         # Analytics and insights page
│   │   └── Settings.jsx         # Application settings
│   ├── utils/
│   │   └── exportUtils.js       # Data export functionality
│   └── data/
│       └── seedData.js          # Sample transaction data
```

## 🎯 Key Features Explained

### Dashboard
- **Summary Cards**: Display total balance, income, expenses, and net savings
- **Balance Chart**: Line chart showing balance progression over time
- **Category Chart**: Pie chart visualizing spending by category

### Transactions
- **CRUD Operations**: Create, read, update, delete transactions
- **Advanced Filtering**: Filter by category, type, amount range, and date range
- **Sorting Options**: Sort by date (newest/oldest) or amount (highest/lowest)
- **Role-Based Actions**: Admin users can add/edit/delete, regular users can only view

### Insights
- **Monthly Analysis**: Bar chart comparing income vs expenses by month
- **Category Insights**: Identify highest spending categories
- **Financial Metrics**: Average transaction amounts, highest transactions

### Settings
- **Currency Selection**: Choose from multiple currencies (₹, $, €, £)
- **Role Management**: Switch between admin and user roles
- **Data Management**: Import/export transaction data
- **Export Options**: Download data as JSON or CSV files

## 🔐 Role-Based Access Control (RBAC)

### Admin Role
- Full access to all features
- Add, edit, and delete transactions
- Import transaction data
- Export data functionality

### User Role
- View-only access to dashboard and transactions
- Cannot modify transaction data
- Limited to viewing insights and analytics

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:
- **Desktop**: Full sidebar navigation, multi-column layouts
- **Tablet**: Collapsed sidebar, adjusted grid layouts
- **Mobile**: Icon-only sidebar, stacked layouts, smaller text sizes

## 🎨 Design System

- **Color Scheme**: Dark theme with blue accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent UI components using shadcn/ui
- **Animations**: Smooth hover effects and transitions
- **Glassmorphism**: Modern backdrop blur effects

## 🔄 State Management

### Redux Slices
- **transactionsSlice**: Manages transaction CRUD operations and filtering
- **uiSlice**: Handles UI preferences like currency selection
- **roleSlice**: Manages user role state

### Data Flow
1. User interactions trigger Redux actions
2. Actions update the store state
3. Components re-render based on state changes
4. Data automatically persists to localStorage

## 📊 Data Visualization

- **Recharts Integration**: Professional charts with tooltips and legends
- **Responsive Charts**: Charts adapt to container sizes
- **Interactive Elements**: Hover effects and data highlighting
- **Currency Formatting**: Dynamic currency display in all charts

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Memoization**: Expensive calculations are cached
- **Efficient Filtering**: Real-time filtering without performance impact
- **Optimized Re-renders**: Redux selectors prevent unnecessary updates

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **TypeScript-ready**: Modern JavaScript with future TS migration in mind

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide React](https://lucide.dev/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)</content>
<parameter name="filePath">README.md