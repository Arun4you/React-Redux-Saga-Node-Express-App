import React, {
  Component, Fragment
} from 'react'
import { connect } from "react-redux";
import { Image, Comments } from './../components'
import { incrementLikes, loadImageDetail, submitComments, onLoadComments, deleteComments } from './../store/actions'
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import CommentFields from './../components/CommentFields'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { ErrorHandler } from "./../components";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  commentSection: {
    marginLeft: "50px"
  },
  button: {
    margin: theme.spacing.unit,
  }
});

export class ImageDetail extends Component {

  state = {
    username: '',
    comment: '',
    deleteHover: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCommentSubmit = (e) => {
    e.preventDefault()
    const comment = {
      username: this.state.username,
      comment: this.state.comment
    }
    const id = this.props.match.params.image_id
    this.props.submitComments(id, comment)
    this.setState({
      username: '',
      comment: ''
    })
  }

  handleOut = (e) => {
    this.setState(prevState => ({
      deleteHover: ''
    }))
  }

  handleOver = (e) => {
    this.setState(prevState => ({
      deleteHover: e
    }))
  }

  handleCommentDelete = (e) => {
    const commentId = e.currentTarget.id
    const { photo } = this.props.comments
    this.props.deleteComments(commentId, photo)
  }

  handleLikes = (e) => {
    const id = e.currentTarget.id
    this.props.incrementLikes(id, 'IMAGEDETAIL')
  }

  handleComment = (e, comment) => {
    const id = e.currentTarget.id
    this.props.submitComments(id, comment)
  }

  componentDidMount = () => {
    const id = this.props.match.params.image_id
    this.props.loadImageDetails(id)
    this.props.onLoadComments(id)
  }

  render() {
    const { classes, image, comments, isLoading, isError } = this.props;
    const { deleteHover } = this.state
    if (isLoading.IMAGEDETAIL) {
      return <h1>Loading</h1>
    }
    if (isError.IMAGEDETAIL) {
      return <h1>Something went wrong</h1>
    }

    return (
      <Fragment>
        <Link to='/'>
          <Button variant="outlined" color="primary" className={classes.button}>
            <ArrowBackIos />
          </Button>
        </Link>

        <Grid container className={classes.root} spacing={0} >
          <Grid item xs={12} sm={6} lg={6}>
            <ErrorHandler render={() => <div className="error">Error Loading Images.</div>}>
              <Image key={image._id} allComments={comments} image={image} handleLikes={this.handleLikes} handleComment={this.handleComment} />
            </ErrorHandler>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <div className={classes.commentSection}>
              <ErrorHandler render={() => <div className="error">Error Loading Comments.</div>}>
                <Comments
                  handleCommentDelete={this.handleCommentDelete}
                  handleOut={this.handleOut}
                  handleOver={this.handleOver}
                  allComments={comments}
                  classes={classes}
                  deleteButton={deleteHover}
                />
              </ErrorHandler>
              <CommentFields
                username={this.state.username}
                comment={this.state.comment}
                classes={classes}
                handleChange={this.handleChange}
                onCommentSubmit={this.onCommentSubmit}
              />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ image, comments, isLoading, isError }) => ({
  image,
  comments,
  isLoading,
  isError
})

const mapDispatchToProps = dispatch => ({
  loadImageDetails: (id) => dispatch(loadImageDetail(id)),
  onLoadComments: (id) => dispatch(onLoadComments(id)),
  submitComments: (id, comment) => dispatch(submitComments(id, comment)),
  deleteComments: (commentId, photoId) => dispatch(deleteComments(commentId, photoId)),
  incrementLikes: (id, page) => dispatch(incrementLikes(id, page)),
})

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageDetail)) 