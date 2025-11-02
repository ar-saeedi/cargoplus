import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create client with placeholder values if env vars are missing
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && 
         supabaseAnonKey !== 'placeholder-key'
}

// Auth helpers
export const auth = {
  signUp: async ({ email, password, fullName, phone, userType = 'buyer', companyName, businessType, address, city }) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured. Please add your credentials to .env file')
      return { data: null, error: new Error('Supabase not configured') }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          user_type: userType,
          company_name: companyName,
          business_type: businessType,
          address: address,
          city: city,
        }
      }
    })
    return { data, error }
  },

  signIn: async ({ email, password }) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured. Please add your credentials to .env file')
      return { data: null, error: new Error('Supabase not configured') }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

