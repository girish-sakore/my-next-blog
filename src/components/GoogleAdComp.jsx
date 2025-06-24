'use client';
import React, { useEffect } from "react";

const GoogleAdComp = () => {
  useEffect(() => {
    // Load the Google AdSense script
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3457241956721444";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Push the ad to the adsbygoogle array
    (window.adsbygoogle = window.adsbygoogle || []).push({});

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="fluid"
      data-ad-layout-key="-6t+ed+2i-1n-4w"
      data-ad-client="ca-pub-3457241956721444"
      data-ad-slot="6201179282"
    ></ins>
  );
};

export default GoogleAdComp;
