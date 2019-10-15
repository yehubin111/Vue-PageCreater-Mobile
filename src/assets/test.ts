

interface TestIdent<S> {
    (arg: S[]): S[]
}
let testIdent: TestIdent<number> = function (arg) {
    console.log(arg.length);
    return arg;
}
testIdent([1]);

// type LengthType = 'a' | 'b';
interface LengthType {
    length: number
}
function identity<T extends LengthType>(argu: T): T {
    console.log(argu.length);
    return argu;
}
identity({ a: 1, length: 100 });

interface thisType {
    name: string
}
class ItType {
    name: string = '100'
}
let p: thisType = new ItType();

async function stringPromise() {
    return "string promise";
}
type stringPromiseReturnType = ReturnType<typeof stringPromise>;

interface Tl {
    length: number
}
// ReturnType用于返回函数返回值类型
let Foo: <T>(name: T) => T = name => name;
type FooType = ReturnType<typeof Foo>;
// let t: FooType<string> = 'yehubin';

// NonNullable剔除null和undefined类型
type testType = NonNullable<string | null | undefined>;
let tl: testType = 'null';