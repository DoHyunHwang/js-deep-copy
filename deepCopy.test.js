import deepCopy from "./deepCopy";

describe("deepCopy", () => {
  // 기본 타입은 값 자체를 복사 하므로 원본과 복사본이 동일해야 한다.
  test("Primitive(Number) 타입 복사", () => {
    expect(deepCopy(42)).toBe(42);
  });

  test("Primitive(BigInt) 타입 복사", () => {
    expect(deepCopy(BigInt(12345678901234567890))).toBe(BigInt(12345678901234567890));
  });

  test("Primitive(String) 타입 복사", () => {
    expect(deepCopy("hello")).toBe("hello");
  });

  test("Primitive(Null) 타입 복사", () => {
    expect(deepCopy(null)).toBeNull();
  });

  test("Primitive(Undefined) 타입 복사", () => {
    expect(deepCopy(undefined)).toBeUndefined();
  });

  test("Primitive(Boolean) 타입 복사", () => {
    expect(deepCopy(true)).toBe(true);
  });

  test("Primitive(Symbol) 타입 복사", () => {
    expect(deepCopy(Symbol("sym")).toString()).toBe(Symbol("sym").toString());
  });

  // 원본과 동일한 값을 가져야 하지만, 동일한 참조가 아닌지 확인 한다.
  test("Date 객체 타입 복사", () => {
    const date = new Date();
    const copy = deepCopy(date);
    expect(copy).toEqual(date); // 날짜 값이 동일함을 확인
    expect(copy).not.toBe(date); // 복사본이 원본과 동일한 참조가 아님을 확인
  });

  test("RegExp 타입 복사", () => {
    const regex = /abc/g;
    const copy = deepCopy(regex);
    expect(copy).toEqual(regex);
    expect(copy).not.toBe(regex);
  });

  test("Array 타입 복사", () => {
    const arr = [1, 2, { a: 3 }];
    const copy = deepCopy(arr);
    expect(copy).toEqual(arr); // 배열 값이 동일함을 확인
    expect(copy).not.toBe(arr); // 복사본이 원본과 동일한 참조가 아님을 확인
    expect(copy[2]).not.toBe(arr[2]); // 중첩된 객체도 다른 참조임을 확인
  });

  test("Object 타입 복사", () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = deepCopy(obj);
    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
    expect(copy.b).not.toBe(obj.b);
  });

  test("Map 타입 복사", () => {
    const map = new Map([["key1", "value1"]]);
    const copy = deepCopy(map);
    expect(copy).toEqual(map);
    expect(copy).not.toBe(map);
  });

  test("Set 타입 복사", () => {
    const set = new Set([1, 2, 3]);
    const copy = deepCopy(set);
    expect(copy).toEqual(set);
    expect(copy).not.toBe(set);
  });

  test("References 타입 복사", () => {
    const obj = {};
    obj.self = obj;
    const copy = deepCopy(obj);
    expect(copy).toEqual(obj); // 순환 참조 객체가 동일함을 확인
    expect(copy).not.toBe(obj); // 복사본이 원본과 동일한 참조가 아님을 확인
    expect(copy.self).toBe(copy); // 복사된 객체의 순환 참조도 올바르게 처리됨을 확인
  });

  test("중첩된 구조(Nested Structures) 복사", () => {
    const complex = {
      a: [1, 2, { b: new Map([["key", new Set([1, 2, 3])]]) }],
      c: new Date(),
      d: /xyz/g,
    };
    const copy = deepCopy(complex);
    expect(copy).toEqual(complex);
    expect(copy).not.toBe(complex);
  });
});
