import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { StarIcon } from '@heroicons/vue/16/solid';

export const useDesignMenuStore = defineStore('designMenu', () => {
  const items = [
    {
      label: 'File',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-download',
          command: () => { /* action when 'New' is clicked */ }
        },
        {
          label: 'Open',
          icon: 'pi pi-fw pi-download',
          command: () => { importFromFile }
        }
      ]
    },
    {
      label: 'Edit',
      items: [
        {
          label: 'Undo',
          icon: 'pi pi-fw pi-refresh',
          command: () => { /* action when 'Undo' is clicked */ }
        },
        {
          label: 'Redo',
          icon: 'pi pi-fw pi-repeat',
          command: () => { /* action when 'Redo' is clicked */ }
        }
      ]
    },
    {
      label: 'Help',
      items: [
        {
          label: 'Contents',
          icon: 'pi pi-fw pi-book',
          command: () => { /* action when 'Contents' is clicked */ }
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-search',
          command: () => { /* action when 'Search' is clicked */ }
        }
      ]
    },
    {
      label: 'Actions',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Save',
              icon: 'pi pi-fw pi-save',
              command: () => { /* action when 'Save' is clicked */ }
            },
            {
              label: 'Update',
              icon: 'pi pi-fw pi-save',
              command: () => { /* action when 'Update' is clicked */ }
            }
          ]
        },
        {
          label: 'Other',
          icon: 'pi pi-fw pi-tags',
          items: [
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-minus',
              command: () => { /* action when 'Delete' is clicked */ }
            }
          ]
        }
      ]
    },
    {
      separator: true
    },
  ];
  

  return { items }
})
