import { fetchRecordFast } from "./utils/chunithm-net-fetch";
import modalTemplate from "./template/modal.html?raw";
import gzip from "gzip-js";
import { gzippedToBase64 } from "./utils/base64";

const chuniViewerUrl = import.meta.env.VITE_CHUNI_VIEWER_URL;
let dom: HTMLElement;

function initDom() {
  const modal = document.createElement("modal");
  modal.innerHTML = modalTemplate;
  document.getElementsByTagName("body")[0].appendChild(modal);
  dom = modal;
}

function cleanupDom(dom: HTMLElement) {
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
  form.action = `${chuniViewerUrl}/submit`;
  input.value = record;
  form.submit();
}

async function main() {
  initDom();
  const records = await fetchRecordFast(onDifficultyFetch);
  const gzippedRecords = gzip.zip(JSON.stringify(records), { level: 6 });
  const encodedGzippedRecord = await gzippedToBase64(
    new Uint8Array(gzippedRecords)
  );
  submitRecord(encodedGzippedRecord);
  cleanupDom(dom);
}

main();
