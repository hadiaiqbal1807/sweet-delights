import connectDB from '@/lib/mongodb'; // Agar @ kaam nahi kar raha to purana path hi rakhein
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    
    // Agar products mil jayein to return karein
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    // Error ki surat mein khali array bhejein taaki JSON error na aaye
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    if (!data.name || !data.price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}