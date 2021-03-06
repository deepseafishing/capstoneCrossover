import React, { Component } from 'react';
import firebase, { db, auth } from '~/fire';
import { Redirect } from 'react-router'; // allows us to redirect after submit

export default class AddStory extends Component {
  constructor(props) {
    super();
    this.state = {
      id: '', // unique ID of the current story (see key in handleSubmit)
      user: {}, // current logged in user
      titleInput: '', // title field input
      descriptionInput: '', // description field input
      fireRedirect: false, // sets to true after submit to allow redirect
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.currentUser });
  }

  handleChangeTitle(event) {
    // Changes the state's titleInput as user types
    this.setState({ titleInput: event.target.value });
  }

  handleChangeDescription(event) {
    // Changes the state's descriptionInput as user types
    this.setState({ descriptionInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Defining our data that we want to submit to the db
    const user = this.props.currentUser;
    const name = user.user.displayName;
    const uid = firebase.auth().currentUser.uid;
    const title = event.target.title.value;
    const description = event.target.description.value;
    const key = `${user.user.uid}${Date.now()}`; // Creates a unique ID of user's id + the current time in unix code. Purpose: so we can redirect to "/stories/key" and already have the key available to us
    this.setState({ id: key });
    // Save story to stories collection in db
    db
      .collection('stories')
      .doc(key)
      .set({
        id: key,
        title,
        description,
        userId: uid,
        userName: name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      // Save story to user>stories collection in db
      .then(() =>
        db
          .collection('users')
          .doc(user.user.uid)
          .collection('stories')
          .doc(key)
          .set({
            id: key,
            title,
            description,
          }))
      // Finally we set redirect to true (redirect happens in render below if fireRedirect on state is true)
      .then(() => this.setState({ fireRedirect: true }))
      .catch(error => console.error('Error creating story: ', error));
  }

  render() {

    // Grab current status of fireRedirect (true or false)
    const { fireRedirect } = this.state;

    return (
      <div className="add-story">
        <form className="add-story-form" onSubmit={this.handleSubmit}>
          <div className="add-story-form-group">
            <label htmlFor="name">
              <h2>Add a Story</h2>
            </label>
            <div className="add-story-form-group-b">
              <input
                value={this.state.titleInput}
                onChange={this.handleChangeTitle}
                className="add-story-form-control-title"
                type="text"
                name="title"
                placeholder="Enter a title"
                required
              />
              <input
                value={this.state.descriptionInput}
                onChange={this.handleChangeDescription}
                className="add-story-form-control-description"
                type="text"
                name="description"
                placeholder="Enter a story description (optional)"
              />
              <div className="add-story-form-group">
                <button type="submit" className="button-main">
              Create Story
                </button>
              </div>
            </div>
          </div>
        </form>
        {fireRedirect && <Redirect to={`/stories/${this.state.id}`} />}
      </div>
    );
  }
}
