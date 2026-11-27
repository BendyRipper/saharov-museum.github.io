function layoutStrip(strip, targetH, gap) {
    const imgs = Array.from(strip.querySelectorAll('img'));
    const W = strip.clientWidth;
    if (!W) return;

    let row = [], ratios = 0;

    function flush(isLast) {
        if (!row.length) return;
        const gaps = gap * (row.length - 1);
        let scale = (W - gaps) / (ratios * targetH);

        if (isLast && scale > 1.15) scale = 1;

        const h = targetH * scale;
        row.forEach(img => {
            img.style.width = Math.round(img._ratio * h) + 'px';
            img.style.height = Math.round(h) + 'px';
        });
        row = [];
        ratios = 0;
    }

    imgs.forEach(img => {
        img._ratio = img.naturalWidth > 0 ? img.naturalWidth / img.naturalHeight : 4 / 3;

        row.push(img);
        ratios += img._ratio;
        if (ratios * targetH + gap * (row.length - 1) > W) flush(false);
    });
    flush(true);
}

const strips = document.querySelectorAll('.photo-strip');
const GAP = 8;

function layoutAll() {
    const targetH = window.innerWidth <= 768 ? 140 : 260; 
    strips.forEach(s => layoutStrip(s, targetH, GAP));
}

window.addEventListener('load', layoutAll);
window.addEventListener('resize', layoutAll);
