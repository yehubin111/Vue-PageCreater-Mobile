// 主图
function mainPic(pic: string, size = 750): string {
    return pic.indexOf('p7.highstreet.top') != -1 && pic.indexOf('?imageView') == -1 ? `${pic}?imageView2/0/w/${size}` : pic;
}
// 列表图
function listPic(pic: string, size = 375): string {
    return pic.indexOf('p7.highstreet.top') != -1 && pic.indexOf('?imageView') == -1 ? `${pic}?imageView2/0/w/${size}` : pic;
}

interface Filters {
    [index: string]: any
}
const filters: Filters = {
    mainPic,
    listPic
}
export default filters;


