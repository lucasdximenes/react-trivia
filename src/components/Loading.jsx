/* eslint-disable max-len */
import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-b-8 border-white" />
      </div>
    );
  }
}
