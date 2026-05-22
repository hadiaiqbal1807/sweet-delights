"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon, Package } from 'lucide-react';

export default function AdminPage() {
  // 1. Image aur Stock add kar diya
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    category: 'Cakes', 
    description: '',
    image: '', 
    stock: '0' 
  });
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("✅ Delicious Item Added Successfully!");
        router.push('/');
      } else {
        alert("❌ Error adding item. Please check all fields.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <button 
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-orange-600 mb-6 hover:font-bold transition-all"
      >
        <ArrowLeft size={18} /> Back to Shop
      </button>

      <div className="bg-white rounded-[32px] shadow-2xl p-10 border border-orange-50">
        <h2 className="text-4xl font-black text-stone-800 mb-2">Inventory Management</h2>
        <p className="text-stone-500 mb-10">Add new delicious items to your bakery showcase.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-600 ml-2">Product Name</label>
            <input 
              required
              className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="e.g. Belgian Chocolate Cake"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-2">Price (Rs.)</label>
              <input 
                required
                type="number"
                className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="1200"
                value={form.price}
                onChange={(e) => setForm({...form, price: e.target.value})}
              />
            </div>
            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-2">Category</label>
              <select 
                className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
              >
                <option value="Cakes">Cakes</option>
                <option value="Bread">Bread</option>
                <option value="Pastries">Pastries</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
          </div>

          {/* Stock & Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-2 flex items-center gap-1"><Package size={14}/> Stock</label>
              <input 
                required
                type="number"
                className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="10"
                value={form.stock}
                onChange={(e) => setForm({...form, stock: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-2 flex items-center gap-1"><ImageIcon size={14}/> Image URL</label>
              <input 
                className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="Paste link here..."
                value={form.image}
                onChange={(e) => setForm({...form, image: e.target.value})}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-600 ml-2">Description</label>
            <textarea 
              required
              className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition h-32"
              placeholder="Tell customers about the taste, ingredients etc."
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
            />
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className="w-full bg-stone-900 text-white py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? "Adding..." : <><Save size={22} /> List on Website</>}
          </button>
        </form>
      </div>
    </div>
  );
}