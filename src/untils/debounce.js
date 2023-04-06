// 第四版
export default function debounce(func, wait) {

    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        // 如果已经执行过，不再执行
        let callNow = !timeout;
        timeout = setTimeout(function(){
            timeout = null;
        }, wait)
        if (callNow) func.apply(context, args);
    }
}