export default (
  array: HTMLElement[],
  propertyName: "offsetWidth" | "offsetHeight",
) =>
  array.reduce((acc: Record<string, number>, _, index) => {
    const currentId = array[index].getAttribute("id");
    if (currentId) {
      if (index === 0) {
        acc[currentId] = 0;
      } else {
        const previousId = array[index - 1].getAttribute("id");

        /* istanbul ignore else */
        if (previousId) {
          acc[currentId] = acc[previousId] + array[index - 1][propertyName];
        }
      }
    }
    return acc;
  }, {});
