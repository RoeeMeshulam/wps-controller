import React from "react";
import MimetypeDropdown from "./MimetypeDropdown";
import LayerSelector from "../LayerSelector";
import FileFormats from "../../common/FileFormats";
import { LayerInput, FileInput } from "../../common/ComplexInputs";

export default class ComplexInput extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      currentMimeType: null
    };

    this.setFormat = this.setFormat.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.onLayerChange = this.onLayerChange.bind(this);
    this.onInputFileRef = this.onInputFileRef.bind(this);
  }


  setFormat ({ mimeType }){
    if (mimeType !== this.state.currentMimeType) {
      this.changeValue(null);
    }
    this.setState({ currentMimeType: mimeType });
  };

  // in case the input has changed (for example: other process loaded) we will take the new input first format.
  // will set the first format in initializing too.
  static getDerivedStateFromProps(props, state) {
    const { currentMimeType } = state;
    const format = props.formInput.dataType.formats.filter(
      ({ mimeType }) => mimeType === currentMimeType
    )[0];

    if (!format) {
      return { currentMimeType: props.formInput.dataType.formats[0].mimeType };
    } else {
      return null;
    }
  }

  changeValue(value) {
    this.props.onChange(value ? [value] : [], this.props.index);
  }

  onLayerChange(layerId) {
    this.changeValue(new LayerInput(this.state.currentMimeType, layerId));
  };
  onFileChange(e){
    this.changeValue(
      new FileInput(this.state.currentMimeType, e.target.files[0])
    );
  };

  onInputFileRef (element) {
    this.inputFileRef = element;
  };

  render() {
    const { layers, index, formInput } = this.props;
    const { currentMimeType } = this.state;
    const isLayer =
      FileFormats.hasOwnProperty(currentMimeType) &&
      FileFormats[currentMimeType].isLayer;
    return (
      <div>
        <MimetypeDropdown
          index={index}
          onChange={this.setFormat}
          options={formInput.dataType.formats}
        />
        {isLayer ? (
          <LayerSelector
            className="layer-select"
            layers={layers}
            key={index}
            value={formInput.values[0]}
            onSelect={this.onLayerChange}
          />
        ) : (
          <input
            onChange={this.onFileChange}
            ref={this.onInputFileRef}
            type="file"
            name="file"
          />
        )}
      </div>
    );
  }
}
