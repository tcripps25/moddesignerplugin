import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import VisualiseView from '@/views/VisualiseView.vue';
import ScheduleView from '@/views/ScheduleView.vue';
import DesignView from '@/views/DesignView.vue';
import AboutView from '@/views/AboutView.vue';
import HelpView from '@/views/HelpView.vue';
import SetupView from '@/views/SetUpView.vue';
import SingleWeek from '@/components/SingleWeek.vue';
import SingleActivity from '@/components/SingleActivity.vue';
import { useCourseStore } from '@/stores/course.js';
import PublishView from '@/views/PublishView.vue';
import ActivityPlaceholder from '@/components/ActivityPlaceholder.vue';

// Set siteRoot and appPath for your application
const siteRoot = window.MOODLE_SITE_ROOT; // Base URL
const appPath = '/local/moddesigner'; // App-specific path

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: appPath + '/',
      name: 'about',
      component: AboutView
    },
    {
      path: appPath + '/help',
      name: 'help',
      component: HelpView
    },
    {
      path: '/setup',
      name: 'setup',
      component: SetupView
    },
    {
      path: '/design',
      name: 'design',
      component: DesignView,
      children: [
        {
          path: 'schedule',
          component: ScheduleView,
          name: 'schedule',
          children: [
            {
              path: ':index',
              name: 'week-detail',
              component: SingleWeek,
              props: (route) => {
                const course = useCourseStore();
                const index = parseInt(route.params.index);
                const week = course.weeks[index];
                return { index, week };
              },
              children: [
                {
                  path: ':activityIndex',
                  name: 'activity-detail',
                  component: SingleActivity,
                  props: (route) => {
                    const course = useCourseStore();
                    const activityIndex = parseInt(route.params.activityIndex);
                    const weekIndex = parseInt(route.params.index);
                    const activity = course.weeks[weekIndex].activities[activityIndex];
                    return { weekIndex, activityIndex, activity };
                  }
                },
                {
                  path: '',
                  component: ActivityPlaceholder,
                  name: 'activity-placeholder',
                  props: (route) => {
                    const course = useCourseStore();
                    const weekIndex = parseInt(route.params.index);
                    const activities = course.weeks[weekIndex].activities;
                    return { activities, weekIndex };
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/visualise',
      name: 'visualise',
      component: VisualiseView
    },
    {
      path: '/publish',
      name: 'publish',
      component: PublishView
    }
  ]
});

export default router;
