# OG share cards

Source for the social-share thumbnails (`public/assets/og/og-card-{no,en}_v1.jpg`)
— the image messaging apps (iMessage, Messenger, WhatsApp, Slack, …) show when
someone shares a link to the site. Referenced from `generateMetadata` in
`app/[lang]/layout.tsx`.

Design notes:

- 1200×630 (the 1.91:1 Open Graph standard), rendered at 2× and downscaled.
- Bottom ~15% stays free of content: iMessage/Messenger overlay their own
  title bar there.
- Keep JPEGs under ~300 KB — WhatsApp skips images that are too heavy.

To change the card, edit the HTML files, then re-render:

```sh
cd scripts/og-cards
for l in no en; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless=new --disable-gpu --hide-scrollbars \
    --window-size=1200,630 --force-device-scale-factor=2 \
    --virtual-time-budget=15000 --screenshot="og-$l-2x.png" "file://$PWD/og-$l.html"
  sips -z 630 1200 -s format jpeg -s formatOptions 82 "og-$l-2x.png" \
    --out "../../public/assets/og/og-card-${l}_v2.jpg"   # bump _vN!
  rm "og-$l-2x.png"
done
```

Bump the `_vN` suffix on every change (and update the URLs in
`app/[lang]/layout.tsx`): scrapers and the CDN cache the old URL indefinitely
(`next.config.ts` serves `/assets/og/*_vN*` as immutable), so a new design
needs a new URL to show up.
