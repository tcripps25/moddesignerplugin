import '@/assets/main.css' // Import your main styles
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import 'primeicons/primeicons.css'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import AuraPreset from './presets/aura'

// Create a new Vue application instance
const app = createApp(App, {
  siteRoot: window.MOODLE_SITE_ROOT
})

// Use Pinia, Router, and PrimeVue
app.use(createPinia())
app.use(router)
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)
app.use(PrimeVue, {
  unstyled: true,
  pt: {
    ...AuraPreset,
    fieldset: {
      root: {
        class: [
          'p-[1.125rem] pt-0',
          'rounded-md',
          '!border border-surface-200 dark:border-surface-700',
          'bg-transparent dark:bg-transparent',
          'text-surface-700 dark:text-surface-0/80'
        ]
      },
      legend: ({ props }) => ({
        class: [
          'font-semibold',
          'leading-none',
          'p-0 mb-[0.375rem]',
          'rounded-md',
          'text-surface-700 dark:text-surface-0/80',
          'bg-transparent dark:bg-transparent',
          'transition-none',
          { 'hover:bg-surface-100 dark:hover:bg-surface-800': props.toggleable }
        ]
      }),
      toggleButton: ({ props }) => ({
        class: [
          'flex items-center justify-center',
          'relative',
          { 'py-2 px-3': props.toggleable },
          { 'rounded-md': props.toggleable },
          { 'text-surface-700 dark:text-surface-200 hover:text-surface-900': props.toggleable },
          { 'hover:text-surface-900 dark:hover:text-surface-100': props.toggleable },
          {
            'focus:outline-none focus:outline-offset-0 focus-visible:ring-1 focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300':
              props.toggleable
          },
          'transition-none cursor-pointer overflow-hidden select-none'
        ]
      }),
      toggleIcon: {
        class: 'mr-2 inline-block'
      },
      legendLabel: ({ props }) => ({
        class: ['flex items-center justify-center leading-none', { 'py-2 px-3': !props.toggleable }]
      }),
      content: {
        class: 'p-0'
      },
      transition: {
        enterFromClass: 'max-h-0',
        enterActiveClass:
          'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
        enterToClass: 'max-h-[1000px]',
        leaveFromClass: 'max-h-[1000px]',
        leaveActiveClass:
          'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
        leaveToClass: 'max-h-0'
      }
    }
  }
})

// Find the mounting point in the DOM
const appContainer = document.getElementById('app')

// Create a Shadow DOM
const shadowRoot = appContainer.attachShadow({ mode: 'open' })

// Create a div for the Vue app inside the Shadow DOM
const vueAppContainer = document.createElement('div')
vueAppContainer.id = 'vue-app'
shadowRoot.appendChild(vueAppContainer)

// Create a teleport target inside the Shadow DOM for modals/dialogs
const modalTarget = document.createElement('div')
modalTarget.id = 'modal-target'
shadowRoot.appendChild(modalTarget)

// Expose shadowModalTarget globally
app.config.globalProperties.$shadowModalTarget = modalTarget
// Expose appRoot globally
app.config.globalProperties.$siteRoot = window.MOODLE_SITE_ROOT || '/';  // Fallback to root if not available

// Mount the Vue app to the new container inside the Shadow DOM
app.mount(vueAppContainer)

// Function to append styles from the main document to the shadow root
function appendStylesToShadowDOM() {
  const styles = Array.from(document.querySelectorAll('style')) // Get all <style> tags from the main document
  styles.forEach((style) => {
    const styleClone = document.createElement('style') // Create a new style element
    styleClone.textContent = style.textContent // Copy the content from the main style
    shadowRoot.appendChild(styleClone) // Append to the Shadow DOM
  })
}

// Call the function to append styles
appendStylesToShadowDOM()
