import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import CommentIcon from '@material-ui/icons/Comment';
// import './../styles.css'

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

const CommentFields = ({ username, comment, classes, handleChange, onCommentSubmit }) => {
 
    return (
        <div className={classes.margin}>
            <form id="commentFormId" onSubmit={onCommentSubmit} className={classes.container}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        <TextField value={username} label="Username" name="username" onChange={handleChange} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <CommentIcon />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        <TextField value={comment} label="Comment" name="comment" onChange={handleChange} />
                        <input type='submit' hidden onSubmit={onCommentSubmit} />
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default withStyles(styles)(CommentFields);