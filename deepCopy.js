export default function deepCopy(value, cache = new WeakMap()) {
  // 기본 타입 (null, undefined, string, number, boolean, symbol) 처리
  if (value === null || typeof value !== "object") {
    return value;
  }

  // 순환 참조 방지
  if (cache.has(value)) {
    // 객체가 이미 복사된 경우 캐시된 복사본을 반환
    return cache.get(value);
  }

  // Date 객체 복사
  if (value instanceof Date) {
    return new Date(value);
  }

  // RegExp 객체 복사
  if (value instanceof RegExp) {
    return new RegExp(value);
  }

  // Array 복사
  if (Array.isArray(value)) {
    const arrCopy = [];
    cache.set(value, arrCopy);
    value.forEach((item, index) => {
      arrCopy[index] = deepCopy(item, cache);
    });
    return arrCopy;
  }

  // Map 복사
  if (value instanceof Map) {
    const mapCopy = new Map();
    cache.set(value, mapCopy);
    value.forEach((v, k) => {
      mapCopy.set(k, deepCopy(v, cache));
    });
    return mapCopy;
  }

  // Set 복사
  if (value instanceof Set) {
    const setCopy = new Set();
    cache.set(value, setCopy);
    value.forEach((v) => {
      setCopy.add(deepCopy(v, cache));
    });
    return setCopy;
  }

  // 일반 객체 복사
  const objCopy = {};
  cache.set(value, objCopy);
  Object.keys(value).forEach((key) => {
    objCopy[key] = deepCopy(value[key], cache);
  });
  return objCopy;
}
