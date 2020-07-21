import Home from '../pages/Home'
import AddMovie from '../components/addMovie/formAddMovie'
import { MoviesFavorites } from '../pages/moviesFavorite'
import DetailMovie  from '../pages/DetailMovie'

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/movies",
    exact: true,
    component: Home
  },
  {
    path: "/movies/:id",
    exact: true,
    component: DetailMovie
  },
  {
    path: "/add_movie",
    exact: true,
    component: AddMovie
  },
  {
    path: "/favorites",
    exact: true,
    component: MoviesFavorites
  },
];

export default routes