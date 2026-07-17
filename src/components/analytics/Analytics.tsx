import Script from "next/script";
import { ADS_ID, ADS_CALL_SWAP_LABEL, GA4_ID, isReal } from "@/lib/seo";
import { SITE } from "@/lib/site";

/* Google tag with Consent Mode v2 on the California/CPRA opt-OUT model:
   consent defaults to granted; the cookie banner offers "Do Not Sell or
   Share My Personal Information", which flips everything to denied via
   updateConsent(false). A saved opt-out (including a legacy "declined"
   choice from the old opt-in banner) is re-applied before gtag.js runs,
   so returning opt-outs never grant. */
export function Analytics() {
  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
(function(){var out=false;try{var s=localStorage.getItem('onyx-cookie-consent');out=s==='optout'||s==='declined';}catch(e){}
var v=out?'denied':'granted';
gtag('consent','default',{'ad_storage':v,'analytics_storage':v,'ad_user_data':v,'ad_personalization':v,'functionality_storage':'granted','security_storage':'granted'});})();
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`gtag('js', new Date());
gtag('config', '${ADS_ID}', {'allow_enhanced_conversions': true});
gtag('config', '${ADS_ID}/${ADS_CALL_SWAP_LABEL}', {'phone_conversion_number': '${SITE.phoneDisplay}'});
${isReal(GA4_ID) ? `gtag('config', '${GA4_ID}');` : ""}`}
      </Script>
    </>
  );
}
