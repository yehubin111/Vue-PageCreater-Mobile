import { Pic, Filters } from './type';

// 主图
const mainPic: Pic = (pic, size = 750) => {
    return pic.indexOf('p7.highstreet.top') != -1 && pic.indexOf('?imageView') == -1 ? `${pic}?imageView2/0/w/${size}` : pic;
}
// 列表图
const listPic: Pic = (pic, size = 375) => {
    return pic.indexOf('p7.highstreet.top') != -1 && pic.indexOf('?imageView') == -1 ? `${pic}?imageView2/0/w/${size}` : pic;
}

const filters: Filters = {
    mainPic,
    listPic
}
export default filters;


