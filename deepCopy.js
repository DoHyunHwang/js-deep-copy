export default function deepCopy(value, seenMap = new Map()) {
  // 기본 타입 (null, undefined, string, number, boolean, symbol, bigint) 처리
  if (value === null || typeof value !== "object") {
    return value;
  }

  // 순환 참조 방지
  if (seenMap.has(value)) {
    return seenMap.get(value);
  }

  // 특정 타입 복사를 위한 객체
  const constructors = {
    '[object Date]': () => new Date(value),
    '[object RegExp]': () => new RegExp(value),
    '[object Array]': () => {
      const copy = [];
      seenMap.set(value, copy);
      value.forEach((element, index) => {
        copy[index] = deepCopy(element, seenMap);
      });
      return copy;
    },
    '[object Map]': () => {
      const copy = new Map();
      seenMap.set(value, copy);
      value.forEach((mapValue, mapKey) => {
        copy.set(mapKey, deepCopy(mapValue, seenMap));
      });
      return copy;
    },
    '[object Set]': () => {
      const copy = new Set();
      seenMap.set(value, copy);
      value.forEach((setValue) => {
        copy.add(deepCopy(setValue, seenMap));
      });
      return copy;
    }
  };

  // 객체의 정확한 타입 확인 (tag)
  const tag = Object.prototype.toString.call(value);
  // constructors 객체에 해당 타입이 있을 경우 호출
  if (constructors[tag]) {
    return constructors[tag]();
  }

  // 일반 객체 복사
  const copy = {};
  seenMap.set(value, copy);
  Object.keys(value).forEach((key) => {
    copy[key] = deepCopy(value[key], seenMap);
  });

  return copy;
}
