"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      q: t("Is Paranjape Blue Ridge good for investment?", "परंजपे ब्लू रिज गुंतवणुकीसाठी चांगले आहे का?"),
      a: t("Yes, Blue Ridge is Hinjewadi's most successful integrated township with high rental yields (4-5%) and consistent capital appreciation due to its proximity to Infosys, Wipro, and the upcoming Metro Line 3.", "हो, ब्लू रिज हे हिंजवडीतील सर्वात यशस्वी टाऊनशिप आहे. इन्फोसिस, विप्रो आणि आगामी मेट्रो लाईन ३ च्या जवळ असल्यामुळे येथे उच्च भाडे उत्पन्न (४-५%) आणि सातत्यपूर्ण भांडवली वाढ मिळते.")
    },
    {
      q: t("What is the price of a 2 BHK in Blue Ridge Hinjewadi?", "ब्लू रिज हिंजवडीमध्ये २ बीएचकेची किंमत काय आहे?"),
      a: t("Prices for 2 BHK residences in Ridges 41 start from ₹ 97.60 L onwards. Resale prices in older towers vary based on the cluster and facing.", "रिजेस ४१ मधील २ बीएचके घरांच्या किमती ₹ ९७.६० लाख पासून सुरू होतात. जुन्या टॉवर्समधील पुनर्विक्रीच्या किमती क्लस्टर आणि फेसिंगनुसार बदलतात.")
    },
    {
      q: t("How far is Blue Ridge from Hinjewadi Phase 1 IT Park?", "ब्लू रिज हिंजवडी फेज १ आयटी पार्कपासून किती दूर आहे?"),
      a: t("Blue Ridge is located inside Hinjewadi Phase 1, offering a true 'Walk-to-Work' lifestyle. Major campuses like Infosys and Wipro are within 1.5 KM.", "ब्लू रिज हिंजवडी फेज १ च्या आत वसलेले आहे, जे खऱ्या अर्थाने 'वॉक-टू-वर्क' जीवनशैली देते. इन्फोसिस आणि विप्रोसारखे मोठे कॅम्पस १.५ किमी अंतरावर आहेत.")
    },
    {
      q: t("Does Blue Ridge have a school inside?", "ब्लू रिजच्या आत शाळा आहे का?"),
      a: t("Yes, the township features the Blue Ridge Public School (ICSE), ensuring your children have top-tier education within walking distance.", "हो, या टाऊनशिपमध्ये ब्लू रिज पब्लिक स्कूल (ICSE) आहे, ज्यामुळे तुमच्या मुलांना चालण्याच्या अंतरावर उच्च दर्जाचे शिक्षण मिळेल.")
    },
    {
      q: t("Can NRIs buy property at Paranjape Blue Ridge?", "NRI परंजपे ब्लू रिजमध्ये मालमत्ता खरेदी करू शकतात का?"),
      a: t("Yes. NRIs, PIOs, and OCIs can purchase residential property in India under FEMA regulations without RBI approval. Blue Ridge is MahaRERA certified and bank-approved (SBI, HDFC, ICICI). Our dedicated NRI desk handles documentation end-to-end and 100% remote purchase is possible.", "होय. FEMA नियमांतर्गत RBI परवानगीशिवाय NRI, PIO आणि OCI भारतात मालमत्ता खरेदी करू शकतात. ब्लू रिज महारेरा प्रमाणित आहे.")
    },
    {
      q: t("What is the MahaRERA registration number for Blue Ridge?", "ब्लू रिजचा MahaRERA नोंदणी क्रमांक काय आहे?"),
      a: t("Promenade: P52100055581 | The Altius: P52100078116 | Ridges 41: P52100000054. All clusters are fully MahaRERA certified and compliant. Verify at maharera.maharerait.gov.in.", "प्रोमेनेड: P52100055581 | द आल्टियस: P52100078116 | रिजेस ४१: P52100000054. सर्व क्लस्टर्स महारेरा प्रमाणित आहेत.")
    }
  ];

  // FAQPage JSON-LD schema — injected as a script tag alongside the component
  // This enables Google's FAQ rich results (accordion dropdowns in SERPs)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section id="faq" className="py-20 border-t border-gold/10">
      {/* FAQPage JSON-LD Schema — required for Google rich result eligibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        <div className="text-center mb-16">
          <span className="gilded-pill mb-3">{t('Questions & Answers', 'प्रश्न आणि उत्तरे')}</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-warm-white mt-4 font-bold">{t('Sovereign', 'सोव्हरेन')} <span className="italic font-normal text-gilded">{t('Insights', 'इन्साईट्स')}</span></h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="ultra-glass-card rounded-2xl overflow-hidden border border-gold/25 hover:border-gold/50 transition-all shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gold/5 transition-colors cursor-pointer"
              >
                <span className="text-warm-white font-bold text-sm sm:text-base">{faq.q}</span>
                {openIndex === i ? <Minus className="text-gold shrink-0 ml-4" size={18} /> : <Plus className="text-gold shrink-0 ml-4" size={18} />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-text-muted text-sm leading-relaxed border-t border-gold/15 font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
