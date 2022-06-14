import { writable } from 'svelte/store'

const data = {
  loading: true,
  accessToken: null,
  refreshToken: null,
  user: null,
  get accountId() {
    if (!this.accessToken) return null

    return this.user.aid
  },
  get userId() {
    if (!this.accessToken) return null

    return this.user.uid
  },
  get issuer() {
    if (!this.accessToken) return null

    return this.user.iss
  },
  get name() {
    if (!this.accessToken) return null

    return this.user.name
  },
  get email() {
    if (!this.accessToken) return null

    return this.user.email
  },
  get product() {
    if (!this.accessToken) return null

    return this.user.aud
  },
  get paymentStatus() {
    if (!this.accessToken) return null

    return this.user.st
  },
  get stripe() {
    if (!this.accessToken) return null

    return {
      customer: this.user.cus,
      subscription: this.user.sub
    }
  },
  get issuedAt() {
    if (!this.accessToken) return null

    return new Date(this.user.iat * 1000)
  },
  get expiresAt() {
    if (!this.accessToken) return null

    return new Date(this.user.exp * 1000)
  },

  load(accessToken, refreshToken) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken

    const decoded = atob(accessToken.split('.')[1])

    this.user = JSON.parse(decoded)

    if (this.expiresAt < new Date()) {
      clear()
      this.loading = false
      return
    }

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    this.loading = false
  },

  clear() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}

const auth = writable(data)

if (typeof(window) != 'undefined') {
  const url = new URL(window.location.href)

  const accessToken = url.searchParams.get('accessToken') || localStorage.getItem('accessToken')
  const refreshToken = url.searchParams.get('refreshToken') || localStorage.getItem('refreshToken')

  if (accessToken) {
    data.load(accessToken, refreshToken)
    auth.set(data)
  }
}

export default auth
