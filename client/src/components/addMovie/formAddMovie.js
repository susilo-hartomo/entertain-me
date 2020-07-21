import React, { useState } from 'react'
import { Card, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CREATE_MOVIE, GET_MOVIES } from '../../queries/index'
import { useMutation } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '550px',
        },
    },
    card: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default function AddMovie() {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [poster_path, setPoster_path] = useState("");
    const [popularity, setPopularity] = useState(null);
    const [tag, setTag] = useState([]);

    const submitMovie = async () => {
        await addMovie({
            variables: {
                title,
                overview,
                poster_path,
                popularity: Number(popularity),
                tag,
            },
            refetchQueries : [ { query: GET_MOVIES }]
        });
    }

    const [addMovie] = useMutation(CREATE_MOVIE, {});



    return (
        <>
            <Card className={classes.card}>
                <h2>Form Add Movie</h2>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                    <TextField id="outlined-basic" label="Overview" variant="outlined" onChange={(e) => setOverview(e.target.value)} />
                    <TextField id="outlined-basic" label="Poster Path" variant="outlined" onChange={(e) => setPoster_path(e.target.value)} />
                    <TextField id="outlined-basic" label="Popularity" variant="outlined" onChange={(e) => setPopularity(e.target.value)} />
                    <TextField id="outlined-basic" label="Tags" variant="outlined" onChange={(e) => setTag(e.target.value.split(','))} />
                    <Link to='/movies'>
                        <Button type='button' variant="contained" color="primary" onClick={() => submitMovie()}>
                            Submit
                        </Button>
                    </Link>

                </form>
            </Card>
        </>
    )
}
