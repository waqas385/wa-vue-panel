import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresGuest: true } // Prevent logged-in users from accessing login page
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { 
      requiresAuth: true,
      adminOnly: true // Optional: add admin-only protection
    }
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  // 404 page or redirect
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Authentication guard
router.beforeEach((to, from, next) => {
  // Get authentication status from localStorage
  const token = localStorage.getItem('admin_token')
  const user = localStorage.getItem('admin_user')
  
  const isAuthenticated = Boolean(token)
  
  // Check if user is admin (if needed)
  let isAdmin = false
  if (user) {
    try {
      const userData = JSON.parse(user)
      isAdmin = userData.role === 'admin'
    } catch {
      isAdmin = false
    }
  }

  // Pages that require authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Not logged in - redirect to login
      next('/login')
    } else if (to.meta.adminOnly && !isAdmin) {
      // Logged in but not admin - redirect to login or show error
      console.warn('Non-admin user attempted to access admin route')
      next('/login')
    } else {
      // Logged in and authorized - allow access
      next()
    }
  }
  // Pages that require guest (non-authenticated) status
  else if (to.meta.requiresGuest && isAuthenticated) {
    // Already logged in - redirect to dashboard
    next('/dashboard')
  }
  // Public pages
  else {
    next()
  }
})

// Optional: Clear sensitive data on page refresh if not "Remember Me"
router.beforeResolve((to, from, next) => {
  const rememberedEmail = localStorage.getItem('remembered_admin_email')
  
  // If no remembered email exists and user closes/reopens browser,
  // we should clear the token (handled by browser closing event in LoginPage)
  // This is just an additional check
  if (!rememberedEmail && !to.meta.requiresGuest) {
    // Could add logic to check token expiration here
  }
  
  next()
})

export default router