export function scrollToModel(modelId: string) {
  const element = document.getElementById(modelId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
}
