import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  User,
  Bot,
  Play,
  StopCircle,
  RotateCw,
  Send,
  Volume2,
} from "lucide-react";
import axios from "axios";
import AWS from "aws-sdk";
import { toast } from "react-toastify";
import queryAudio from "../../utils/audios/query.mp3";
import welcomeAudio from "../../utils/audios/welcome_theme.mp3";

// Configure AWS
AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.Credentials(
    process.env.REACT_APP_ACCESS_KEY,
    process.env.REACT_APP_SECRET_ACCESS_KEY
  ),
});

function CallPopup({ onClose, mediaRecorder }) {
  const [audioData, setAudioData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = mediaRecorder;

  // References for audio elements
  const volumeAudioRef = useRef(null);
  const popupAudioRef = useRef(null);

  useEffect(() => {
    if (popupAudioRef.current) {
      popupAudioRef.current.play();
      setIsBotSpeaking(true); // Start bot speaking when popup opens
      popupAudioRef.current.onended = () => setIsBotSpeaking(false); // Set bot speaking to false when audio ends
    }
  }, []);

  const handleStart = async () => {
    startRecording();
    setIsRecording(true);
    console.log("recording started");
    toast.info("Recording started");
  };

  const handleStop = async () => { 
    stopRecording();
    setIsRecording(false);
    stopBotSpeaking(); // Stop bot speaking when stop is clicked
    console.log("Recording stopped");
  };

  const discardRecording = () => {
    stopRecording(); // Stop recording if it's ongoing
    setAudioData(null); // Clear recorded audio data
    toast.info("Recording discarded");
    console.log("Recording discarded");
  };

const sendAudio = async () => {
  if (!mediaBlobUrl) {
      console.error("No audio data to send");
      toast.error("No audio data to send");
      return;
  }

  try {
      toast.info("Processing...");
      console.log("Preparing to send audio file from:", mediaBlobUrl);

      // Fetch the audio blob from the mediaBlobUrl
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
      // Create a FormData object and append the audio file
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.mp3");

      // Retrieve the user ID from localStorage
      const uid = localStorage.getItem("uid");

      // Append additional required data to formData
      formData.append("category", "1");
      formData.append("uid", uid);

      // Send the audio file to the backend using Axios
      const backendUrl = "https://hackon-slva.onrender.com/get_response";
      const audioResponse = await axios.post(backendUrl, formData, {
          headers: {
              "Content-Type": "multipart/form-data"
          },
          responseType: 'arraybuffer' // Expect a binary response
      });

      toast.success("Audio sent successfully!");

      // Check for errors in the response
      if (audioResponse.data.Error) {
          console.error("Error fetching the result");
          toast.error('Error fetching the result');
          return;
      }

      // Get the binary audio data from the response
      const audioArrayBuffer = audioResponse.data;

      // Create a blob from the received audio data
      const audioBlobResponse = new Blob([audioArrayBuffer], { type: 'audio/mpeg' });

      // Create an object URL for the audio blob
      const audioUrlObject = URL.createObjectURL(audioBlobResponse);

      // Set the state to indicate the bot is speaking
      setIsBotSpeaking(true);

      // Create an audio element and play the received audio
      const audio = new Audio(audioUrlObject);
      audio.play();

      // After the audio ends, reset the state
      audio.onended = () => {
          setIsBotSpeaking(false);
          URL.revokeObjectURL(audioUrlObject); // Revoke the object URL to free up memory
      };

      // Reset the audio data state
      setAudioData(null);
  } catch (error) {
      console.error("Error uploading or sending audio:", error);
      toast.error("Failed to send audio");
  }
};

  const handleClose = () => {
    stopRecording();
    stopBotSpeaking();
    setAudioData(null);
    onClose();
  };

  const handleVolumeButtonClick = () => {
    if (volumeAudioRef.current) {
      volumeAudioRef.current.play();
      setIsBotSpeaking(true); // Bot speaks when the speaker icon is clicked
      volumeAudioRef.current.onended = () => setIsBotSpeaking(false); // Set bot speaking to false when audio ends
    }
  };

  const stopBotSpeaking = () => {
    if (popupAudioRef.current) {
      popupAudioRef.current.pause();
      popupAudioRef.current.currentTime = 0;
    }
    if (volumeAudioRef.current) {
      volumeAudioRef.current.pause();
      volumeAudioRef.current.currentTime = 0;
    }
    setIsBotSpeaking(false); // Ensure bot speaking state is set to false
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="relative bg-white w-[800px] rounded-lg shadow-lg p-8">
        <audio ref={popupAudioRef} src={welcomeAudio} />
        <audio ref={volumeAudioRef} src={queryAudio} />
        <button
          title="Instructions..."
          onClick={handleVolumeButtonClick}
          className="absolute top-4 left-4 w-12 h-12 bg-black text-white flex items-center justify-center rounded-full"
        >
          <Volume2 className="w-6 h-6" />
        </button>
        <button
          title="End Session"
          onClick={handleClose}
          className="absolute top-4 right-4 w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full"
        >
          <Phone style={{ transform: "rotate(135deg)" }} className="w-6 h-6" />
        </button>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold">Ask Your Queries</h1>
          </div>
          <div className="flex justify-center gap-1 mt-8">
            <div className="flex items-center justify-center w-[49%] h-60 bg-black rounded-3xl border-4 border-[#00BCD4]">
              <div className="wave-container">
                {isRecording && <div className="wave"></div>}
                <div className="flex items-center justify-center w-28 h-28 bg-[#00BCD4] rounded-full">
                  <User className="w-16 h-16 text-black" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-[49%] h-60 bg-black rounded-3xl border-4 border-[#00BCD4]">
              <div className="wave-container">
                {isBotSpeaking && <div className="wave"></div>}
                <div className="flex items-center justify-center w-28 h-28 bg-[#00BCD4] rounded-full">
                  <Bot className="w-16 h-16 text-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between bg-[#00BCD4] p-3 mt-4 rounded-lg border border-black">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 bg-black rounded-full ${
                  isRecording || isBotSpeaking
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-pointer hover:border-2 hover:border-green-300"
                }`}
                title={
                  isRecording || isBotSpeaking
                    ? "Recording in progress or Bot is speaking"
                    : "Start recording"
                }
              >
                <button
                  onClick={handleStart}
                  disabled={isRecording || isBotSpeaking}
                  className="text-white"
                >
                  <Play className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm font-medium mt-1">
                {isRecording ? "Speaking..." : "Start"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 bg-black rounded-full ${
                  (!isRecording && !isBotSpeaking)
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-pointer hover:border-2 hover:border-red-300"
                }`}
                title={
                  !isRecording && !isBotSpeaking
                    ? "No recording or bot speaking in progress"
                    : "Stop recording or bot speaking"
                }
              >
                <button
                  onClick={handleStop}
                  disabled={!isRecording && !isBotSpeaking}
                  className="text-white"
                >
                  <StopCircle className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm font-medium mt-1">Stop</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center w-10 h-10 bg-black rounded-full hover:border-2 hover:border-blue-300 cursor-pointer"
                title="Discard current recording"
              >
                <button onClick={discardRecording} className="text-white">
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm font-medium mt-1">Restart</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center w-10 h-10 bg-black rounded-full hover:border-2 hover:border-blue-300 cursor-pointer"
                title="Send the recorded audio"
              >
                <button onClick={sendAudio} className="text-white">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm font-medium mt-1">Send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallPopup;
