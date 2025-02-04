import API from "../../../api";
import ENDPOINTS from "../../../../config/apiendpoint";
import C from "../../../constants";

export default class DeleteTaskAPI extends API {
  constructor(taskId, flag, data,timeout = 2000) {
    super("DELETE", timeout, false);
    this.type = C.DELETE_TASk;
    this.data = data;
    this.flag = flag;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.task}${taskId}/delete_task/?flag=${flag}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.report = res;
    }
  }

  apiEndPoint() {
    return this.endpoint;
  }

  getBody() {
    return this.data;
  }

  getHeaders() {
    this.headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    };
    return this.headers;
  }

  getPayload() {
    return this.report;
  }
}
