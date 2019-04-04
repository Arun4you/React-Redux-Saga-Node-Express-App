import React, { Component, Fragment } from 'react'
import { Image, AddImageForm, showResults } from './../components'
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { loadUserImages, incrementLikes, submitComments, addImage } from './../store/actions'
import { ErrorHandler } from "./../components";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  form: {
    padding: 15
  }
});

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      addImage: false
    }
  }

  componentDidMount() {
    this.props.loadUserImages()
  }

  addImage = () => {
    this.setState(prevState => ({
      addImage: !prevState.addImage
    }))
  }

  handleLikes = (e) => {
    const id = e.currentTarget.id
    console.log(id)
    this.props.incrementLikes(id, 'IMAGES')
  }

  handleComment = (e, comment) => {
    console.log(e.currentTarget.id)
    const id = e.currentTarget.id
    this.props.submitComments(id, comment)
  }

  handleForm = (values) => {
    console.log("onsubmit", values)
    const { caption, url, username } = values
    const imageObj = {
      caption,
      username,
      display_src: url
    }
    this.props.addImage(imageObj)
    this.setState(prevState => ({
      addImage: !prevState.addImage,
    }))
  }

  render() {
    const { addImage } = this.state;
    const { classes, images, isLoading, isError } = this.props;

    console.log(images, isLoading, isError)
    if (isLoading.IMAGES && !images.length) {
      return <h1>Loading</h1>
    }
    if (isError.IMAGES && !images.length) {
      return <h1>Something went wrong</h1>
    }
    return (
      <Fragment>
        {/* <Logo /> */}
        <Typography align='center' component="h1" variant="display1" gutterBottom onClick={this.addImage}>
          Add Image
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Typography>

        {addImage ?
          <Grid container spacing={0} justify="center" >
            <Grid item xs={6}>
              <div className={classes.form}>
                <AddImageForm onSubmit={showResults} handleForm={this.handleForm} />
              </div>
            </Grid>
          </Grid>
          : null}
        <Grid container className={classes.root}>
          {images && images.map(image => {
            return (
              <Grid item key={image._id} xs={12} sm={6} lg={3}>
                <ErrorHandler render={() => <div className="error">Error Loading Images.</div>}>
                  <Image image={image} handleLikes={this.handleLikes} handleComment={this.handleComment} />
                </ErrorHandler>
              </Grid>)
          })}
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ images, isLoading, isError }) => {
  return {
    images,
    isLoading,
    isError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserImages: () => dispatch(loadUserImages()),
    incrementLikes: (id, page) => dispatch(incrementLikes(id, page)),
    submitComments: (id, comment) => dispatch(submitComments(id, comment)),
    addImage: (value) => dispatch(addImage(value))
  };
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))