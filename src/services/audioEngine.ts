import { Song, RepeatMode } from '../types/music';

type AudioEventListener = (data: {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  song: Song | null;
}) => void;

class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private currentSong: Song | null = null;
  private listeners: Set<AudioEventListener> = new Set();
  private isSynthesizing = false;
  private synthInterval: number | null = null;
  private synthTime = 0;
  private audioCtx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audio) return;
    this.audio = new Audio();
    this.audio.preload = 'auto';

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        this.emitState();
      }
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.emitState();
      this.updateMediaSessionPosition();
    });

    this.audio.addEventListener('play', () => {
      this.emitState();
      this.updateMediaSessionPlaybackState('playing');
    });

    this.audio.addEventListener('pause', () => {
      this.emitState();
      this.updateMediaSessionPlaybackState('paused');
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio stream error, falling back to gentle synth mode:', e);
      this.startSynthPlayback();
    });
  }

  public subscribe(listener: AudioEventListener) {
    this.listeners.add(listener);
    this.emitState();
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emitState() {
    let currentTime = 0;
    let duration = this.currentSong ? this.currentSong.duration : 0;
    let isPlaying = false;
    let buffered = 0;

    if (this.isSynthesizing) {
      currentTime = this.synthTime;
      isPlaying = true;
      buffered = 100;
    } else if (this.audio) {
      currentTime = this.audio.currentTime;
      duration = !isNaN(this.audio.duration) && this.audio.duration > 0 ? this.audio.duration : (this.currentSong?.duration || 0);
      isPlaying = !this.audio.paused;
      if (this.audio.buffered.length > 0) {
        buffered = (this.audio.buffered.end(this.audio.buffered.length - 1) / (duration || 1)) * 100;
      }
    }

    this.listeners.forEach((listener) => {
      listener({
        isPlaying,
        currentTime,
        duration,
        buffered,
        song: this.currentSong,
      });
    });
  }

  public async playSong(song: Song) {
    this.stopSynth();
    this.currentSong = song;

    if (!this.audio) {
      this.initAudioElement();
    }

    if (!this.audio) return;

    try {
      this.audio.src = song.audioUrl;
      this.audio.currentTime = 0;
      await this.audio.play();
      this.setupMediaSession(song);
    } catch (err) {
      console.warn('Failed to autoplay remote audio directly, starting synthetic stream:', err);
      this.startSynthPlayback();
    }
  }

  public async togglePlay() {
    if (!this.currentSong) return;

    if (this.isSynthesizing) {
      if (this.synthInterval) {
        this.pauseSynth();
      } else {
        this.resumeSynth();
      }
      return;
    }

    if (!this.audio) return;

    if (this.audio.paused) {
      try {
        await this.audio.play();
      } catch (err) {
        console.warn('Playback resume failed, switching to synth:', err);
        this.startSynthPlayback();
      }
    } else {
      this.audio.pause();
    }
  }

  public seek(seconds: number) {
    if (this.isSynthesizing) {
      this.synthTime = Math.max(0, Math.min(seconds, this.currentSong?.duration || 300));
      this.emitState();
      return;
    }

    if (this.audio && !isNaN(this.audio.duration)) {
      this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration));
      this.updateMediaSessionPosition();
    }
  }

  public setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(volume * 0.15, this.audioCtx?.currentTime || 0);
    }
    this.emitState();
  }

  public onEnded(callback: () => void) {
    if (this.audio) {
      this.audio.addEventListener('ended', callback);
    }
  }

  private setupMediaSession(song: Song) {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.titleHi || song.title,
      artist: song.artistHi || song.artist,
      album: song.albumHi || song.album,
      artwork: [
        { src: song.coverUrl, sizes: '96x96', type: 'image/jpeg' },
        { src: song.coverUrl, sizes: '128x128', type: 'image/jpeg' },
        { src: song.coverUrl, sizes: '256x256', type: 'image/jpeg' },
        { src: song.coverUrl, sizes: '512x512', type: 'image/jpeg' },
      ],
    });

    navigator.mediaSession.setActionHandler('play', () => this.togglePlay());
    navigator.mediaSession.setActionHandler('pause', () => this.togglePlay());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime !== undefined) {
        this.seek(details.seekTime);
      }
    });
  }

  private updateMediaSessionPlaybackState(state: 'playing' | 'paused' | 'none') {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      navigator.mediaSession.playbackState = state;
    }
  }

  private updateMediaSessionPosition() {
    if (
      typeof window !== 'undefined' &&
      'mediaSession' in navigator &&
      'setPositionState' in navigator.mediaSession &&
      this.audio &&
      !isNaN(this.audio.duration) &&
      this.audio.duration > 0
    ) {
      try {
        navigator.mediaSession.setPositionState({
          duration: this.audio.duration,
          playbackRate: this.audio.playbackRate || 1,
          position: this.audio.currentTime,
        });
      } catch (e) {
        // Ignore safe state position updates
      }
    }
  }

  // Web Audio Synth Fallback (Pleasant Sitar/Tanpura chord tones)
  private startSynthPlayback() {
    this.isSynthesizing = true;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.stopOscillator();

      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      // Tanpura Sa-Pa resonant harmonic frequency (C#3 Indian Sa ~ 138.59 Hz)
      this.oscillator.type = 'triangle';
      this.oscillator.frequency.setValueAtTime(138.59, this.audioCtx.currentTime);

      this.gainNode.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.oscillator.start();

      this.resumeSynth();
    } catch (err) {
      console.warn('Web Audio synth setup failed:', err);
    }
  }

  private resumeSynth() {
    if (this.synthInterval) clearInterval(this.synthInterval);
    this.synthInterval = window.setInterval(() => {
      this.synthTime += 1;
      const duration = this.currentSong?.duration || 300;
      if (this.synthTime >= duration) {
        this.synthTime = 0;
        this.stopSynth();
      }
      this.emitState();
    }, 1000);
    this.updateMediaSessionPlaybackState('playing');
    this.emitState();
  }

  private pauseSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    }
    this.updateMediaSessionPlaybackState('paused');
    this.emitState();
  }

  private stopOscillator() {
    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (e) {
        // ignore
      }
      this.oscillator = null;
    }
  }

  private stopSynth() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.stopOscillator();
    this.synthTime = 0;
  }
}

export const audioEngine = new AudioEngine();
