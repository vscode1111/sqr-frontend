/**
 * Method for parse camel case to snake case
 *
 * @param value string in camel case value
 *
 * @return string in snake case value
 */
export const camelCaseToSnakeCase = (value: string) =>
  value.replace(/([A-Z])/g, (group) => `_${group.toLowerCase()}`);
/**
 * Method for parse snake case to camel case
 *
 * @param value string in snake case value
 *
 * @return string in camel case value
 */
export const snakeCaseToCamelCase = (value: string) =>
  value
    .toLowerCase()
    .replace(/([-_]+[a-z])/g, (group) => group.toUpperCase().replace(/(-|_)/g, ''));

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
