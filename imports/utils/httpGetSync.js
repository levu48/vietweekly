export default function httpGetSync(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for sync
    xmlHttp.send( null );
    return xmlHttp.responseText;
}