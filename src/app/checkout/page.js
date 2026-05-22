"use client";
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    clearCart();
  };

  if (done) {
    return (
      <div className="text-center py-32 px-4 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8 text-green-500">
          <CheckCircle2 size={100} strokeWidth={1.5} />
        </div>
        <h2 className="text-5xl font-black text-stone-900 mb-4">Order Confirmed!</h2>
        <p className="text-xl text-stone-500 mb-10">Aapka fresh cake jald hi aapke darwazay par hoga. 🍰</p>
        <button onClick={() => window.location.href = '/'} className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-bold">Wapas Home Par Chalein</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
       <h1 className="text-4xl font-black mb-10">Delivery Details 🏠</h1>
       <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] shadow-xl space-y-6 border border-stone-100">
          <div className="space-y-2">
             <label className="text-sm font-bold text-stone-600 px-2">Full Name</label>
             <input required className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition" placeholder="Hadia Iqbal" />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-bold text-stone-600 px-2">Phone Number</label>
             <input required className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition" placeholder="0300-1234567" />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-bold text-stone-600 px-2">Delivery Address</label>
             <textarea required className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition h-32" placeholder="Street no, House no, Area..."></textarea>
          </div>
          <button className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-stone-900 transition shadow-lg shadow-orange-100">
            Confirm Order Now 🥐
          </button>
       </form>
    </div>
  );
}