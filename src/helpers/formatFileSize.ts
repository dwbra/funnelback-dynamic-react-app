const formatFileSize = (bytes: number): string => {
  //Convert bytes to KB.
  //1024kb = 1mb.
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  } else {
    return `${(kb / 1024).toFixed(1)} MB`;
  }
};

export default formatFileSize;
