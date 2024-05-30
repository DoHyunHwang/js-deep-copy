export default function deepCopy(value, seenMap = new Map()) {
  // 기본 타입 (null, undefined, string, number, boolean, symbol, bigint) 처리
  if (value === null || typeof value !== "object") {
    return value;
  }

  // 순환 참조 방지
  if (seenMap.has(value)) {
    return seenMap.get(value);
  }

  // 새로운 복사본 생성
  let copy;

  // Date 객체 복사
  if (value instanceof Date) {
    copy = new Date(value);
  }
  // RegExp 객체 복사
  else if (value instanceof RegExp) {
    copy = new RegExp(value);
  }
  // Array 복사
  else if (Array.isArray(value)) {
    copy = [];
    seenMap.set(value, copy);
    value.forEach((element, index) => {
      copy[index] = deepCopy(element, seenMap);
    });
  }
  // Map 복사 (weekMap은 복사 불가..)
  else if (value instanceof Map) {
    copy = new Map();
    seenMap.set(value, copy);
    value.forEach((mapValue, mapKey) => {
      copy.set(mapKey, deepCopy(mapValue, seenMap));
    });
  }
  // Set 복사
  else if (value instanceof Set) {
    copy = new Set();
    seenMap.set(value, copy);
    value.forEach((setValue) => {
      copy.add(deepCopy(setValue, seenMap));
    });
  }
  // 일반 객체 복사
  else {
    copy = {};
    seenMap.set(value, copy);
    Object.keys(value).forEach((key) => {
      copy[key] = deepCopy(value[key], seenMap);
    });
  }

  return copy;
}
