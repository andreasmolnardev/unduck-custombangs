import { bangs } from "./bang.js";


function noSearchDefaultPageRender() {

  fetch(window.location.href + '/config')
    .then(response => response.json())
    .then(config => {

      const app = document.querySelector("#app");

      app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div class="content-container">
        <h1>Unduck-custombangs</h1>
        <p>This is a selfhosted version of t3dotgg/unduck</p>
        <div class="url-container"> 
          <input 
            type="text" 
            class="url-input"
            value="${config.appUrl}/?q=%s"
            readonly 
          />
          <button class="copy-button">
            <img src="https://www.svgrepo.com/show/527652/clipboard.svg" alt="Copy" />
          </button>
        </div>
      </div>
      <footer class="footer">
   <a>by andreasmolnardev</a>
      </footer>
    </div>
  `;

      localStorage.setItem('default-bang', config.defaultBang)


      const copyButton = app.querySelector(".copy-button");
      const copyIcon = copyButton.querySelector("img");
      const urlInput = app.querySelector(".url-input");

      copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(urlInput.value);
        copyIcon.src = "https://www.svgrepo.com/show/527646/clipboard-check.svg";

        setTimeout(() => {
          copyIcon.src = "https://www.svgrepo.com/show/527652/clipboard.svg";
        }, 2000);
      });
    })
    .catch(error => console.error('Error fetching config:', error));
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "ddg";
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
