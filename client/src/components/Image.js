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
import PropTypes from 'prop-types';

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

const Image = ({ classes, image, handleLikes, redirectTo }) => {
    const { created, display_src, username, caption, charAt, likes, photo, _id } = image
    const id = photo || _id

    if (!display_src) {
        return null; 
    }

    return (
        <div onClick={()=>redirectTo(_id)} >
            <Card className={classes.card}>
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

                <CardActions className={classes.actions} disableActionSpacing>
                    <Button data-test="favouriteButtonComponent" variant="outlined" color="primary" className={classes.button} id={id} onClick={handleLikes}>
                        <FavoriteIcon /> {likes}
                    </Button>
                    <Button data-test="commentButtonComponent" variant="outlined" color="primary" className={classes.button} id={id}>
                        <CommentIcon />
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

Image.propTypes = {
    handleLikes: PropTypes.func,
    image: PropTypes.shape({
        created: PropTypes.string,
        display_src: PropTypes.string,
        username: PropTypes.string,
        caption: PropTypes.string,
        charAt: PropTypes.string,
        likes: PropTypes.number,
        photo: PropTypes.string,
        _id: PropTypes.string,
    })
}

export default withStyles(styles)(Image);
