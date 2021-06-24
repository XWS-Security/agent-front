export function _arrayBufferToBase64(buffer, type) {
    if(type!=='image/jpeg'){
        type = 'video/mp4'
    }
    const prefix = "data:" + type + ";base64, ";
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return prefix + window.btoa(binary);
}

export  function  formatDate(date){
    const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
    const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
    return `${da}-${mo}-${ye}`
}
