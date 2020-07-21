import React from 'react'
import { Card } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useApolloClient } from "@apollo/react-hooks"
import { red } from '@material-ui/core/colors'

export default function DetailMovie() {
    const { id } = useParams()
    const client = useApolloClient();
    const movie = client.cache.data.data[`movie:${id}`]
    console.log('movie: ', movie);
    console.log('client: ', client.cache.data.data[`movie:${id}`]);
    return (
        <>
            <Card style={{ height: '90vh', display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 2, padding: 16, justifyContent: 'center' }}>
                    <img src={movie.poster_path} />
                </div>
                <div style={{ flex: 10, marginLeft: 8 }}>
                    <div>

                        <h2>Detail Movie</h2>
                        <h4>Title : {movie.title}</h4>
                        <div>
                            <h4>Rating : {movie.popularity}</h4>
                            <h4>Tags :
                            <span style={{ display: 'flex', flexDirection: 'row' }}>
                                    {movie.tag.json.map((t, i) => {
                                        return (
                                            <h4 key={i} style={{ padding: 4, backgroundColor: 'red', marginRight: 4, borderRadius: 6 }}>{t}</h4>
                                        )
                                    })}
                                </span>
                            </h4>
                        </div>
                        <div>
                            <h4>Description</h4>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
