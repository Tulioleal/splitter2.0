export const getCleanSet = (names: string[]): string[] => {
  return names
    .map((name) => name.trim())
    .filter((name) => name.length > 0)
    .reduce((uniqueNames, name) => {
      if (!uniqueNames.includes(name)) {
        uniqueNames.push(name);
      }
      return uniqueNames;
    }, [] as string[]);
}