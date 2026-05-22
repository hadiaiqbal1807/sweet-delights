"use client";
import Link from 'next/link';
import { ShoppingCart, Store } from 'lucide-react';

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Store size={28} color="#ea580c" />
        <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#292524', fontStyle: 'italic' }}>
          Sweet Delights
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#57534e', fontWeight: '600' }}>Home</Link>
        <Link href="/admin" style={{ textDecoration: 'none', color: '#57534e', fontWeight: '600' }}>Manage</Link>
        
        {/* Cart Icon with Counter */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <ShoppingCart size={26} color="#1c1917" />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-10px',
              backgroundColor: '#ea580c',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
              borderRadius: '50%',
              padding: '2px 6px'
            }}>
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}