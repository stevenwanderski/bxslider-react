import React from 'react';
import ajax from 'utils/ajax';

class ImageUploader extends React.Component {
  constructor() {
    super();
    this.state = { imageUrl: null };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.props.onImageChange(this.props.slideId, this.refs.image.files[0]);
  }

  render() {
    const fileInputId = `slide-image-${this.props.slideId}`;

    return (
      <div className="image-uploader">
        <input type="file" id={fileInputId} ref="image" onChange={this.onChange} className="image-uploader__file" />
        <label htmlFor={fileInputId} className="image-uploader__label">{this.props.labelText}</label>
      </div>
    )
  }
}

ImageUploader.propTypes = {
  slideId: React.PropTypes.string,
  onImageChange: React.PropTypes.func
}

export default ImageUploader;
