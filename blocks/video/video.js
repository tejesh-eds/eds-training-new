// Function declarations (hoisted)
function renderVimeoVideo(vimeoUrl, link) {
  const iframe = document.createElement('iframe');
  iframe.src = vimeoUrl.replace('vimeo.com', 'player.vimeo.com/video');
  iframe.width = '640';
  iframe.height = '360';
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; fullscreen';
  link.parentNode.insertBefore(iframe, link.nextSibling);
}

// This code will only run once video.js is loaded
function initializeVideoPlayer() {
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    const url = link.href;
    if (url.includes('vimeo.com')) {
      renderVimeoVideo(url, link);
    }
  });
}

initializeVideoPlayer();
