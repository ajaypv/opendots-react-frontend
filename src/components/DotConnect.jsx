import React, { useState,useRef,useEffect } from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { auth, firestore, database} from "../firebase";


const options = {
  // Pass your App ID here.
  appId: "c32e3963564f479b8587f6fce87a4590",
  // Set the channel name.
  channel: "apiee",
  // Pass your temp token here.
  token: "007eJxTYOCayXc6TNvm1JndBj6JXlv25LjGqU6PyLaVOybSXeJ374kCQ7KxUaqxpZmxqZlJmom5ZZKFqYV5mllacqqFeaKJqaXB50yvlIZARoYps16xMDJAIIjPypBYkJmaysAAANHIHmA=",
  // Set the user ID.

};

const channelParameters = {
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold the remote user id.
  remoteUid: null,
};


export default function Dots() {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    async function startBasicCall() {
      const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

      agoraEngine.on("user-published", async (user, mediaType) => {
        await agoraEngine.subscribe(user, mediaType);

        if (mediaType === "video") {
          // Get the RemoteVideoTrack object from the AgoraRTCRemoteUser object.
          const remoteVideoTrack = user.videoTrack;
          // Play the remote video track in the remote video element.
          remoteVideoTrack.play(remoteVideoRef.current);
          showMessage("Remote user connected: " + user.uid);
        }

        agoraEngine.on("user-unpublished", (user) => {
          console.log(user.uid + " has left the channel");
          showMessage("Remote user has left the channel");
        });
      });

      await agoraEngine.join(options.appId, options.channel, options.token, options.uid);
      showMessage("Joined channel: " + options.channel);

      // Create a local video track from the camera video.
      const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      // Play the local video track in the local video element.
      localVideoTrack.play(localVideoRef.current);
      // Publish the local video track in the channel.
      await agoraEngine.publish(localVideoTrack);
      console.log("Publish success!");

      return () => {
        localVideoTrack.close();
        agoraEngine.leave();
        console.log("You left the channel");
        window.location.reload();
      };
    }

    startBasicCall();
  }, []);

  function showMessage(text) {
    document.getElementById("message").textContent = text;
  }

  return (
    <>
      <h1>FUN DOTS PAGE</h1>
      <div id="videos">
        <video ref={localVideoRef} autoPlay muted style={{ width: "320px", height: "240px" }} />
        <video ref={remoteVideoRef} autoPlay style={{ width: "320px", height: "240px" }} />
        <div id="message"></div>
       
      </div>
    </>
  );
}
