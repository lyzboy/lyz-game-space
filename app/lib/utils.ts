/**
 * Formats a description into a truncated 80 char string with an
 * ellipsis attached to the end.
 *
 * @param {string} description - The description to truncate.
 * @returns {string} A truncated string.
 */
export const formatShortDescription = (description: string) => {
  if (description.length > 80) {
    description = description.slice(0, 80) + "...";
  }
  return description;
};
