import axios from "axios";
import { layerServerPath } from "../config";


function UploadNonLayerFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return axios
  .post(`${layerServerPath}/api/uploadNonLayer`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  .then(res => res.data.id);
}

function GetLayerUrlFromId(id){
  return `${layerServerPath}/layer/${id}`;
}

export class Input {
  constructor(mimeType) {
    this.mimeType = mimeType;
  }

  getData() {
    throw new Error("Non Implemented");
  }
}

export class LayerInput extends Input {
  constructor(mimeType, layerId) {
    super(mimeType);
    this.layerId = layerId;
  }

  getData() {
    return GetLayerUrlFromId(this.layerId);
  }
}

export class FileInput extends Input {
  constructor(mimeType, file) {
    super(mimeType);
    this.file = file;
  }

  getData() {
    return UploadNonLayerFile(this.file).then(GetLayerUrlFromId);
  }
}
