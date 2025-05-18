async function pickFolderAndReadFiles() {
  const dirHandle = await window.showDirectoryPicker();
  const files = [];

  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file' && /\.(png|jpg|jpeg)$/i.test(entry.name)) {
      const file = await entry.getFile();
      const data = await file.arrayBuffer();

      files.push({
        name: file.name,
        bytes: Array.from(new Uint8Array(data))
      });
    }
  }

  return files;
}
