export const capitalize = (str) => {
  return str
    .split(" ")
    .map((word, index) => {
      if (word.length > 3 || index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else return word;
    })
    .join(" ");
};
