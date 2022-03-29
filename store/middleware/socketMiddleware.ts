import { Dispatch } from "redux";
import { RootState } from "../index";

//? Here can be any dispatch to open a connection
const INIT_KEY = "user/setUserSetting";

interface SocketMiddlewareParams {
  dispatch: Dispatch;
  getState: () => RootState;
}

const socketMiddleware = (socket: any) => {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;

    if (type === INIT_KEY) {
      socket.connect();

      //& Example ON
      socket.on("user/connect", (socketIds: any) => {
        socket.emit("sync", socketIds);
      });
    }

    switch (type) {
      //& Example EMIT
      case "user/disconnect": {
        socket.emit("userLeave", payload.user);
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
