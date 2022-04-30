export function gzippedToBase64(data: Uint8Array) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(
        reader.result
          ?.toString()
          .replace("data:application/octet-stream;base64,", "")
      );
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(new Blob([data]));
  });
}
