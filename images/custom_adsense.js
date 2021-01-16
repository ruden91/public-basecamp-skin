(() => {
  const targets = document.querySelectorAll(".bc-markdown h2[data-ke-size]");
  const ads = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
        style="display:block; text-align:center;"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2137294472379721"
        data-ad-slot="6068137219"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>  
  `;

  Array.from(targets).map(el => {
    const div = document.createElement("div");
    const parentEl = el.parentNode;

    div.classList.add("bc-ads-holder");
    div.classList.add("revenue_unit_item");
    div.classList.add("adsense");
    div.classList.add("responsive");

    div.innerHTML = ads;

    parentEl.insertBefore(div, el);
  });
})();
