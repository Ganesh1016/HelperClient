import { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

const VoiceSignUp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(new Array(20).fill(2));
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorder = useRef(null);
  const chunksRef = useRef([]);
  const animationInterval = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunksRef.current = []; // Clear previous chunks

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        console.log("Recording stopped, sending audio to server...");
        await sendAudioToServer(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setError("");
      console.log("Recording started");

      // Simulate audio visualization with random data
      animationInterval.current = setInterval(() => {
        setAudioData((prev) =>
          prev.map(() => Math.floor(Math.random() * 40 + 2))
        );
      }, 100);
    } catch (err) {
      setError("Error accessing microphone: " + err.message);
      console.error("Error accessing microphone:", err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
    }
    clearInterval(animationInterval.current);
    setIsRecording(false);
    setAudioData(new Array(20).fill(2));
    console.log("Recording stopped");
  };

  const sendAudioToServer = async (audioBlob) => {
    setIsLoading(true);
    console.log("Sending audio to server...");
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const response = await fetch("http://127.0.0.1:8080/api/transcribe", {
        method: "POST",
        body: formData,
      });

      console.log("Server response status:", response.status);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setTranscription(data.transcription);
      console.log("Transcription received:", data.transcription);
    } catch (err) {
      setError("Error sending audio to server: " + err.message);
      console.error("Error sending audio to server:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder.current) {
        stopRecording();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Voice Navigation
          </h2>
          <p className="text-gray-600">Tap the microphone to start speaking</p>
        </div>

        {/* Voice visualization */}
        <div className="flex items-center justify-center h-24 mb-8">
          <div className="flex items-end space-x-1">
            {audioData.map((height, index) => (
              <div
                key={index}
                className="w-1 bg-blue-500 rounded-t transition-all duration-100"
                style={{
                  height: `${height}px`,
                  opacity: isRecording ? "1" : "0.3",
                }}
              />
            ))}
          </div>
        </div>

        {/* Microphone button */}
        <div className="flex justify-center">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-4 rounded-full transition-all duration-300 ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isRecording ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>
        </div>

        {/* Status text */}
        <p className="text-center mt-4 text-gray-600">
          {isRecording ? "Listening..." : "Ready to listen"}
        </p>

        {/* Loading spinner */}
        {isLoading && (
          <div className="flex justify-center mt-4">
            <span className="text-gray-500">Transcribing...</span>
          </div>
        )}

        {/* Display error */}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}

        {/* Display transcription */}
        {transcription && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold mb-2">Transcription:</h3>
            <p>{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceSignUp;
