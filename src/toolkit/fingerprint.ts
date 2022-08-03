function bin2hex(s:string) {
    let o = '', n;
    for (let i = 0, l = s.length; i < l; i++) {
      n = s.charCodeAt(i).toString(16);
      o += n.length < 2 ? '0' + n : n;
    }
    return o;
}
/**
 * 从根本上来说，每一种浏览器都会使用不同的图像处理引擎，不同的导出选项，不同的压缩等级，所以每一台电脑绘制出的图形都会有些许不同，
 * 这些图案可以被用来给用户设备分配特定编号（指纹），也就是说可以用来识别不同用户。
 * 测试结果表明，同一浏览器访问该域时生成的CRC校验码总是不变。
 * 可以简单理解为同样的HTML Canvas元素绘制操作，在不同的操作系统不同的浏览器上，产生的图片内容其实是不完全相同的。
 * 出现这种情况可能是有几个原因：
 *  1. 在图片格式上，不同web浏览器使用了不同的图形处理引擎、不同的图片导出选项、不同的默认压缩级别等。
 *  2. 在像素级别来看，操作系统各自使用了不同的设置和算法来进行抗锯齿和子像素渲染操作。
 *  3. 即使是相同的绘图操作，最终产生的图片数据在hash层面上依然是不同的。
 * @param domain 
 */
export function fingerOfCanvas(domain:string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const txt = `${domain}`;
    ctx.textBaseline = 'top';
    ctx.font = `14px 'Arial'`;
    ctx.fillStyle = '#f60';
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = '#069';
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(txt, 4, 17);

    const b64 = canvas.toDataURL().replace("data:image/png;base64,","");
    const bin = atob(b64);
    const crc = bin2hex(bin.slice(-16,-12));
    console.log(crc);
    return crc;
}