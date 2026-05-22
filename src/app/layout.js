import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
export const metadata = {
  title: 'Sweet Delights Bakery',
  description: 'Freshly baked goods delivered to you',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">
        <CartProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto py-8 px-4">
            {children}
          </main>
          <footer className="text-center py-10 text-stone-400 text-sm">
            © 2026 Sweet Delights Bakery System | Crafted with Love
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}