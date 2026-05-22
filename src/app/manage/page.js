"use client";
import { useState, useEffect } from 'react';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading orders...</div>;

  return (
    <div style={{ padding: '40px', backgroundColor: '#fafaf9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '30px', color: '#292524' }}>Bakery Orders</h1>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <thead style={{ backgroundColor: '#ea580c', color: 'white' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left' }}>Customer</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Phone</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Items</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #f5f5f4' }}>
                  <td style={{ padding: '15px' }}>{order.customerName}</td>
                  <td style={{ padding: '15px' }}>{order.phone}</td>
                  <td style={{ padding: '15px' }}>
                    {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                  </td>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>Rs. {order.totalAmount}</td>
                  <td style={{ padding: '15px' }}>{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}