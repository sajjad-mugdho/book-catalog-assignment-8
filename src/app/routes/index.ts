import express from 'express';

const router = express.Router();

const users = () => {
  console.log('test');
};
const moduleRoutes = [
  // ... routes
  {
    path: '/*',
    route: users,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
