// eslint-disable-next-line no-undef

export const endpoints = {
  user: {
    register: { method: 'POST', url: `/register` },
    reset_password: { method: 'POST', url: `/password/reset` },
    login: { method: 'POST', url: `/login` },
    logout: { method: 'POST', url: `/logout` },
    send_email_verification: { method: 'POST', url: `/email/resend` },
    send_reset_password: { method: 'POST', url: `/password/email` },
  },

  profile: {
    update: { method: 'POST', url: `/profile/update-profile?_method=PATCH` },
    change_password: { method: 'POST', url: `/profile/change-password?_method=PATCH` },
  },

  merchant: {
    product: {
      create: { method: 'POST', url: '/merchant/products' },
      update: { method: 'PUT', url: '/merchant/products' },
      delete: { method: 'DELETE', url: '/merchant/products' },
      get: { method: 'GET', url: '/merchant/products' },
    },

    product_image: {
      create: { method: 'POST', url: '/merchant/products-images' },
      get: { method: 'GET', url: '/merchant/products-images' },
      delete: { method: 'DELETE', url: '/merchant/products-images' },
    },

    coupon: {
      create: { method: 'POST', url: '/merchant/coupons' },
      get: { method: 'GET', url: '/merchant/coupons' },
      delete: { method: 'DELETE', url: '/merchant/coupons' },
    },

    account: {
      create: { method: 'POST', url: '/merchant/accounts' },
      update: { method: 'POST', url: '/merchant/accounts?_method=PUT' },
      get: { method: 'GET', url: '/merchant/accounts' },
    },

    order: {
      get: { method: 'GET', url: '/merchant/orders' },
    },

    finance: {
      get: { method: 'GET', url: '/merchant/finances' },
    },

    withdraw: {
      get: { method: 'GET', url: '/merchant/finances/withdraw' },
      create: { method: 'POST', url: '/merchant/finances/withdraw' },
    },
  },

  customer: {
    category: {
      get: { method: 'GET', url: '/categories' },
    },

    product: {
      get: { method: 'GET', url: '/product' },
    },

    merchant: {
      get: { method: 'GET', url: '/merchant/detail' },
    },

    checkout: {
      update_shipping: { method: 'POST', url: '/checkout/shipping' },
      get_courier_services: { method: 'POST', url: '/get-courier-services' },
      validate_coupon: { method: 'POST', url: '/checkout/coupon/validate' },
      submit_checkout: { method: 'POST', url: '/checkout/payment' },
    },

    order: {
      get: { method: 'GET', url: '/orders' },
    },
  },
}
