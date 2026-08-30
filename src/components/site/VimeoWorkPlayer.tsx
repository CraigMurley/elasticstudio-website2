import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

type Props = { videoId: number; title?: string; hasAudio?: boolean };

const VimeoWorkPlayer = ({ videoId, title = "Project video", hasAudio = true }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const player = new Player(containerRef.current, {
      id: videoId,
      autoplay: true,
      muted: true,
      loop: true,
      controls: false,
      responsive: true,
      playsinline: true,
      title: false,
      byline: false,
      portrait: false,
      dnt: true,
    });
    playerRef.current = player;

    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("volumechange", ({ volume }: { volume: number }) => setIsMuted(volume === 0));

    player.setMuted(true).then(() => player.play()).catch(() => {
      setIsPlaying(false);
    });

    return () => {
      player.destroy().catch(() => undefined);
    };
  }, [videoId]);

  const togglePlay = async () => {
    const p = playerRef.current;
    if (!p) return;
    const paused = await p.getPaused();
    if (paused) await p.play();
    else await p.pause();
  };

  const toggleMute = async () => {
    const p = playerRef.current;
    if (!p) return;
    const muted = await p.getMuted();
    await p.setMuted(!muted);
    if (muted) await p.setVolume(1);
  };

  return (
    <div className="group relative h-full w-full">
      <div ref={containerRef} title={title} className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0" />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-background/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100 md:p-6">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-primary/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        {hasAudio && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-background/70 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default VimeoWorkPlayer;
