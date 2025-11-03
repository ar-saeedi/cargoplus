import { supabase } from '../lib/supabase'

/**
 * Cart Service - Handle cart operations with Supabase
 */

/**
 * Get user's cart items
 */
export async function getCartItems(userId) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*, vendor:vendors(company_name, city, country, is_international)),
        vendor:vendors(id, company_name, city, country, is_international)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error getting cart items:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Add item to cart
 */
export async function addToCart(userId, productId, quantity = 1) {
  try {
    // Get product details
    const { data: product } = await supabase
      .from('products')
      .select('price, vendor_id')
      .eq('id', productId)
      .single()

    if (!product) throw new Error('Product not found')

    // Upsert cart item
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        vendor_id: product.vendor_id,
        quantity: quantity,
        price: product.price,
      }, {
        onConflict: 'user_id,product_id'
      })
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error adding to cart:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartQuantity(cartItemId, quantity) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity, updated_at: new Date() })
      .eq('id', cartItemId)
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error updating cart:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cartItemId) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error removing from cart:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Clear entire cart
 */
export async function clearCart(userId) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error clearing cart:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Calculate shipping cost based on vendor location
 */
export function calculateShipping(cartItems) {
  let domesticCost = 0
  let internationalCost = 0
  let hasInternational = false
  let hasDomestic = false

  cartItems.forEach(item => {
    const isInternational = item.vendor?.is_international || item.vendor?.country
    
    if (isInternational) {
      hasInternational = true
      // International shipping (China → Dubai → Iran)
      if (item.vendor?.country === 'China' || item.vendor?.country === '中国') {
        internationalCost += 150000 // Sea freight base
      } else {
        internationalCost += 200000 // Other international
      }
    } else {
      hasDomestic = true
      domesticCost += 30000 // Domestic shipping
    }
  })

  return {
    domesticCost,
    internationalCost,
    totalShipping: domesticCost + internationalCost,
    hasInternational,
    hasDomestic,
    shippingDetails: {
      domestic: hasDomestic ? 'ارسال داخلی (۲-۵ روز کاری)' : null,
      international: hasInternational ? 'ارسال بین‌المللی: چین → دبی → ایران (۲۰-۳۰ روز)' : null,
    }
  }
}

