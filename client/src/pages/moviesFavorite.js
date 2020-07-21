import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_FAVORITE_MOVIES } from '../queries/index'
import { Loading } from '../components/loading'
import MediaCard from '../components/utils/card'

export const MoviesFavorites = () => {
    const { loading, error, data } = useQuery(GET_FAVORITE_MOVIES);
    console.log('data: ', data);

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <div style={{ maxHeight: '100vh' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h4>Movies Favorites</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'inherit', overflowY: 'scroll' }}>
                    {data.favoriteMovies.map(movie => {
                        return (
                            <MediaCard key={movie._id} movie={movie} style={{ margin: '2px' }} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MoviesFavorites
