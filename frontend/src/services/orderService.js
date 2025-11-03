import { supabase } from '../lib/supabase'
import { clearCart } from './cartService'

/**
 * Order Service - Handle order operations
 */

/**
 * Create order from cart
 */
export async function createOrder(userId, orderData) {
  try {
    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        order_number: orderNumber,
        subtotal: orderData.subtotal,
        shipping_cost: orderData.shippingCost,
        discount: orderData.discount || 0,
        total: orderData.total,
        status: 'pending',
        payment_status: 'pending',
        payment_method: orderData.paymentMethod,
        shipping_address: orderData.shippingAddress,
        notes: orderData.notes,
        shipping_method_id: orderData.shippingMethodId,
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items from cart
    const orderItems = orderData.cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      vendor_id: item.vendor_id,
      product_name: item.product?.name_fa || item.product?.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    // Create initial status history
    await supabase
      .from('order_status_history')
      .insert({
        order_id: order.id,
        status: 'pending',
        notes: 'سفارش ثبت شد',
        location: 'سیستم',
      })

    // Clear user's cart
    await clearCart(userId)

    return { success: true, data: order }
  } catch (error) {
    console.error('Error creating order:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get user's orders
 */
export async function getUserOrders(userId) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(
          *,
          product:products(name_fa, images),
          vendor:vendors(company_name, is_international, country)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error getting orders:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId, userId) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(
          *,
          product:products(name_fa, images),
          vendor:vendors(company_name, city, country, phone, is_international)
        ),
        history:order_status_history(*)
      `)
      .eq('id', orderId)
      .eq('user_id', userId)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error getting order:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId, status, notes = '') {
  try {
    // Update order
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date() })
      .eq('id', orderId)

    if (orderError) throw orderError

    // Add status history
    await supabase
      .from('order_status_history')
      .insert({
        order_id: orderId,
        status,
        notes,
      })

    return { success: true }
  } catch (error) {
    console.error('Error updating order status:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get shipping methods
 */
export async function getShippingMethods() {
  try {
    const { data, error } = await supabase
      .from('shipping_methods')
      .select('*')
      .eq('is_active', true)
      .order('base_price', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error getting shipping methods:', error)
    return { success: false, error: error.message }
  }
}

