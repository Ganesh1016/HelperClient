import { useState, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import axios from "axios";

const VoiceSignUp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(new Array(20).fill(2));
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorder = useRef(null);
  const audioContext = useRef(null);
  const chunksRef = useRef([]);
  const animationInterval = useRef(null);

  // Function to convert audio buffer to WAV format
  const createWavFile = (audioData) => {
    const wav = new ArrayBuffer(44 + audioData.length * 2);
    const view = new DataView(wav);

    // "RIFF" identifier
    writeString(view, 0, "RIFF");
    // File length minus RIFF identifier length and file description length
    view.setUint32(4, 32 + audioData.length * 2, true);
    // "WAVE" identifier
    writeString(view, 8, "WAVE");
    // "fmt " chunk identifier
    writeString(view, 12, "fmt ");
    // Chunk length
    view.setUint32(16, 16, true);
    // Sample format (raw)
    view.setUint16(20, 1, true);
    // Channel count
    view.setUint16(22, 1, true);
    // Sample rate
    view.setUint32(24, 44100, true);
    // Byte rate (sample rate * block align)
    view.setUint32(28, 44100 * 2, true);
    // Block align (channel count * bytes per sample)
    view.setUint16(32, 2, true);
    // Bits per sample
    view.setUint16(34, 16, true);
    // "data" chunk identifier
    writeString(view, 36, "data");
    // Chunk length
    view.setUint32(40, audioData.length * 2, true);

    // Write audio data
    floatTo16BitPCM(view, 44, audioData);

    return new Blob([wav], { type: "audio/wav" });
  };

  // Helper function to write strings to DataView
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Helper function to convert float audio data to 16-bit PCM
  const floatTo16BitPCM = (view, offset, input) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
  };

  const startRecording = async () => {
    try {
      // Initialize audio context
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create audio processor
      const sourceNode = audioContext.current.createMediaStreamSource(stream);
      const processorNode = audioContext.current.createScriptProcessor(
        4096,
        1,
        1
      );
      chunksRef.current = [];

      processorNode.onaudioprocess = (e) => {
        const audioData = e.inputBuffer.getChannelData(0);
        chunksRef.current.push(new Float32Array(audioData));
      };

      sourceNode.connect(processorNode);
      processorNode.connect(audioContext.current.destination);

      mediaRecorder.current = {
        stream,
        sourceNode,
        processorNode,
        state: "recording",
        stop: () => {
          sourceNode.disconnect();
          processorNode.disconnect();
          stream.getTracks().forEach((track) => track.stop());
        },
      };

      setIsRecording(true);
      setError("");

      // Animation for visualization
      animationInterval.current = setInterval(() => {
        setAudioData((prev) =>
          prev.map(() => Math.floor(Math.random() * 40 + 2))
        );
      }, 100);
    } catch (err) {
      setError("Error accessing microphone: " + err.message);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();

      // Combine all audio chunks
      const combinedAudioData = new Float32Array(
        chunksRef.current.reduce((acc, chunk) => acc + chunk.length, 0)
      );

      let offset = 0;
      chunksRef.current.forEach((chunk) => {
        combinedAudioData.set(chunk, offset);
        offset += chunk.length;
      });

      // Create WAV file
      const wavBlob = createWavFile(combinedAudioData);
      await sendAudioToServer(wavBlob);
    }

    clearInterval(animationInterval.current);
    setIsRecording(false);
    setAudioData(new Array(20).fill(2));
  };

  const sendAudioToServer = async (audioBlob) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const response = await axios.post(
        "http://localhost:5000/api/transcribe",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setTranscription(response.data.transcription);
      playAudio(response.data.audioBase64);
    } catch (err) {
      setError("Error sending audio to server: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (base64Audio) => {
    const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    audio.play();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Voice Navigation
          </h2>
          <p className="text-gray-600">Tap the microphone to start speaking</p>
        </div>

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

        <p className="text-center mt-4 text-gray-600">
          {isRecording ? "Listening..." : "Ready to listen"}
        </p>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <span className="text-gray-500">Transcribing...</span>
          </div>
        )}

        {error && <p className="text-center mt-4 text-red-500">{error}</p>}

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
