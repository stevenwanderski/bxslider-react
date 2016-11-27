import React from 'react';
import ajax from 'utils/ajax';
import { loggedIn, login } from 'utils/auth';
import { browserHistory } from 'react-router'
import SliderForm from 'components/slider-form';
import ProgressBar from 'components/progress-bar';

class TempSliderNewContainer extends React.Component {
  constructor() {
    super();
    this.state = { loading: false };
    this.saveSlider = this.saveSlider.bind(this);
    this.createSliderAndRedirect = this.createSliderAndRedirect.bind(this);
  }

  saveSlider(title) {
    this.setState({ loading: true });

    if (!loggedIn()) {
      this.createUser()
      .then(() => {
        this.createSliderAndRedirect(title);
      });
    } else {
      this.createSliderAndRedirect(title);
    }
  }

  createUser() {
    return ajax.post('/registrations/temp')
      .then((response) => {
        login(response.data);
      });
  }

  createSliderAndRedirect(formValues) {
    const data = { slider: formValues };
    return ajax.post('/sliders', data)
      .then((response) => {
        browserHistory.push(`/temp/slider/${response.data.id}/settings`);
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <header className="container__header container__header--temp">
          <div className="brand">
            <div className="brand__logo"></div>
            <div className="brand__name">SliderUI</div>
          </div>

          <ProgressBar activeStep={0} />
        </header>

        <div className="container__body">
          <div className="slider-new slider-new--center">
            <SliderForm
              loading={this.state.loading}
              onSubmit={this.saveSlider} />
          </div>
        </div>
      </div>
    )
  }
}

export default TempSliderNewContainer;
