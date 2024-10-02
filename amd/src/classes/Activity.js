import { useCourseStore } from '@/stores/course.js'

export default class Activity {
  constructor(
    title,
    instructions,
    duration,
    isGroup,
    mode,
    color,
    selectedTypes,
    selectedAlignments,
    selectedMoodle
  ) {
    this.title = title
    this.instructions = instructions
    this.duration = duration
    this.isGroup = isGroup
    this.mode = mode
    this.color = this.getColor()
    this.selectedTypes = []
    this.selectedAlignments = []
    this.selectedMoodle = []
  }

  getColor() {
    const course = useCourseStore()
    const color = course.getActivityColor()

    return color
  }
}
