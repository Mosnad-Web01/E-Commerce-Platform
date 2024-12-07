const API_URL = `${rocess.env.BASE_URL}/api`

export const endpoints = {
  user: {
    register: { method: 'POST', url: `/register` },
    reset_password: { method: 'POST', url: `/reset` },
    login: { method: 'POST', url: `/login` },
    logout: { method: 'POST', url: `${API_URL}/logout` },
    send_email_verification: { method: 'POST', url: `/email/resend` },
    send_reset_password: { method: 'POST', url: `/password/email` },
  },
  profile: {
    update: { method: 'POST', url: `/update-profile?_method=PATCH` },
    change_password: { method: 'POST', url: `/chnage-password?_method=PATCH` },
  },
  merchant: {
    product: {
      create: { method: 'POST', url: '/products' },
      update: { method: 'PUT', url: '/products' },
      delete: { method: 'DELETE', url: '/products' },
      get_all: { method: 'GET', url: '/products' },
    },
    product_image: {
      create: {
        method: 'POST',
        url: '/products-images',
      },
      get : {
        method : "GET",
        url : '/'
      }
    },
    coupon: {},
    account: {},
    order: {},
    finance: {},
    withdraw: {},
  },
}
