/**
 * 引入指定路径的图片
 * @param name 相对于assets/images/所在文件路径， assets/images/${name}
 * @param base 默认
 * @returns
 */
export const getImageUrl = (name: string | URL) => {
  const href = new URL(`../assets/images/${name}`, import.meta.url)?.href
  return href
}
