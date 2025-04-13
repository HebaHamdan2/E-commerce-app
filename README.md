# E-Commerce App

A modern, responsive E-commerce web application built with **React (Vite + TypeScript)** on the frontend and **Node.js + Express.js** on the backend. This project demonstrates full-stack development with robust user interaction, product management, authentication, and order handling.

##  Features

###  Home Page
- **Carousel Section (Browse By Category)**: Clickable categories that navigate to corresponding product pages.
- **Explore Our Products Section**: Displays up to 8 featured product cards with quick links to product details.

###  Product Details Page
- Detailed product view with images, price, description, and quantity selection.
- Options to **Add to Cart** or **Add to Wishlist**.
- **Reviews Section**:
  - View customer reviews.
  - Logged-in users can leave a **single review per product** (only if they’ve purchased and received it).
  - Edit or delete their own review.

###  Authentication
- **Sign Up / Login** with a global AuthContext.
- **Forgot Password** functionality on the login page to reset the password by sending a verification code to the user's email.

###  User Dashboard
- **Manage Account**: Edit profile information (name, address, phone) and change password.
- **Order History**: Displays all user orders with statuses, with the ability to cancel pending orders.
- **My Reviews**: Displays all user reviews across products with options to preview or delete.
- **Logout**

###  Wishlist
- Wishlist functionality is available for both logged-in and guest users (data is stored in localStorage).

###  State Management & API Integration
- **AuthContext** for handling authentication.
- **Redux Toolkit** for cart state management.
- **RTK Query** for fetching data (categories, products ).

###  Styling & Components
- **Tailwind CSS** for rapid UI development.
- **DaisyUI** for prebuilt UI components (e.g., carousels).
- Custom **404 Not Found Page** that redirects users to the homepage for undefined routes.

---

## Tech Stack

### Frontend
- **React 19** + **Vite**
- **TypeScript**
- **React Router DOM v7**
- **Redux Toolkit** and **RTK Query**
- **React Hook Form**
- **Tailwind CSS** + **DaisyUI**
- **Yup** (for validation)
- **Axios**
- **JWT Decode**
- **React Hot Toast**

### Backend
- **Node.js**
- **Express.js**  
> See the [Backend Repo](https://github.com/HebaHamdan2/E-commerce-app) for details.

---

## 🎨 UI/UX Design

This project is based on a beautiful design created in Figma:  
[Full E-Commerce Website UI/UX Design – Community](https://www.figma.com/design/MVhdDQh3iOfwjUd00RTS0c/Full-E-Commerce-Website-UI-UX-Design--Community-?node-id=34-213&t=Pe8m0vruGFSLqkXu-0)

---
## Contributing
Contributions are welcome to improve features and impact. Feel free to fork, submit pull requests, or suggest ideas!
