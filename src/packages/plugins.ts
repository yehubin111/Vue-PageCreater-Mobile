export function debounceFc(func: () => void, wait: number) {
    let timeout: any;
    return function(this: any) {
        const me: any = this;
        if (timeout) { clearTimeout(timeout); }

        timeout = setTimeout(() => {
            func.call(me);
        }, wait);
    };
}
