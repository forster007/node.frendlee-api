function isEmpty(v) {
  if (v === null || v === undefined) return true;

  const isRealObject =
    v === Object(v) && Object.prototype.toString.call(v) === '[object Object]';
  const isRealArray =
    v === Object(v) && Object.prototype.toString.call(v) === '[object Array]';

  if (isRealArray) return v.length === 0;
  if (isRealObject) return Object.getOwnPropertyNames(v).length === 0;

  return `Is not array or object. Returned: ${typeof v}`;
}

export { isEmpty };
