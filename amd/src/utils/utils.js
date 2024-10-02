const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Collapse consecutive dashes
}

// Function to check if the array has at least one defined item
const hasActualData = (array) => {
  return Array.isArray(array) && array.some((item) => item !== null && item !== undefined)
}

export { slugify, hasActualData }
