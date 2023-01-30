(function () {
    "use strict";

    const get = (target) => {
        return document.querySelector(target);
    };

    const API_URL = "https://jsonplaceholder.typicode.com/posts";
    const $posts = get(".posts");

    let page = 1;
    let limit = 10;

    const getPosts = async () => {
        const res = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);
        if (!res.ok) {
            throw new Error("에러");
        }

        return await res.json();
    };

    const appendPostsList = (posts) => {
        const $dom = document.createDocumentFragment();

        posts.forEach((item) => {
            const $post = document.createElement("div");
            $post.className = "post";
            $post.innerHTML = `
              <div class="header">
                <div class="id">${item.id}</div>
                <div class="title">${item.title}</div>
              </div>
              <div class="body">${item.body}</div>
            `;

            $dom.appendChild($post);
        });

        $posts.appendChild($dom);
    };

    const showLoader = () => {
        const $loader = get(".loader");
        $loader.classList.add("show");
    };

    const unShowLoader = () => {
        const $loader = get(".loader");
        $loader.classList.remove("show");
    };

    const loadPost = async () => {
        showLoader();
        try {
            const posts = await getPosts();

            // post 데이터가 없을 경우 이벤트 삭제
            if (posts.length < limit) {
                window.removeEventListener("scroll", onPostsScrollLoader);
            }
            appendPostsList(posts);
        } catch (error) {
        } finally {
            unShowLoader();
        }
    };

    const onPostsScrollLoader = () => {
        const scrollTop = document.scrollingElement.scrollTop;
        const viewHeigth = document.scrollingElement.clientHeight;
        const documentHeigth = document.scrollingElement.scrollHeight;

        if (scrollTop + viewHeigth == documentHeigth) {
            page++;
            loadPost();
        }
    };

    const init = () => {
        loadPost();
        window.addEventListener("scroll", onPostsScrollLoader);
    };

    init();
})();
