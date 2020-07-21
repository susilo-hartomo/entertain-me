import React from 'react'
import { Loading } from '../loading'
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES } from '../../queries'
import MediaCard from '../utils/card'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function Movies() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Loading />;
  if (error) return <p>Error : 404</p>;

  return (
    <>
      <div style={{maxHeight: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <h4>List Movies</h4>
          <div style={{ color: 'fff' }}>
            <Button variant="contained" color="primary" style={{ color: 'fff' }}>
              <Link to='/add_movie' style={{ color: '#fff' }}>Add Movie</Link>
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'inherit', overflowY: 'scroll' }}>
          {data.movies.map(movie => {
            return (
              <MediaCard key={movie._id} movie={movie} style={{ margin: '2px' }} />
            )
          })}
        </div>
      </div>
    </>
  )
}
