import { computed } from 'vue'
import { useCourseStore } from '@/stores/course.js'
import Activity from '@/classes/Activity.js'

export default class Week {
  constructor(name, startDate, description, activities = []) {
    this.name = name
    this.startDate = new Date(startDate)
    this.description = description
    this.activities = activities
  }

  get date() {
    const course = useCourseStore()
    const index = computed(() => course.weeks.indexOf(this))
    if (index.value === -1) {
      return course.startDate // If not found, return the original startDate
    }
    const newDate = new Date(course.startDate)
    newDate.setDate(newDate.getDate() + index.value * 7)
    return newDate
  }

  get formattedDate() {
    return this.date.toLocaleDateString('en-GB') // Format the date as dd/mm/yyyy
  }

  get activityCount() {
    if (this.activities) {
      return this.activities.length
    } else {
      return 0
    }
  }
}
