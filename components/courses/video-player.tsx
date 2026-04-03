"use client";
import { useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  url: string;
  lectureId: string;
  enrollmentId: string;
}

export default function VideoPlayer({ url, lectureId, enrollmentId }: VideoPlayerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [marked, setMarked] = useState(false);

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.played);
    if (state.played >= 0.9 && !marked) {
      markCompleted();
    }
  };

  const markCompleted = async () => {
    setMarked(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, lectureId, completed: true }),
      });
      toast.success("Lecture completed! ✓");
    } catch {
      // silently fail progress update
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    playerRef.current?.seekTo(percent);
  };

  return (
    <div className="relative w-full h-full bg-black group">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        muted={muted}
        volume={volume}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onDuration={setDuration}
      />

      {/* Controls overlay */}
      <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/70 to-transparent">
        <div className="px-4 pb-2">
          <div className="h-1.5 bg-white/30 rounded-full cursor-pointer" onClick={handleSeek}>
            <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-4 px-4 pb-4">
          <button onClick={() => setPlaying(!playing)} className="text-white hover:text-purple-300 transition-colors">
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={() => playerRef.current?.seekTo(Math.max(0, playerRef.current.getCurrentTime() - 10))}
            className="text-white hover:text-purple-300 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => setMuted(!muted)} className="text-white hover:text-purple-300 transition-colors">
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range" min={0} max={1} step={0.1} value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 accent-purple-500"
            />
          </div>
          <span className="text-white text-xs flex-1">
            {formatTime(duration * progress)} / {formatTime(duration)}
          </span>
          {marked && <CheckCircle className="w-5 h-5 text-green-400" />}
          <button
            onClick={() => {
              const el = document.querySelector("video") as HTMLVideoElement;
              if (el) el.requestFullscreen?.();
            }}
            className="text-white hover:text-purple-300 transition-colors"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setPlaying(true)}>
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-colors">
            <Play className="w-8 h-8 text-purple-600 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}
