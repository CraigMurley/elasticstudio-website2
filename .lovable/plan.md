## Set Elastic Studio logo as favicon

1. Copy the uploaded `Elastic-Round-Icon-2.png` to `public/favicon.png`.
2. Delete the existing `public/favicon.ico` so browsers don't fall back to it.
3. Update `index.html` to reference the new favicon: `<link rel="icon" href="/favicon.png" type="image/png">`.