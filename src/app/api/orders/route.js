import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

// --- POST Function (Order Save Karne ke liye) ---
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const newOrder = await Order.create({
      customerName: data.customerInfo.name,
      phone: data.customerInfo.phone,
      address: data.customerInfo.address,
      items: data.items,
      totalAmount: data.total
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Order POST Error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

// --- GET Function (Orders dekhne ke liye) ---
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }); 
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Order GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}