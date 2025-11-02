import { supabase } from '../lib/supabase'
import { translateToPersian, translateFields } from '../utils/translate'

/**
 * Vendor Service - Handles all vendor operations with auto-translation
 */

/**
 * Create or update vendor profile
 * @param {Object} vendorData - Vendor profile data
 * @param {string} language - Vendor's language (en, zh, ar, etc.)
 * @returns {Promise} - Result with translations
 */
export async function saveVendorProfile(vendorData, language = 'en') {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Translate fields to Persian if not Persian
    let translations = {}
    if (language !== 'fa') {
      translations = await translateFields({
        company_name: vendorData.companyName,
        description: vendorData.description,
        slogan: vendorData.slogan,
        display_name: vendorData.displayName || vendorData.companyName,
      }, language)
    } else {
      // Persian vendor - use same for both
      translations = {
        company_name_original: vendorData.companyName,
        company_name_fa: vendorData.companyName,
        description_original: vendorData.description,
        description_fa: vendorData.description,
        slogan_original: vendorData.slogan,
        slogan_fa: vendorData.slogan,
        display_name_original: vendorData.displayName,
        display_name_fa: vendorData.displayName,
      }
    }

    // Prepare vendor data
    const vendorRecord = {
      user_id: user.id,
      company_name: translations.company_name_original || vendorData.companyName,
      business_type: vendorData.businessType,
      description: translations.description_fa || vendorData.description,
      description_original: translations.description_original || vendorData.description,
      description_fa: translations.description_fa || vendorData.description,
      slogan: translations.slogan_original || vendorData.slogan,
      slogan_fa: translations.slogan_fa || vendorData.slogan,
      display_name: translations.display_name_original || vendorData.displayName,
      display_name_fa: translations.display_name_fa || vendorData.displayName,
      phone: vendorData.phone,
      email: vendorData.email,
      city: vendorData.city,
      address: vendorData.address,
      postal_code: vendorData.postalCode,
      country: vendorData.country,
      language: language,
      is_international: language !== 'fa',
      // Social media
      whatsapp: vendorData.whatsapp,
      telegram: vendorData.telegram,
      website: vendorData.website,
      instagram: vendorData.instagram,
      year_established: vendorData.yearEstablished,
      number_of_employees: vendorData.numberOfEmployees,
      // Logo and cover (will be uploaded separately)
      logo_url: vendorData.logoUrl,
      cover_image_url: vendorData.coverUrl,
    }

    // Upsert vendor record (insert or update)
    const { data, error } = await supabase
      .from('vendors')
      .upsert(vendorRecord, {
        onConflict: 'user_id'
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, data, translations }
  } catch (error) {
    console.error('Error saving vendor profile:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get vendor profile by user ID
 */
export async function getVendorProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle() // Use maybeSingle instead of single to avoid error on not found

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error getting vendor profile:', error)
    return { success: false, error: error.message, data: null }
  }
}

/**
 * Get vendor by ID (for public store page)
 */
export async function getVendorById(vendorId) {
  try {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('id', vendorId)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error getting vendor:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Create product with auto-translation
 */
export async function createProduct(productData, vendorLanguage = 'en') {
  try {
    // Get vendor info
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Get vendor record
    const { data: vendor } = await supabase
      .from('vendors')
      .select('id, language')
      .eq('user_id', user.id)
      .single()

    if (!vendor) throw new Error('Vendor profile not found')

    const lang = vendor.language || vendorLanguage

    // Translate product info to Persian
    let translations = {}
    if (lang !== 'fa') {
      translations = await translateFields({
        name: productData.name,
        description: productData.description,
      }, lang)
    } else {
      translations = {
        name_original: productData.name,
        name_fa: productData.name,
        description_original: productData.description,
        description_fa: productData.description,
      }
    }

    // Create product record
    const productRecord = {
      vendor_id: vendor.id,
      name: translations.name_fa || productData.name, // Always show Persian to buyers
      name_original: translations.name_original || productData.name,
      name_fa: translations.name_fa || productData.name,
      description: translations.description_fa || productData.description,
      description_original: translations.description_original || productData.description,
      description_fa: translations.description_fa || productData.description,
      category: productData.category,
      price: productData.price,
      original_price: productData.originalPrice,
      stock: productData.stock,
      min_order: productData.minOrder || 1,
      images: productData.images || [],
      specifications: productData.specifications || {},
      status: productData.status || 'published',
      language: lang,
    }

    const { data, error } = await supabase
      .from('products')
      .insert(productRecord)
      .select()
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Upload image to Supabase storage
 */
export async function uploadImage(file, path = 'products') {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${path}/${fileName}`

    const { data, error } = await supabase.storage
      .from('cargoplusstorage')
      .upload(filePath, file)

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('cargoplusstorage')
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl, path: filePath }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { success: false, error: error.message }
  }
}

