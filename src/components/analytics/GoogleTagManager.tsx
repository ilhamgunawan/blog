// Reference: https://support.google.com/tagmanager/answer/14847097?hl=en&ref_topic=15191151&sjid=2480768786472394739-NC

import Script from "next/script";

const GoogleTagManager: React.FC<{ gtmId: string }> = ({ gtmId }) => {
  return (
    <>
      <Script id="google-tag-manager" type="text/javascript">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

export default GoogleTagManager
