import { LocalUser, RemoteUser, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish, useRemoteUsers } from "agora-rtc-react";
import { useState } from "react";
import "./styles.css";
export const Basics = () => {

    const [calling, setCalling] = useState(false);
    const [appId, setAppId] = useState("");
    const [channel, setChannel] = useState("");
    const [token, setToken] = useState("");
  
    useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    const remoteUsers = useRemoteUsers();
  
    return (
      <>
        // highlight-start
        <div className="room">
            <div className="user-list">
              <div className="user">
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                >
                  <samp className="user-name">You</samp>
                </LocalUser>
              </div>
              {remoteUsers.map((user) => (
                <div className="user" key={user.uid}>
                  <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg" user={user}>
                    <samp className="user-name">{user.uid}</samp>
                  </RemoteUser>
                </div>
              ))}
            </div>
        </div>
          <div className="control">
            <div className="left-control">
              <button className="btn" onClick={() => setMic(a => !a)}>
                <i className={`i-microphone ${!micOn ? "off" : ""}`} />
              </button>
              <button className="btn" onClick={() => setCamera(a => !a)}>
                <i className={`i-camera ${!cameraOn ? "off" : ""}`} />
              </button>
            </div>
            <button
              className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
              onClick={() => setCalling(a => !a)}
            >
              {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
            </button>
          </div>
          // highlight-end
      </>
    );
  };
  
  export default Basics;
  