import React from "react";

export default class BooleanInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.checked);
  }

  render() {
    const { value } = this.props;
    return <input onChange={this.onChange} value={value} type="checkbox" />;
  }
}
