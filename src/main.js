import { bangs } from "../config/bang.js";
import config from "../config/config.json" with { type: 'json' };

config.customBangs.forEach(customBang => {
  bangs.push({
    t: customBang.bangWithoutExclamationMark,
    u: customBang.searchUrl
  })
})

function noSearchDefaultPageRender() {

  const app = document.querySelector("#app");
  const location = window.location.href;

  if (!location.endsWith("/")) {
    location += "/"
  }

  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div class="content-container">
        <h1>Unduck-custombangs</h1>
        <p>This is a selfhosted version of t3dotgg/unduck</p>
        <div class="url-container"> 
          <input 
            type="text" 
            class="url-input"
            value="${location}?q=%s"
            readonly 
          />
          <button class="copy-button">
            <img src="./svgs/clipboard.svg" alt="Copy" />
          </button>
        </div>
      </div>
      <footer class="footer">
   <a href="https://github.com/andreasmolnardev">by andreasmolnardev</a>
      </footer>
    </div>
  `;

  localStorage.setItem('default-bang', config.defaultBang)


  const copyButton = app.querySelector(".copy-button");
  const copyIcon = copyButton.querySelector("img");
  const urlInput = app.querySelector(".url-input");

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    copyIcon.src = "./svgs/clipboard-check.svg";

    setTimeout(() => {
      copyIcon.src = "./svgs/clipboard.svg";
    }, 2000);
  });
}


const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? config.defaultBang;

const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!([a-z0-9]+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/![a-z0-9]+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
