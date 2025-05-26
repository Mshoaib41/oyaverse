export const smoothScroll = (id) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
