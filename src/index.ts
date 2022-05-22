import { fetchRecordFast } from "./utils/chunithm-net-fetch";
import modalTemplate from "./template/modal.html?raw";

const chuniViewerUrl = import.meta.env.VITE_CHUNI_VIEWER_URL;
let dom: HTMLElement;

function initDom() {
  const modal = document.createElement("modal");
  modal.innerHTML = modalTemplate;
  document.getElementsByTagName("body")[0].appendChild(modal);
  modal.classList.add("fetching");
  dom = modal;
}

function cleanupDom() {
  dom.remove();
}

async function onDifficultyFetch(difficulty: string) {
  const paragraph = document.createElement("p");
  paragraph.innerText = `Fetching ${difficulty}`;
  dom.appendChild(paragraph);
}

function submitRecord(record: string) {
  const form = document.getElementById("fetcher-form") as HTMLFormElement;
  const input = document.getElementById(
    "fetcher-record-input"
  ) as HTMLInputElement;

  if (!form || !input) return;

  form.enctype = "application/x-www-form-urlencoded";
  form.action = `${chuniViewerUrl}/submit`;
  input.name = "record";
  input.value = record;

  dom.classList.remove("fetching");
  dom.classList.add("fetched");
  const submitBtn = document.getElementById(
    "fetch-record-submit"
  ) as HTMLInputElement;
  submitBtn.onclick = () => {
    setTimeout(() => {
      cleanupDom();
    }, 1000);
  };
  dom.appendChild(form);
}

async function main() {
  initDom();
  const records = await fetchRecordFast(onDifficultyFetch);
  submitRecord(JSON.stringify(records));
}

main();
