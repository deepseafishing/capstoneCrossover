import React, { Component } from 'react';
import { db } from '~/fire';

export default class Stories extends Component {
  constructor(props) {
    super();
    this.state = {
      user: {},
      stories: [],
      scenes: [],
    };
  }

  componentDidMount() {
    db
      .collection('stories')
      .onSnapshot(snapshot => this.setState({ stories: snapshot.docs }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.currentUser });
  }

  render() {
    if (!this.state.stories) return 'Loading...';
    return this.state.stories.map((story) => {
      const id = story.data().id;
      const thumbnail = story.data().thumbnail || '/default.png'; // default image if no scenes exist

      return (
        <div className="story" key={id}>
          <a href={`/stories/${id}`}>
            <img className="story-thumbnail" src={thumbnail} width="300em" />
          </a>
          <div className="story-content">
            <h2 className="story-content-title">
              <a className="story-content-title" href={`/stories/${id}`}>
                {story.data().title}
              </a>
            </h2>
            <p className="story-content-description">{story.data().description}</p>
          </div>
        </div>
      );
    });
  }
}
