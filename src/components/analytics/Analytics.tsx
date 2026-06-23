import Script from "next/script";
import { ADS_ID, GA4_ID } from "@/lib/seo";

/* Google tag with Consent Mode v2.

   Order matters: consent DEFAULT (everything denied) is set before gtag.js
   processes any config, so no ad/analytics cookies are written until the
   visitor accepts in the cookie banner (which calls updateConsent). */
export function Analytics() {
  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','functionality_storage':'granted','security_storage':'granted','wait_for_update':500});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`gtag('js', new Date());
gtag('config', '${ADS_ID}', {'allow_enhanced_conversions': true});
gtag('config', '${GA4_ID}');`}
      </Script>
    </>
  );
}
