---
title: Projects
layout: home
---

<script>
function ajax(url, options, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(e) {
        if (this.readyState == 4 && this.status == 200) {
            if (options && !options.async) {
                return xhr.reponseText;
            }
            callback(xhr.responseText);
        }
    }

    const setHeaders = () => {
        if (options && options.headers) {
            for (let key in options.headers) {
                let val = options.headers[key];
                xhr.setRequestHeader(key, val);
            }
        }
    };

    if (options != null) {
        let async = options.async == undefined ? true : options.async;
        let method = options.method == undefined ? "GET" : options.method;
        let data = options.data == undefined ? null : options.data;

        xhr.open(method, url, async);
        setHeaders();
        xhr.send(data);
    }
    else {
        xhr.open("GET", url, true);
        setHeaders();
        xhr.send();
    }
}

let url = "https://api.github.com/users/phdumaresq/repos";
ajax(url, null, data => {
    data = JSON.parse(data);
    for (let repo of data) {
//        let xhr = new XMLHttpRequest();

//        xhr.onreadystatechange = function(e) {
//            console.log(this.readyState, this.status);

//            if (this.readyState == 4 && this.status == 200) {
//                let topics = JSON.parse(xhr.responseText);
//                console.log(topics);
                console.log(repo.owner);
                if (repo.owner.login == "phdumaresq") {
                    let html = "<h2><a href='" + repo.html_url + "'>" + repo.name + "</a></h2>";
                        html += "<label>Language: </label>" + repo.language + "<br />";
                        html += "<p>" + repo.description + "</p>";
                    console.log(html);
                    console.log(document.querySelector("h1"));
                }
//            }
//        }

//        xhr.open("GET", "https://api.github.com/repos/phudumaresq/" + repo + "/topics", false);
//        xhr.setRequestHeader("Accept", "application/vnd.github.mercy-preview+json")
//        xhr.send();
    }
});
</script>

# Projects
