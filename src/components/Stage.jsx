import ReactPlayer from 'react-player';

function OpenStage() {

    const url="https://vaibhav1663.github.io/Youtube-Ambient-Mode/demo-video.mp4"
  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={url}
        controls={true}
        width="70%"
        height="100%"
        className="react-player"
      />
    </div>
  );
}

export default OpenStage;
