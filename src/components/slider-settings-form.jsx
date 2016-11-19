import React from 'react';
import _ from 'underscore';
import Input from 'components/forms/input';
import Select from 'components/forms/select';
import Checkbox from 'components/forms/checkbox';

class SliderSettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      canSubmit: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  onInputChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.props.onInputChange(e.target.name, value);
  }

  onSubmit(model) {
    this.props.onSubmit(model);
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  buildSelectInput(builderItem, index) {
    return (
      <div className="form-row" key={index}>
        <label>{builderItem.label}</label>
        <Select
          name={builderItem.name}
          value={this.props.slider['settings'][builderItem.name]}
          options={builderItem.options}
          validations={builderItem.validations} />
      </div>
    );
  }

  buildCheckboxInput(builderItem, index) {
    return (
      <div className="form-row" key={index}>
        <label>
          <Checkbox
            name={builderItem.name}
            value={this.props.slider['settings'][builderItem.name]}
            validations={builderItem.validations}/>

          {builderItem.label}
        </label>
      </div>
    );
  }

  buildTextInput(builderItem, index) {
    return (
      <div className="form-row" key={index}>
        <label>{builderItem.label}</label>
        <Input
          name={builderItem.name}
          type={builderItem.inputType}
          value={this.props.slider['settings'][builderItem.name]}
          required={builderItem.required}
          validations={builderItem.validations}/>
      </div>
    );
  }

  buildGroupOutput(builder) {
    const groups = _.groupBy(builder.fields, 'group');
    return Object.keys(groups).map((group, index) => {

      const formInputs = groups[group].map((item, index) => {
        switch (item.inputType) {
          case 'select':
            return this.buildSelectInput(item, index);
            break;

          case 'checkbox':
            return this.buildCheckboxInput(item, index);
            break;

          default:
            return this.buildTextInput(item, index);
        }
      });

      return (
        <div className="setting-group" key={index}>
          <div className="setting-group__title">{group}</div>
          <div className="setting-group__body">
            {formInputs}
          </div>
        </div>
      );
    });
  }

  render() {
    let error;
    if (this.props.errorMessage) {
      error = <div className="form-row error">{this.props.errorMessage}</div>;
    }

    let submitText = 'Save Settings';
    if (this.props.loading) {
      submitText = 'Loading...';
    }

    const groupOutput = this.buildGroupOutput(this.props.builder);

    return (
      <Formsy.Form className="form--slider-settings" onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
        {error}

        <div className="setting-groups flex-container flex-container--wrap">
          {groupOutput}
        </div>

        <div className="form-row">
          <button disabled={!this.state.canSubmit || this.props.loading} className="button">{submitText}</button>
        </div>
      </Formsy.Form>
    );
  }
}

// SliderSettingsForm.propTypes = {
//   builder: React.PropTypes.object,
//   slider: React.PropTypes.object,
//   onSubmit: React.PropTypes.func.isRequired,
//   onInputChange: React.PropTypes.func,
//   loading: React.PropTypes.bool,
//   errorMessage: React.PropTypes.string
// }

export default SliderSettingsForm;