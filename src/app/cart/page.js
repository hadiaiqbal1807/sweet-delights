"use client";
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  // Total price calculate karne ke liye
  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="bg-orange-50 p-8 rounded-full mb-6">
          <ShoppingBag size={60} className="text-orange-300" />
        </div>
        <h2 className="text-3xl font-bold text-stone-800">Aapka Cart Khali Hai!</h2>
        <p className="text-stone-500 mb-10 mt-3 max-w-xs">Lagta hai aapne abhi tak koi mithas select nahi ki. Chalein kuch add karte hain!</p>
        <Link href="/" className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 transition shadow-lg">
          Wapas Menu Par Jayein
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-black text-stone-900 mb-12">My Sweet Basket 🛒</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items ki List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.cartId} className="bg-white p-6 rounded-[32px] flex items-center justify-between shadow-sm border border-stone-100 hover:border-orange-200 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-4xl">
                  {item.category === 'Cakes' ? '🎂' : '🥐'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
                  <p className="text-orange-600 font-black text-lg">Rs. {item.price}</p>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.cartId)} 
                className="p-3 bg-stone-50 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))}
        </div>

        {/* Bill Summary Card */}
        <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-stone-200/50 border border-stone-50 h-fit sticky top-28">
          <h3 className="text-2xl font-bold mb-8 text-stone-800 border-b pb-4">Order Summary</h3>
          <div className="space-y-5 mb-10">
            <div className="flex justify-between text-stone-500 font-medium">
              <span>Items Subtotal</span>
              <span>Rs. {total}</span>
            </div>
            <div className="flex justify-between text-stone-500 font-medium">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-bold underline decoration-2 underline-offset-4">FREE</span>
            </div>
            <div className="h-px bg-stone-100 my-4"></div>
            <div className="flex justify-between text-2xl font-black text-stone-900">
              <span>Total Bill</span>
              <span>Rs. {total}</span>
            </div>
          </div>
          <Link href="/checkout" className="w-full bg-orange-600 text-white py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 hover:bg-stone-900 transition-all shadow-xl shadow-orange-100 active:scale-95">
            Proceed to Checkout <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}