import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DELETE_MOVIE, GET_MOVIES, ADD_MOVIE_TO_FAVORITE_MOVIES } from '../../queries/index'
import { useMutation } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 140,
        maxWidth: 260,
        marginRight: 12,
    },
    media: {
        height: 240,
    },
});

export default function MediaCard(props) {
    const { movie } = props
    const classes = useStyles();

    const [deleteMovie] = useMutation(DELETE_MOVIE, {});
    const [addToMovieFavorite] = useMutation(ADD_MOVIE_TO_FAVORITE_MOVIES, {});

    const deleteMovieHandle = async (id) => {
        await deleteMovie({
            variables: {
                id
            },
            refetchQueries: [{ query: GET_MOVIES }]
        })
    }

    const addToMovieFavoriteHandle = async (movie) => {
        const { _id, title, overview, poster_path, popularity, tag } = movie
        console.log('_id: ', _id);
        await addToMovieFavorite({
            variables: {
                _id,
                title,
                overview,
                poster_path,
                popularity,
                tag,
                id: _id
            },
        })
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={movie.poster_path}
                    title={movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Rating : {movie.popularity}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton onClick={() => addToMovieFavoriteHandle(movie)} size="small" aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton size="small" aria-label="share">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteMovieHandle(movie._id)} size="small" aria-label="share">
                    <DeleteIcon />
                </IconButton>
                <Button size="small" color="primary">
                    <Link to={`/movies/${movie._id}`}>
                        Detail
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
}
