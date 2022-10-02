function sleep(millisecond) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, millisecond);
    });
}

function dateFor(timeDisplay) {
    let minute = timeDisplay / 60;
    let minutes = parseInt(minute);
    const m = minutes;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //秒
    let second = timeDisplay % 60;
    let seconds = Math.round(second);
    const s = seconds;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return { process: m * 60 + s, time: minutes + ":" + seconds };
}

function goBack() {
    this.$router.go(-1)
}

function getColor(url, span) {
    var canvas = document.createElement('canvas')
    var img = document.createElement('img')
    img.src = url
    canvas.width = img.width;
    canvas.height = img.height;

    var context = canvas.getContext("2d");
    img.crossOrigin = "Anonymous"
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 获取像素数据
    var imgData = context.getImageData(0, 0, img.width, img.height).data;
    console.log(imgData)
        // ImageData.data	类型为Uint8ClampedArray的一维数组，每四个数组元素代表了一个像素点的RGBA信息，每个元素数值介于0~255
    var b = '(' + imgData[0] + ',' + imgData[1] + ',' + imgData[2] + ',' + imgData[3] + ')'
    var c = '(' + imgData[4] + ',' + imgData[5] + ',' + imgData[6] + ',' + imgData[7] + ')'
    var d = '(' + 255 + ',' + 255 + ',' + 255 + ',' + 255 + ')'
    span.style.background = 'linear-gradient( rgb' + b + ',rgb' + c + ',rgb' + d + ')';
    console.log('linear-gradient( rgb' + b + ',rgb' + c + ',rgb' + d);
}

export {
    sleep,
    dateFor,
    goBack,
    getColor
}