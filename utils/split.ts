export const splitHalfString = (string: string, char: string): [string, string] => {
    const splited = string.split(char);
    return [splited[0], char + splited[1]];
}