import React from 'react';
import HomePageClient from '@/components/HomePageClient';
import LanguageInitializer from '@/components/LanguageInitializer';
import { Metadata } from 'next';

const SITE_URL = 'https://www.paranjapeblueridge.com';

export const metadata: Metadata = {
  title: "परंजपे ब्लू रिज हिंजवडी | पुण्यातील प्रीमियम २, ३, ४ आणि ५ बीएचके इंटिग्रेटेड टाऊनशिप",
  description: "परंजपे् ब्लू रिज हे हिंजवडीतील अग्रगण्य १३८-एकरी एकात्मिक टाऊनशिप आहे. गोल्फ कोर्स, बोट क्लब आणि वॉक-टू-वर्क आयटी पार्कसह लक्झरी अपार्टमेंट्स एक्सप्लोर करा.",
  alternates: {
    canonical: `${SITE_URL}/mr`,
    languages: {
      'en-IN': SITE_URL,
      'mr-IN': `${SITE_URL}/mr`,
    },
  },
  openGraph: {
    title: "परंजपे ब्लू रिज हिंजवडी | पुण्यातील प्रीमियम २, ३, ४ आणि ५ बीएचके इंटिग्रेटेड टाऊनशिप",
    description: "परंजपे् ब्लू रिज हे हिंजवडीतील अग्रगण्य १३८-एकरी एकात्मिक टाऊनशिप आहे. गोल्फ कोर्स, बोट क्लब आणि वॉक-टू-वर्क आयटी पार्कसह लक्झरी अपार्टमेंट्स एक्सप्लोर करा.",
    url: `${SITE_URL}/mr`,
    siteName: 'Paranjape Blue Ridge Sovereign Portal',
    images: [{ url: `${SITE_URL}/assets/images/township-night.png`, width: 1200, height: 630, alt: 'परंजपे् ब्लू रिज हिंजवडी — १३८-एकरी एकात्मिक टाऊनशिप' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ParanjapeSchemes',
    title: 'परंजपे् ब्लू रिज हिंजवडी — १३८-एकरी एकात्मिक टाऊनशिप',
    description: 'प्रीमियम २, ३ आणि ४ बीएचके घरे हिंजवडी फेज १ येथे. गोल्फ कोर्स आणि बोट क्लबसह वॉक-टू-वर्क जीवनशैली.',
    images: [`${SITE_URL}/assets/images/township-night.png`],
  },
};

export default function HomeMr() {
  return (
    <>
      <LanguageInitializer lang="mr" />
      {/* Homepage-only SEO content — speakable, screen-reader accessible, not repeated on other pages */}
      <div className="sr-only" aria-hidden="false">
        <h1 id="speakable-title">परंजपे ब्लू रिज हिंजवडी — पुण्यातील १३८-एकरी टाऊनशिपमध्ये प्रीमियम २, ३, ४ आणि ५ बीएचके फ्लॅट्स</h1>
        <p id="speakable-summary">राजीव गांधी इन्फोटेक पार्क जवळील हिंजवडी फेज १ मध्ये वसलेल्या पुण्याच्या सर्वात प्रसिद्ध १३८-एकरी एकात्मिक टाऊनशिप, परंजपे ब्लू रिज पुणे मध्ये आपले स्वागत आहे. परंजपे ब्लू रिज अपार्टमेंट्स खरेदी आणि भाड्याने देण्यासाठी सर्वोच्च ठिकाण म्हणून ओळखले जाते. वॉक-टू-वर्क जीवनशैलीसह प्रीमियम २ बीएचके, ३ बीएचके, ४ बीएचके आणि ५ बीएचके लक्झरी फ्लॅट्स ऑफर करत आहे. द रिज ४१, अल्टियस, ओरियन आणि टॉवर्स १ ते २६ चे घर, यामध्ये खाजगी ९-होल गोल्फ कोर्स, टाऊनशिपच्या आति ब्लू रिज पब्लिक स्कूल (आयसीएसई), मुळा नदीवरील खाजगी बोट क्लब आणि थेट इन्फोसिस, विप्रो आणि टीसीएस कॅम्पसमध्ये प्रवेश समाविष्ट आहे. ब्लू रिज विरुद्ध लाईफ रिपब्लिक किंवा मेगापोलिसची तुलना करा आणि पुणे वेस्ट मधील सर्वोत्तम लक्झरी रिअल इस्टेट गुंतवणुकीचा शोध घ्या, जे बाणेर, बालेवाडी आणि आगामी हिंजवडी मेट्रो स्टेशनपासून काही मिनिटांच्या अंतरावर आहे.</p>
        <ul>
          <li><a href="/mr-2-bhk-flats-in-hinjewadi-phase-1">२ बीएचके फ्लॅट्स हिंजवडी फेज १ - परतावा आणि किंमत</a></li>
          <li><a href="/mr-3-bhk-flats-in-hinjewadi-phase-1">३ बीएचके फ्लॅट्स हिंजवडी फेज १ - परतावा आणि किंमत</a></li>
          <li><a href="/mr-4-bhk-flats-in-hinjewadi-phase-1">४ बीएचके फ्लॅट्स हिंजवडी फेज १ - परतावा आणि किंमत</a></li>
          <li><a href="/mr-hinjewadi-micro-market">हिंजवडी फेज १ मायक्रो-मार्केट गुंतवणूक मार्गदर्शक २०२६</a></li>
          <li><a href="/insights/why-blue-ridge-hinjewadi-best-investment-2026">२०२६ मधील सर्वोत्तम गुंतवणूक -嚮 ब्लू रिज हिंजवडी</a></li>
        </ul>
        <p>महारेरा नोंदणी: Promenade P52100055581 | Altius P52100078116 | Ridges 41 P52100000054. संपर्क: +९१-२०-६७२१००००. पत्ता: ब्लू रिज टाऊनशिप, फेज १, हिंजवडी, राजीव गांधी इन्फोटेक पार्क, पुणे - ४११०५७, महाराष्ट्र, भारत.</p>
      </div>
      <HomePageClient />
    </>
  );
}
