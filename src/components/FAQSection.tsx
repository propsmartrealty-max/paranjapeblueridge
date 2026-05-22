"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

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
    }
  ];


  return (
    <section id="faq" className="py-20 bg-navy-light/30 border-t border-white/5">

      <div className="container">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-[6px] uppercase text-[10px]">{t('Questions & Answers', 'प्रश्न आणि उत्तरे')}</span>
          <h2 className="text-5xl font-serif text-warm-white mt-4">{t('Sovereign', 'सोव्हरेन')} <span className="italic font-normal text-gold">{t('Insights', 'इन्साईट्स')}</span></h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-warm-white font-bold text-sm">{faq.q}</span>
                {openIndex === i ? <Minus className="text-gold" size={18} /> : <Plus className="text-gold" size={18} />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-text-light text-sm leading-relaxed border-t border-white/5">
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
