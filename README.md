<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="Stripe" />

  <br />
  <br />

  <h1>🛍️ Sales Savvy</h1>
  
  <p>
    <strong>A Premium, Modern, and Responsive Full-Stack E-commerce Platform.</strong><br>
    <em>Beautifully crafted to deliver a seamless end-to-end shopping experience.</em>
  </p>

  <br />

</div>

<hr />

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Contributors](#-contributors)

---

## 🌟 About the Project

**Sales Savvy** is an advanced, production-ready e-commerce platform built to demonstrate best practices in modern web development. From an elegant frontend built with **React** and **Tailwind CSS** (via Shadcn UI) to a robust backend powered purely by **Supabase** (PostgreSQL with Row Level Security), the platform covers all essential shopping workflows. 

Whether it's browsing a categorized product catalog, securely adding items to a persistent cart, or checking out with **Stripe**, Sales Savvy provides an exceptional UX.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure sign-up/login powered by Supabase Auth with auto-assigned user roles. |
| 📦 **Product Catalog** | Browse products dynamically filtered by categories (`Apparel`, `Accessories`, `Home`, `Objects`). |
| 🛒 **Shopping Cart** | Persistent cart state securely linked to individual user profiles via Postgres RLS. |
| 💳 **Secure Checkout** | Streamlined checkout flow fully integrated with Stripe payment tokenization. |
| 📊 **Order Management** | Comprehensive order history tracking past orders and exact product snapshots. |
| 📱 **Fully Responsive** | Carefully tailored layouts optimized for mobile, tablet, and desktop viewing. |
| 🛡️ **Role-Based Access** | Built-in separation between `admin` and `customer` roles directly at the database level. |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 
- **Language**: TypeScript
- **Build Tool**: Vite (Lightning fast HMR)
- **Styling**: Tailwind CSS & Shadcn UI (accessible Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: TanStack React Query (for caching server state)

### Backend & Infrastructure
- **Database**: Supabase (PostgreSQL)
- **Security**: Supabase Row Level Security (RLS) & Triggers
- **Payments**: Stripe (`@stripe/react-stripe-js`)

---

## 🗄️ Database Schema

The platform relies on a normalized Postgres schema with strict RLS policies to guarantee data isolation:
- `auth.users` (Managed by Supabase)
- `profiles` (Auto-created on signup)
- `user_roles` (Admin / Customer mappings)
- `categories` & `products` (Publicly accessible catalog)
- `cart_items` (Strictly isolated per user)
- `orders` & `order_items` (Secure transaction history)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed/configured:
- **Node.js** (v18 or higher recommended)
- A **Supabase** account and project (for database and auth)
- A **Stripe** developer account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sreddy08840/Sales-Savvy-E-commerce-platform-.git
   cd Sales-Savvy-E-commerce-platform-
   ```

2. **Install the dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Supabase and Stripe keys:
   ```env
   VITE_SUPABASE_PROJECT_ID=your_project_id
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Explore the app**
   Open your browser and navigate to `http://localhost:8080/`.

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Sreddy08840">
        <img src="https://github.com/Sreddy08840.png" width="100px;" alt="Sreddy08840"/><br/>
        <sub><b>Sreddy08840</b></sub>
      </a><br/>
      <sub>🌱 Creator & Lead Developer</sub><br/>
      <sub>Full-Stack · Voice AI · ML Integration</sub>
    </td>
  </tr>
</table>

If you find this project helpful, consider giving it a ⭐️ on GitHub!
