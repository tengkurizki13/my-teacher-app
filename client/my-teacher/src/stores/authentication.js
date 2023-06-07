import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    url: 'http://localhost:3000',
    email: '',
    password: ''
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    async register() {
      try {
        let registerCustomer = await axios({
          method: 'post',
          url: this.url + `/customer/register`,
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.router.push('/login')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'register successfully',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.message}`
        })
      }
    },
    async login() {
      try {
        let loginCustomer = await axios({
          method: 'post',
          url: this.url + `/customer/login`,
          data: {
            email: this.email,
            password: this.password
          }
        })

        localStorage.setItem('access_token', loginCustomer.data[0].access_token)
        this.router.push('/')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'login successfully',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.message}`
        })
      }
    },
    async sendLoginWithGoogle(response) {
      try {
        let loginCustomer = await axios({
          method: 'post',
          url: this.url + '/customer/google-sign-in',
          headers: {
            google_token: response
          }
        })

        localStorage.setItem('access_token', loginCustomer.data[0].access_token)
        this.router.push('/')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'login successfully',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.message}`
        })
      }
    },
    logout() {
      localStorage.clear()
      this.router.push('/')
    }
  }
})
