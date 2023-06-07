import { defineStore } from 'pinia'
import axios from 'axios'

export const useCourseStore = defineStore('course', {
  state: () => ({
    url: 'http://localhost:3000',
    courses: []
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    async getAllCourse() {
      try {
        let courses = await axios({
          method: 'get',
          url: this.url + `/courses`
        })
        this.courses = courses.data
      } catch (error) {
        console.log(error)
      }
    },
    async buyCourse(id) {
      try {
        const { data } = await axios({
          method: 'post',
          url: this.url + `/generate-midtrans-token`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)

        let courses = await axios({
          method: 'post',
          url: this.url + `/customer/course/` + id,
          headers: {
            access_token: localStorage.access_token
          }
        })

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'buy successfully',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
