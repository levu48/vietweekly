export function isBlocked(link = '') {
    for (site of BLOCKED_SITES) {
        if (link.match(new RegExp(site, 'g')))
            return true;
    }
    return false;
}

export const BLOCKED_SITES = [
    'danlambaovn.blogspot.com',
    'chauxuannguyen.org',
    'vietcongonline.com',
    'thuvienhoasen.info',
    'www.geocities.ws/xoathantuong',
    'baothamnhung.com',
    'vi.rfi.fr',
    'bbc.com/vietnamese',
    'voatiengviet.com',
    'nguoi-viet.com',
    'vietnamsaigon75.blogspot.com',
    'tudodanchu.wordpress.com',
    'nhatbaovanhoa.com',
    'tinvip30s.com',
    'doithoaionline.wordpress.com',
    'facebook.com',
    'bacaytruc.com',
    'siphuvietnam.wordpress.com',
    'chimbaobao.com',
    'tinmungchonguoingheo.com',
    'vietvungvinh.com',
    'ethongluan.org',
    'chinhluanhaingoai.net',
    'nsvietnam.blogspot.com',
    'viendongdaily.com',
    'vietbao.com',
    'www.bbc.co.uk/blogs/vietnamese',
    'hieuminh.org',
    'vietduongnhan.blogspot.com',
    'nguoivietnamchau.com',
    'vivi099.wordpress.com',
];
