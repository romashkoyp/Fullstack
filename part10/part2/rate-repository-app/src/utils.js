const FormatCount = (count) => {
  if (count >= 1000) {
    const formattedCount = (count / 1000).toFixed(1).replace(/\.0$/, '');
    return `${formattedCount}k`;
  }
  return count.toString();
};

export default FormatCount;