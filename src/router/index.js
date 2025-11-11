import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SubjectsList from '../views/SubjectsList.vue';
import QuizOptions from '../views/QuizOptions.vue';
import Quiz from '../views/Quiz.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/subjects',
    name: 'SubjectsList',
    component: SubjectsList
  },
  {
    path: '/quiz-options/:subjectId',
    name: 'QuizOptions',
    component: QuizOptions,
    props: true
  },
  {
    path: '/quiz/:subjectId',
    name: 'Quiz',
    component: Quiz,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
