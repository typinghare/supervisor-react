/**
 * Returns the string after sharp sign ("#") in the URL.
 * @param url - The url to parse.
 * @return the lowercase string after sharp sign in the URL; empty string if the sharp sign does not exist.
 */
export const getStringAfterSharp = (url: string): string => {
    const match = /#(.*?)(\?.*)?$/.exec(url)

    return match ? match[1].toLowerCase() : ''
}