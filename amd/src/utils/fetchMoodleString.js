// fetchLanguageString.js
import { ref, onBeforeMount } from 'vue'

/**
 * Fetches a language string using Moodle's core/str.get_string function, with lifecycle management.
 *
 * @param {String} getString - The key of the language string to fetch.
 * @param {String} altString - The fallback string to use if the language string is not found.
 * @param {String} component - The Moodle component (e.g., 'local_moddesigner').
 * @returns {Object} - A Vue ref containing the fetched language string, reactive and automatically updated.
 */
export function useFetchMoodleString(getString, altString, component = 'local_moddesigner') {
  const fetchedString = ref('') // Reactive variable for the string

  // Lifecycle hook that runs before the component is mounted
  onBeforeMount(() => {
    if (import.meta.env.MODE === 'production') {
      require(['core/str'], function (str) {
        str
          .get_string(getString, component)
          .done(function (result) {
            fetchedString.value = result // Update the reactive value
          })
          .fail(function () {
            fetchedString.value = altString // Use fallback if the fetch fails
          })
      })
    } else {
      // Optionally, provide a fallback string during development
      fetchedString.value = altString || 'Development mode: string not loaded'
    }
  })

  // Return the reactive fetched string
  return fetchedString
}
