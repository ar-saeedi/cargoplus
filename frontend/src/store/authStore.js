import { create } from 'zustand'
import { auth } from '../lib/supabase'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isLoading: false 
  }),
  
  login: async ({ email, password }) => {
    const { data, error } = await auth.signIn({ email, password })
    if (!error && data.user) {
      set({ user: data.user, isAuthenticated: true })
    }
    return { data, error }
  },
  
  register: async ({ email, password, fullName, phone }) => {
    const { data, error } = await auth.signUp({ email, password, fullName, phone })
    if (!error && data.user) {
      set({ user: data.user, isAuthenticated: true })
    }
    return { data, error }
  },
  
  logout: async () => {
    const { error } = await auth.signOut()
    if (!error) {
      set({ user: null, isAuthenticated: false })
    }
    return { error }
  },
  
  checkAuth: async () => {
    const { user, error } = await auth.getUser()
    set({ 
      user: error ? null : user, 
      isAuthenticated: !!user,
      isLoading: false 
    })
  }
}))

