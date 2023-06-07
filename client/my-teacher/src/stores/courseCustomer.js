import { defineStore } from 'pinia'
import axios from 'axios'

export const useCourseCustomerStore = defineStore('courseCustomer', {
  state: () => ({
    url: 'http://localhost:3000',
    courses: [],
    course: {},
    currentPath: 'favorite'
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    async getAllCourseCustomer() {
      try {
        let courses = await axios({
          method: 'get',
          url: this.url + `/customer/courses`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.courses = courses.data
      } catch (error) {
        console.log(error)
      }
    },
    async getDetailCourse(id) {
      try {
        let course = await axios({
          method: 'get',
          url: this.url + `/customer/courses/` + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(course)
        this.course = course.data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
