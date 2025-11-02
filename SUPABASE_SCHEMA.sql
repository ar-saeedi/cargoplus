-- ============================================
-- CargoPlus Marketplace Database Schema
-- Two-Sided Marketplace: Buyers & Vendors
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. VENDORS TABLE
-- Stores vendor/company information
-- ============================================
CREATE TABLE vendors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT NOT NULL,
  business_type TEXT NOT NULL, -- manufacturer, wholesaler, retailer, distributor, importer
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  
  -- Contact Info
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  
  -- Ratings & Stats
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  response_time TEXT DEFAULT '24 ساعت',
  
  -- Status
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. PRODUCTS TABLE
-- Products listed by vendors
-- ============================================
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  
  -- Basic Info
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  
  -- Pricing
  price DECIMAL(12, 2) NOT NULL,
  original_price DECIMAL(12, 2),
  min_order INTEGER DEFAULT 1,
  
  -- Inventory
  stock INTEGER DEFAULT 0,
  is_in_stock BOOLEAN DEFAULT true,
  
  -- Media
  images TEXT[], -- Array of image URLs
  
  -- Specifications
  specifications JSONB DEFAULT '{}',
  
  -- Stats
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'draft', -- draft, published, out_of_stock
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. ORDERS TABLE
-- Customer orders
-- ============================================
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL,
  
  -- Pricing
  subtotal DECIMAL(12, 2) NOT NULL,
  shipping_cost DECIMAL(12, 2) DEFAULT 0,
  discount DECIMAL(12, 2) DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed
  payment_method TEXT NOT NULL, -- online, cod
  
  -- Shipping
  shipping_address JSONB NOT NULL,
  tracking_number TEXT,
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. ORDER ITEMS TABLE
-- Items in each order
-- ============================================
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  vendor_id UUID REFERENCES vendors(id),
  
  quantity INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL, -- Price at time of order
  subtotal DECIMAL(12, 2) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. FAVORITES TABLE
-- User favorite products
-- ============================================
CREATE TABLE favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ============================================
-- 6. ADDRESSES TABLE
-- User shipping addresses
-- ============================================
CREATE TABLE addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL, -- Home, Work, etc.
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  
  is_default BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. REVIEWS TABLE
-- Product reviews by buyers
-- ============================================
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  vendor_id UUID REFERENCES vendors(id),
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images TEXT[], -- Optional review images
  
  is_verified_purchase BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. CATEGORIES TABLE
-- Product categories
-- ============================================
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_fa TEXT NOT NULL, -- Persian name
  slug TEXT UNIQUE NOT NULL,
  icon TEXT, -- Emoji or icon name
  parent_id UUID REFERENCES categories(id),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================

-- Products indexes
CREATE INDEX idx_products_vendor ON products(vendor_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;

-- Orders indexes
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Order items indexes
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_order_items_vendor ON order_items(vendor_id);

-- Reviews indexes
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_vendor ON reviews(vendor_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- VENDORS Policies
CREATE POLICY "Vendors are viewable by everyone" ON vendors
  FOR SELECT USING (true);

CREATE POLICY "Users can create vendor profile" ON vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Vendors can update their own profile" ON vendors
  FOR UPDATE USING (auth.uid() = user_id);

-- PRODUCTS Policies
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (status = 'published' OR status = 'out_of_stock' OR status IS NULL OR true);

CREATE POLICY "Vendors can insert their own products" ON products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM vendors WHERE vendors.id = vendor_id AND vendors.user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can update their own products" ON products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM vendors WHERE vendors.id = vendor_id AND vendors.user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can delete their own products" ON products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM vendors WHERE vendors.id = vendor_id AND vendors.user_id = auth.uid()
    )
  );

-- ORDERS Policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ORDER ITEMS Policies
CREATE POLICY "Users can view order items of their orders" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_id AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can view their product order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vendors WHERE vendors.id = vendor_id AND vendors.user_id = auth.uid()
    )
  );

-- FAVORITES Policies
CREATE POLICY "Users can view their own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- ADDRESSES Policies
CREATE POLICY "Users can view their own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- REVIEWS Policies
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- CATEGORIES Policies
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (is_active = true OR true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA - Categories
-- ============================================
INSERT INTO categories (name, name_fa, slug, icon) VALUES
  ('Women''s Clothing', 'پوشاک زنانه', 'women', '👗'),
  ('Men''s Clothing', 'پوشاک مردانه', 'men', '👔'),
  ('Electronics', 'لوازم الکترونیکی', 'electronics', '📱'),
  ('Shoes', 'کفش', 'shoes', '👟'),
  ('Bags', 'کیف', 'bags', '👜'),
  ('Home Appliances', 'لوازم خانگی', 'home', '🏠'),
  ('Sports', 'ورزش و سرگرمی', 'sports', '⚽'),
  ('Toys', 'اسباب بازی و کودک', 'toys', '🧸'),
  ('Beauty', 'زیبایی و سلامت', 'beauty', '💄'),
  ('Industrial', 'محصولات صنعتی', 'industrial', '🏭');

-- ============================================
-- STORAGE BUCKETS (Run in Supabase Dashboard)
-- ============================================

-- In Supabase Dashboard > Storage:
-- 1. Create bucket: 'products' (Public)
-- 2. Create bucket: 'vendors' (Public)
-- 3. Create bucket: 'reviews' (Public)

-- Storage Policies (Run after creating buckets):

-- Allow anyone to read product images
CREATE POLICY "Public product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

-- Allow vendors to upload their product images
CREATE POLICY "Vendors can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products' AND auth.uid() IS NOT NULL);

-- Allow vendors to delete their product images
CREATE POLICY "Vendors can delete their product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products' AND auth.uid() IS NOT NULL);

-- ============================================
-- HELPFUL QUERIES
-- ============================================

-- Get vendor by user_id
-- SELECT * FROM vendors WHERE user_id = auth.uid();

-- Get all products for a vendor
-- SELECT * FROM products WHERE vendor_id = (SELECT id FROM vendors WHERE user_id = auth.uid());

-- Get order with items
-- SELECT o.*, json_agg(oi.*) as items 
-- FROM orders o 
-- LEFT JOIN order_items oi ON o.id = oi.order_id 
-- WHERE o.user_id = auth.uid() 
-- GROUP BY o.id;

-- ============================================
-- NOTES FOR TOMORROW
-- ============================================

/*
SETUP STEPS:

1. Create Supabase Project
   - Go to https://supabase.com
   - Create new project
   - Wait for setup

2. Run This SQL
   - Go to SQL Editor
   - Copy all SQL above
   - Execute

3. Create Storage Buckets
   - Go to Storage
   - Create: products (public)
   - Create: vendors (public)
   - Create: reviews (public)

4. Get Credentials
   - Settings → API
   - Copy Project URL
   - Copy anon/public key

5. Update Frontend .env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key

6. Rebuild & Redeploy
   - cd frontend
   - yarn build
   - Upload new dist/ to server

DONE! ✅
*/

