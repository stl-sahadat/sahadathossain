import React, { useState } from 'react';
import {
  Video,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Check,
  X,
  Upload,
  ArrowUp,
  ArrowDown,
  Play,
  Tv,
  Smartphone,
} from 'lucide-react';

export function TabVideos({ videoGallery = [], onRequestSave }) {
  const [videoList, setVideoList] = useState(videoGallery.length ? [...videoGallery] : []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentVideo, setCurrentVideo] = useState({
    id: '',
    youtubeId: '',
    title: '',
    platform: 'YouTube',
    platformFilter: 'youtube',
    format: 'widescreen',
    badge: 'AI & DEV',
    url: 'https://',
    embedUrl: 'https://',
    thumb: '/assets/img/projects/yt-thumb-1.jpg',
    desc: '',
    duration: 'Full Video',
    channel: 'Sahadat Automation',
    topics: ['AI', 'Development'],
    topicsInput: 'AI, Development',
  });

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setCurrentVideo({
      id: 'vid-' + Date.now(),
      youtubeId: '',
      title: '',
      platform: 'YouTube',
      platformFilter: 'youtube',
      format: 'widescreen',
      badge: 'MASTERCLASS',
      url: 'https://youtu.be/',
      embedUrl: 'https://www.youtube-nocookie.com/embed/',
      thumb: '/assets/img/projects/yt-thumb-1.jpg',
      desc: '',
      duration: 'Full Video',
      channel: 'Sahadat Automation',
      topics: ['AI', 'Agents'],
      topicsInput: 'AI, Agents',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index) => {
    setEditingIndex(index);
    const v = videoList[index];
    setCurrentVideo({
      ...v,
      topicsInput: Array.isArray(v.topics) ? v.topics.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSaveModalVideo = (e) => {
    e.preventDefault();

    const topicsArr = currentVideo.topicsInput
      ? currentVideo.topicsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const finalized = {
      ...currentVideo,
      topics: topicsArr,
      platformFilter: currentVideo.platform.toLowerCase(),
    };

    let updated;
    if (editingIndex !== null) {
      updated = [...videoList];
      updated[editingIndex] = finalized;
    } else {
      updated = [finalized, ...videoList];
    }

    setVideoList(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this video from your gallery?')) {
      setVideoList(videoList.filter((_, i) => i !== index));
    }
  };

  const handleMove = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= videoList.length) return;
    const copy = [...videoList];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setVideoList(copy);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        setCurrentVideo((prev) => ({ ...prev, thumb: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCommitAll = () => {
    onRequestSave('Video Gallery', {
      videoGallery: videoList,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 05
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            VIDEO GALLERY & MASTERCLASSES ({videoList.length})
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Manage 16:9 YouTube masterclasses and 9:16 vertical reels (Facebook / TikTok / Shorts).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-chakra font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#00F0FF]" />
            <span>Add New Video</span>
          </button>

          <button
            type="button"
            onClick={handleCommitAll}
            className="px-6 py-2 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Save All Videos</span>
          </button>
        </div>
      </div>

      {/* Video Items */}
      <div className="space-y-3">
        {videoList.map((video, idx) => (
          <div
            key={video.id || idx}
            className="p-4 sm:p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-4">
              {/* Thumbnail */}
              <div
                className={`rounded-lg bg-black/60 border border-white/15 overflow-hidden flex-shrink-0 relative flex items-center justify-center ${
                  video.format === 'vertical' ? 'w-14 h-20' : 'w-24 h-16'
                }`}
              >
                <img
                  src={video.thumb}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/img/projects/yt-thumb-1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white/90 drop-shadow" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-[#00F0FF] transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 uppercase flex items-center gap-1">
                    {video.format === 'vertical' ? (
                      <>
                        <Smartphone className="w-3 h-3 text-[#FF0055]" />
                        <span>9:16 REEL</span>
                      </>
                    ) : (
                      <>
                        <Tv className="w-3 h-3 text-[#00F0FF]" />
                        <span>16:9 WIDE</span>
                      </>
                    )}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] uppercase">
                    {video.platform}
                  </span>
                </div>
                <p className="font-chakra text-xs text-neutral-400 line-clamp-1">
                  {video.desc}
                </p>
                <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-neutral-500">
                  <span>Duration: {video.duration}</span>
                  {video.topics && video.topics.length > 0 && (
                    <span>• {video.topics.slice(0, 3).join(', ')}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleMove(idx, -1)}
                disabled={idx === 0}
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleMove(idx, 1)}
                disabled={idx === videoList.length - 1}
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleOpenEditModal(idx)}
                className="p-2 rounded bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 transition-colors flex items-center gap-1 text-xs font-mono"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#090b12] border border-[#00F0FF]/40 rounded-xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <h3 className="font-orbitron font-bold text-base text-white uppercase tracking-wider">
                {editingIndex !== null ? 'EDIT VIDEO / REEL' : 'ADD NEW VIDEO / REEL'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalVideo} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  VIDEO TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={currentVideo.title}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                  placeholder="Video title..."
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    PLATFORM
                  </label>
                  <select
                    value={currentVideo.platform}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, platform: e.target.value })}
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Facebook">Facebook Video / Reel</option>
                    <option value="Instagram">Instagram Reel</option>
                    <option value="Vimeo">Vimeo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    ASPECT RATIO FORMAT
                  </label>
                  <select
                    value={currentVideo.format}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, format: e.target.value })}
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  >
                    <option value="widescreen">16:9 Widescreen (Masterclass)</option>
                    <option value="vertical">9:16 Vertical (Reel / Shorts)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    PUBLIC WATCH URL
                  </label>
                  <input
                    type="url"
                    value={currentVideo.url}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, url: e.target.value })}
                    placeholder="https://youtu.be/..."
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    EMBED URL (IFRAME)
                  </label>
                  <input
                    type="text"
                    value={currentVideo.embedUrl}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, embedUrl: e.target.value })}
                    placeholder="https://www.youtube-nocookie.com/embed/..."
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    DURATION
                  </label>
                  <input
                    type="text"
                    value={currentVideo.duration}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, duration: e.target.value })}
                    placeholder="e.g. 48:15 or 00:58"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    CHANNEL / CREATOR
                  </label>
                  <input
                    type="text"
                    value={currentVideo.channel}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, channel: e.target.value })}
                    placeholder="e.g. Sahadat Automation"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  TOPICS (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  value={currentVideo.topicsInput}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, topicsInput: e.target.value })}
                  placeholder="Autonomous Agents, Future of Work, AI Swarms"
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  DESCRIPTION (BANGLA OR ENGLISH)
                </label>
                <textarea
                  rows={2}
                  value={currentVideo.desc}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, desc: e.target.value })}
                  placeholder="Brief summary of the video content..."
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  THUMBNAIL IMAGE URL OR UPLOAD
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={currentVideo.thumb}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, thumb: e.target.value })}
                    placeholder="/assets/img/projects/yt-thumb-1.jpg"
                    className="flex-1 px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                  <label className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer flex items-center gap-1.5 flex-shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Upload...</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#00F0FF] text-black font-chakra font-bold text-xs uppercase"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Create Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
