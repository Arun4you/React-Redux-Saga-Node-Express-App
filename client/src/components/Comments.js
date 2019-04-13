import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
// import '../styles.css'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
    commentSection: {
        marginLeft: "50px"
    },
    showDelete: {
        marginLeft: '10px',
    },
    hideDelete: {
        display: 'none'
    },
    button: {
        margin: theme.spacing.unit,
    }
});

const Comments = ({ allComments, classes, handleOver, handleOut, deleteButton, handleCommentDelete }) => {
    let { comments } = allComments
    if(comments === undefined){
        comments = []
    }
    return (
        <Fragment>
            <Typography variant="h3" gutterBottom>
                User comments below...
            </Typography>
            {comments.length ?
                comments && comments.map((comment) => {
                    return (
                        <Fragment key={comment._id}>
                            <Grid container spacing={0}>
                                <Grid item>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary={`${comment.username} :`}
                                            />

                                            <div className={classes.comment} onMouseOver={() => handleOver(comment._id)} onMouseOut={() => handleOut(comment._id)}>
                                                <ListItemText
                                                    secondary={comment.comment}
                                                />
                                                {/* <div className={classes.deleteComment}>
                                                <ListItemSecondaryAction>
                                                    <IconButton aria-label="Delete">
                                                        &times;
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </div> */}
                                                <div id={comment._id}
                                                    className={deleteButton === comment._id ? classes.showDelete : classes.hideDelete}
                                                    onClick={(e, comment) => handleCommentDelete(e, comment)}
                                                >
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Delete">
                                                            {/* <DeleteIcon /> */}
                                                            &times;
                                                    </IconButton>
                                                    </ListItemSecondaryAction>
                                                </div>
                                            </div>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Fragment>)
                }): <p>No Comments yet</p>}
        </Fragment>
    )
}

export default withStyles(styles)(Comments);