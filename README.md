# Sales Savvy - E-commerce Platform

A modern, responsive full-stack E-commerce web application designed to provide a premium shopping experience for everyday objects, apparel, and home accessories.

## About the Project

Sales Savvy is a beautifully crafted e-commerce platform built to demonstrate a seamless end-to-end shopping journey. It features an intuitive user interface with categorized product browsing, a persistent shopping cart, and a secure checkout process. The platform is integrated with Supabase for robust backend services, including authentication, database management, and Row Level Security (RLS) to ensure data privacy between users. Stripe is integrated to handle secure payment tokenization.

### ✨ Key Features

- **User Authentication**: Secure sign-up and login powered by Supabase Auth.
- **Product Catalog**: Browse products by categories (Apparel, Accessories, Home, Objects).
- **Shopping Cart**: Add, remove, and manage quantities of items in the cart securely linked to user profiles.
- **Checkout & Payments**: Streamlined checkout flow with Stripe payment integration.
- **Order History**: Users can view their past orders and order items.
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop devices.
- **Role-Based Access**: Separation of 'admin' and 'customer' roles for future scalability.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & Shadcn UI (Radix UI primitives)
- **Routing**: React Router DOM (`react-router-dom`)
- **State Management**: TanStack React Query (`@tanstack/react-query`)
- **Backend & Database**: Supabase (PostgreSQL with Row Level Security)
- **Payments**: Stripe (`@stripe/react-stripe-js`)

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your local machine
- A Supabase account and project setup
- A Stripe developer account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Sreddy08840/Sales-Savvy-E-commerce-platform-.git
   cd Sales-Savvy-E-commerce-platform-
   ```
2. Install the dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
4. The application will start locally on `http://localhost:8080/`.

## Author

- **Sreddy08840** - [GitHub Profile](https://github.com/Sreddy08840)
