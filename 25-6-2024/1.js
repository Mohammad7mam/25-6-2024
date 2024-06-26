document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  if (query) {
    searchYouTube(query);
  }
});

function searchYouTube(query) {
  const apiKey = "AIzaSyDbd_PuIhFY640YP1PweTsPnCDrg3sWhrU";
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayVideos(data.items);
    })
    .catch((error) => {
      console.error("Error fetching data from YouTube API", error);
    });
}

function displayVideos(videos) {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  videos.forEach((video) => {
    const videoElement = document.createElement("div");
    videoElement.classList.add("video");

    const thumbnail = video.snippet.thumbnails.high.url;
    const title = video.snippet.title;
    const videoId = video.id.videoId;

    videoElement.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
              <img src="${thumbnail}" alt="${title}">
              <h3>${title}</h3>
          </a>
      `;

    videoContainer.appendChild(videoElement);
  });
}
