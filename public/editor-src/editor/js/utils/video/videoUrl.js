import objectToQueryString from "visual/utils/url/objectToQueryString";

const DEFAULT_SETTINGS = {
  autoplay: false,
  controls: true,
  loop: false,
  quality: "default"
};

const getYouTubeOptions = (
  key,
  { autoplay, controls, loop, suggestedVideo, start = 0 }
) => {
  let options = {
    autoplay: Number(autoplay),
    controls: Number(controls),
    start: Number(start),
    modestbranding: 1,
    wmode: "transparent",
    enablejsapi: 1,
    loop: 0,
    rel: Number(suggestedVideo)
  };

  if (loop) {
    options.loop = 1;
    options.playlist = key;
  }

  return {
    url: `https://www.youtube.com/embed/${key}`,
    options
  };
};

const getVimeoOptions = (key, { autoplay, loop, quality, start = 0 }) => {
  return {
    url: `https://player.vimeo.com/video/${key}`,
    options: {
      autoplay: Number(autoplay),
      background: 0,
      title: 0,
      byline: 0,
      badge: false,
      autopause: false,
      portrait: false,
      loop: Number(loop),
      quality
    },
    anchor: `#t=${Number(start)}s`
  };
};

export default function videoUrl({ type, key }, settings) {
  const newSettings = { ...DEFAULT_SETTINGS, ...settings };
  const { url, options, anchor = "" } =
    type === "youtube"
      ? getYouTubeOptions(key, newSettings)
      : getVimeoOptions(key, newSettings);

  return `${url}?${objectToQueryString(options)}${anchor}`;
}
