'use client';

import { useEffect } from 'react';

type Props = {
  slot: string;
  format?: string;
  responsive?: boolean;
  layout?: string;
};

export default function AdSlot({
  slot,
  format = 'auto',
  responsive = true,
  layout = '',
}: Props) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error adsbygoogle is not defined
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-3457241956721444"
      data-ad-slot= { slot ? slot : "6201179282"}
      data-ad-format= { format ? format : "fluid"}
      data-ad-layout-key="-6t+ed+2i-1n-4w"
      data-full-width-responsive={responsive ? 'true' : 'false'}
      data-ad-layout={layout}
    />
  );
}

{/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3457241956721444"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-client="ca-pub-3457241956721444"
     data-ad-slot="6201179282"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */}
