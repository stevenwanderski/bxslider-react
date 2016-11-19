import React from 'react';
import { Link } from 'react-router';
import ajax from 'utils/ajax';
import { formBuilder, formDefaults } from 'form-builders/bxslider';

class SliderEditContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      slider: {}
    }

    this.onSliderSettingsFormInputChange = this.onSliderSettingsFormInputChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      let slider = response.data;
      if (!Object.keys(slider.settings).length) {
        slider.settings = formDefaults();
      }
      this.setState({ slider: slider, loading: false });
    });
  }

  onSliderSettingsFormInputChange(name, value) {
    let slider = JSON.parse(JSON.stringify(this.state.slider));
    slider['settings'][name] = value;
    this.setState({ slider: slider });
  }

  saveSettings(formValues) {
    this.setState({ sliderSettingsFormLoading: true });

    ajax.put(`/sliders/${this.props.params.id}`, { slider: this.state.slider })
    .then((response) => {
      this.setState({ sliderSettingsFormLoading: false });
    })
    .catch((error) => {
      this.setState({ sliderSettingsFormLoading: false });
    })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="slider-layout">
        <div className="slider-layout__header">
          <nav>
            <Link to={`/app/slider/${this.props.params.id}/settings`}>Settings</Link>
            <Link to={`/app/slider/${this.props.params.id}/preview`}>Preview</Link>
            <Link to={`/app/slider/${this.props.params.id}/code`}>Code</Link>
          </nav>
          <div className="slider-layout__title">Slider: {this.state.slider.title}</div>
        </div>

        {this.props.children && React.cloneElement(this.props.children, {
          slider: this.state.slider,
          onSliderSettingsFormInputChange: this.onSliderSettingsFormInputChange,
          onSliderSettingsFormSubmit: this.saveSettings,
          sliderSettingsFormLoading: this.state.sliderSettingsFormLoading,
          sliderFormBuilder: formBuilder
        })}
      </div>
    );
  }
}

export default SliderEditContainer;
