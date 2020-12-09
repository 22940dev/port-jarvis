---
title: "Search"
url: /search
layout: etc
amp: false
---

<!-- markdownlint-disable -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"></script>
<script type="text/javascript">
  algoliasearchNetlify({
    appId: '0XNKMPBIAW',
    apiKey: '2cdf280c8d3ba1b40c38a7d71bbe5b0b',
    siteId: 'jakejarvis',
    branch: 'main',
    selector: 'div#search',
  });
</script>

<div id="search"></div>
<!-- markdownlint-enable -->
