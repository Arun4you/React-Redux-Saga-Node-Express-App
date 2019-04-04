import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const styles = (theme) => ({
    card: {
        maxWidth: "auto",
        margin: 10,
    },
    media: {
        height: "100%",
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },
    button: {
        margin: theme.spacing.unit,
    }
});


const Image = ({ classes, image, handleLikes }) => {
    const { created, display_src, username, caption, charAt, likes, photo, _id } = image
    const id = photo || _id
    return (
        <Card className={classes.card}>
            <Link to={"/" + _id} style={{ textDecoration: 'none' }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="ReactXImage" className={classes.avatar}>
                            {charAt}
                        </Avatar>
                    }
                    title={username}
                    subheader={created}
                />
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={display_src || ' '}
                    />
                    <CardContent>
                        <Typography component="p">
                            {caption}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>

            <CardActions className={classes.actions} disableActionSpacing>
                <Button variant="outlined" color="primary" className={classes.button} id={id} onClick={handleLikes}>
                    <FavoriteIcon /> {likes}
                </Button>
                <Button variant="outlined" color="primary" className={classes.button} id={id}>
                    <CommentIcon />
                </Button>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(Image);
