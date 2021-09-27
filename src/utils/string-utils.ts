export function createUrlWithParams(
  url: string,
  params: Record<string, unknown>,
): string {
  let prefix = '';
  let sParams = '';
  Object.keys(params).forEach((key) => {
    const s = `${prefix}${key}=${params[key]}`;
    sParams += s;
    prefix = '&';
  });
  return sParams ? url + '?' + sParams : url;
}
