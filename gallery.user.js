// ==UserScript==
// @name        Oppaitime Torrent Gallery
// @namespace   akko@oppaiti.me
// @description Adds exhentai like gallery view to torrent page
// @include     https://oppaiti.me/torrents.php*
// @version     0.1
// @grant       none
// @icon http://oppaiti.me/favicon.ico
// ==/UserScript==

var images = document.querySelectorAll('[data-cover]');
var userStyle = document.querySelectorAll('[title]')[11];

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

toggleDiv = function (id) {
    var div = document.getElementById(id);
    console.log(div.style.display);
    if (div.style.display == "none") {
        Object.assign(div.style, {
            display: "block",
        });
    } else {
        Object.assign(div.style, {
            display: "none",
        });
    }
}

function add_gallery() {
    var search_form = document.getElementsByClassName("search_form")[6],
        elem = document.createElement("div"),
        info = document.createElement("div"),
        body = document.createElement("div");
    elem.id = "gallery_view";
    //elem.classList.add("box");
    info.id = "info";
    info.classList.add("head");
    body.id = "collage_body";
    //body.classList.add("box");
    info.innerHTML = "<strong>Gallery </strong><a class='brackets' onclick='toggleDiv(" + '"collage_body"' + ")' >Toggle</a>";
    Object.assign(body.style, {
        padding: "0",
        margin: "1px",
        display: "table"
    });
    insertAfter(search_form, elem);
    elem.append(info);
    elem.append(body);
}

function add_images() {
    var imageBody = document.getElementById("collage_body");
    for (i = 0; i < images.length; i++) {
        if (i % 3 === 0 || i === 0) {
            var imgWrapper3 = document.createElement("div");
            imgWrapper3.classList.add("image_wrapper");
            imgWrapper3.id = "test";
            imgWrapper3.style["-webkit-box-flex"] = 1;
            Object.assign(imgWrapper3.style, {
                display: "table"
            });
            imageBody.append(imgWrapper3);
        }
        initGroup(i);
    }
}

function initGroup(nth) {
    var artist = document.getElementsByClassName("torrent_artists")[nth].getElementsByTagName("a")[0],
        gallery = document.getElementById("test"),
        groupWrapper = document.createElement("div"),
        groupTitle = document.createElement("div"),
        imageWrapper = document.createElement("div"),
        imageLink = document.createElement("a"),
        image = document.createElement("img");
    groupWrapper.classList.add("box");
    groupTitle.classList.add("head");
    Object.assign(groupWrapper.style, {
        width: "217px",
        height: "320px",
        margin: "2px",
        float: "left",
        display: "block",
        background: "#23252a",
        borderRadius: "3px",
        overflow: "hidden"
    });
    if (userStyle.title == "oppai") {
        Object.assign(groupWrapper.style, {
            width: "217px",
        });
    } else if (userStyle.title == "beluga") {
        Object.assign(groupWrapper.style, {
            width: "220px",
        });
    } else {
        Object.assign(groupWrapper.style, {
            width: "219px",
        });
    }
    Object.assign(imageWrapper.style, {
        width: "200px",
        height: "auto",
        margin: "auto",
        marginTop: "5px",
        borderRadius: "5px",
        overflow:"hidden"
    });
    Object.assign(groupTitle.style, {
        height: "30px",
        textAlign: "center",
        fontSize: "8pt",
        color: "#fff",
        overflow: "hidden",
        lineHeight: "12px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    });
    Object.assign(image.style, {
        display: "block",
        position: "relative",
        height: "auto",
        width: "100%"
    });
    imageLink.href = images[nth].getAttribute("href");
    groupTitle.href = images[nth].getAttribute("href");
    image.src = images[nth].getAttribute("data-cover");
    try {
        groupTitle.innerHTML = "<a href=" + artist.getAttribute("href") + ">" + artist.innerHTML + "</a> - <a href=" + images[nth].getAttribute("href") + ">" + images[nth].innerHTML + "</a>";
    } catch (e) {
        groupTitle.innerHTML = "Various - <a href=" + images[nth].getAttribute("href") + ">" + images[nth].innerHTML + "</a>";
    }
    gallery.append(groupWrapper);
    groupWrapper.append(groupTitle);
    groupWrapper.append(imageWrapper);
    imageWrapper.append(imageLink);
    imageLink.append(image);
}

add_gallery();
add_images();
