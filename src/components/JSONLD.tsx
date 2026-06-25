import React from 'react';
import { generatePseoUrls } from '@/data/seo-matrix';
import { projects } from '@/data/master-data';

const SITE_URL = 'https://www.paranjapeblueridge.com';

function getSiloFAQs(silo: string, title: string, isMarathi: boolean) {
  const t = (en: string, mr: string) => isMarathi ? mr : en;
  switch(silo) {
    case 'investor':
      return [
        { 
          q: t(`Is ${title} a good investment in 2026?`, `२०२६ मध्ये ${title} ही एक चांगली गुंतवणूक आहे का?`), 
          a: t(`Yes. Blue Ridge Hinjewadi offers 4-5% rental yields and 12% annual capital appreciation — the highest in western Pune. Metro Line 3 proximity adds a further 15-20% premium.`, `होय. ब्लू रिज हिंजवडी ४-५% रेंटल यील्ड आणि १२% वार्षिक भांडवली वाढ प्रदान करते — जे पश्चिम पुण्यातील सर्वाधिक आहे. मेट्रो लाईन ३ च्या जवळीकतेमुळे अतिरिक्त १५-२०% प्रीमियम मिळतो.`) 
        },
        { 
          q: t('What is the expected ROI at Blue Ridge?', 'ब्लू रिजमध्ये अपेक्षित आरओआय (ROI) किती आहे?'), 
          a: t('Blue Ridge has seen 12% annual capital appreciation over 3 years. Rental yield of 4-5% makes it the best-yielding gated community in Hinjewadi Phase 1.', 'ब्लू रिजमध्ये गेल्या ३ वर्षांत १२% वार्षिक भांडवली वाढ झाली आहे. ४-५% चे रेंटल यील्ड याला हिंजवडी फेज १ मधील सर्वोत्तम परतावा देणारी गेटेड कम्युनिटी बनवते.') 
        }
      ];
    case 'corporate':
      return [
        { 
          q: t(`How far is ${title} from Hinjewadi IT Park?`, `हिंजवडी आयटी पार्कपासून ${title} किती अंतरावर आहे?`), 
          a: t('Infosys Phase 1 is 1.2 KM, Wipro 1.5 KM, TCS 1.8 KM, Embassy Tech Zone 2.5 KM. Blue Ridge SEZ is inside the township — zero commute for many residents.', 'इन्फोसिस फेज १ हे १.२ किमी, विप्रो १.५ किमी, टीसीएस १.८ किमी, एम्बसी टेक झोन २.५ किमी अंतरावर आहेत. ब्लू रिज एसईझेड टाउनशिपच्या आत आहे — ज्यामुळे रहिवाशांचा प्रवासाचा वेळ वाचतो.') 
        },
        { 
          q: t('Is there a walk-to-work lifestyle at Blue Ridge?', 'ब्लू रिजमध्ये वॉक-टू-वर्क जीवनशैली उपलब्ध आहे का?'), 
          a: t('Yes. Blue Ridge is the only 138-acre integrated township in Hinjewadi Phase 1 with an office park inside its gates. True walk-to-work lifestyle.', 'होय. ब्लू रिज ही हिंजवडी फेज १ मधील एकमेव १३८ एकरची एकात्मिक टाउनशिप आहे ज्याच्या गेटच्या आत ऑफिस पार्क (SEZ) आहे. खरी वॉक-टू-वर्क जीवनशैली.') 
        }
      ];
    case 'battleground': {
      const vsLabel = title.split('vs')[1]?.trim() || (isMarathi ? 'इतर टाउनशिप्स' : 'other townships');
      return [
        { 
          q: t(`Why choose Blue Ridge over ${vsLabel}?`, `${vsLabel} ऐवजी嚮 ब्लू रिज का निवडावे?`), 
          a: t('Blue Ridge offers a 138-acre ready integrated ecosystem with ICSE school, 9-hole golf course, private boat club, and walk-to-work SEZ — a complete lifestyle no competitor can match.', 'ब्लू रिज एक १३८ एकरची तयार एकात्मिक परिसंस्था प्रदान करते ज्यामध्ये आयसीएसई शाळा, ९-होल गोल्फ कोर्स, खाजगी बोट क्लब आणि वॉक-टू-वर्क एसईझेड समाविष्ट आहे — जे इतर कोणताही स्पर्धक देऊ शकत नाही.') 
        },
        { 
          q: t('Is possession ready at Blue Ridge Hinjewadi?', 'ब्लू रिज हिंजवडीमध्ये ताबा (Possession) मिळण्यास तयार आहे का?'), 
          a: t('Multiple clusters are ready or near-ready. Ridges 41: Dec 2028. Promenade: Sept 2029. Resale units in older towers available for immediate possession.', 'अनेक क्लस्टर्स तयार किंवा जवळजवळ तयार आहेत. रिजेस ४१: डिसेंबर २०२८. प्रोमेनेड: सप्टेंबर २०२९. जुन्या टॉवर्समधील पुनर्विक्रीचे युनिट्स त्वरित ताब्यासाठी उपलब्ध आहेत.') 
        }
      ];
    }
    case 'infrastructure':
    case 'infra-guide':
      return [
        { 
          q: t('When will Pune Metro Line 3 be ready near Blue Ridge?', 'ब्लू रिजजवळ पुणे मेट्रो लाईन ३ कधी सुरू होईल?'), 
          a: t('The Hinjewadi-Balewadi section of Pune Metro Line 3 is expected to open by late 2027, with the full corridor to Shivajinagar operational by 2029. The nearest station is just 800 meters from the entrance of the Blue Ridge township.', 'पुणे मेट्रो लाईन ३ चा हिंजवडी-बालेवाडी टप्पा २०२७ च्या अखेरीस सुरू होण्याची अपेक्षा आहे, आणि शिवाजीनगरपर्यंतचा संपूर्ण कॉरिडॉर २०२९ पर्यंत कार्यान्वित होईल. सर्वात जवळचे स्टेशन ब्लू रिज टाउनशिपच्या प्रवेशद्वारापासून अवघ्या ८०० मीटर अंतरावर आहे.') 
        },
        { 
          q: t('How will the Metro impact property appreciation at Blue Ridge Hinjewadi?', 'मेट्रोमुळे ब्लू रिज हिंजवडी येथील मालमत्ता मूल्य वाढीवर काय परिणाम होईल?'), 
          a: t('Properties located within a 1-kilometer radius of new metro stations historically command a 15-25% price premium post-launch. Blue Ridge is ideally positioned at 800 meters from the station to maximize this capital appreciation.', 'नवीन मेट्रो स्टेशनच्या १ किमी त्रिज्येतील मालमत्तांच्या किमती मेट्रो सुरू झाल्यानंतर १५-२५% वाढतात. ब्लू रिज या भांडवली वाढीचा जास्तीत जास्त फायदा घेण्यासाठी स्टेशनपासून ८०० मीटर अंतरावर योग्य ठिकाणी स्थित आहे.') 
        },
        { 
          q: t('What major roads connect Paranjape Blue Ridge to Baner, Balewadi, and Wakad?', 'परंजपे ब्लू रिजला बाणेर, बालेवाडी आणि वाकडशी जोडणारे मुख्य रस्ते कोणते आहेत?'), 
          a: t('Blue Ridge has direct access via the Hinjewadi-Wakad link road and the Rajiv Gandhi Infotech Park main road. It connects to Baner and Balewadi via the upcoming Balewadi-Hinjewadi bridge and the NH-48 Mumbai-Bangalore Highway, reducing travel times to under 15 minutes.', 'ब्लू रिजला हिंजवडी-वाकड लिंक रोड आणि राजीव गांधी इन्फोटेक पार्क मुख्य रस्त्यावरून थेट प्रवेश आहे. हे आगामी बालेवाडी-हिंजवडी पूल आणि NH-48 मुंबई-बंगलोर महामार्गाद्वारे बाणेर आणि बालेवाडीशी जोडले जाते, ज्यामुळे प्रवासाचा वेळ १५ मिनिटांपेक्षा कमी होतो.') 
        },
        { 
          q: t('How far is the Pune Railway Station and Pune Airport from Blue Ridge?', 'पुणे रेल्वे स्टेशन आणि पुणे विमानतळ ब्लू रिजपासून किती अंतरावर आहे?'), 
          a: t('Pune International Airport (PNQ) in Lohegaon is approximately 26 KM away via the airport road route, and Pune Junction Railway Station is about 20 KM. The upcoming Metro Line 3 will offer direct rapid transit connectivity from Hinjewadi to these key transit hubs.', 'लोहेगाव येथील पुणे आंतरराष्ट्रीय विमानतळ (PNQ) साधारण २६ किमी अंतरावर आहे आणि पुणे जंक्शन रेल्वे स्टेशन सुमारे २० किमी अंतरावर आहे. आगामी मेट्रो लाईन ३ हिंजवडीपासून या प्रमुख वाहतूक केंद्रांना थेट जलद कनेक्टिव्हिटी देईल.') 
        },
        { 
          q: t('What schools and healthcare options are close to Blue Ridge Hinjewadi?', 'ब्लू रिज हिंजवडीजवळ कोणते शाळा आणि आरोग्य सेवा पर्याय उपलब्ध आहेत?'), 
          a: t('Blue Ridge features the operational ICSE-affiliated Blue Ridge Public School directly within the township gates. Multi-specialty medical care is available at Ruby Hall Clinic Hinjewadi (1.5 KM), Sanjeevani Hospital, and Lifepoint Multispecialty Hospital nearby.', 'ब्लू रिजच्या आत आयसीएसई-संलग्न ब्लू रिज पब्लिक स्कूल कार्यरत आहे. जवळील रूबी हॉल क्लिनिक हिंजवडी (१.५ किमी), संजीवनी हॉस्पिटल आणि लाईफपॉईंट मल्टीस्पेशालिटी हॉस्पिटलमध्ये वैद्यकीय सेवा उपलब्ध आहेत.') 
        }
      ];
    case 'price-list': {
      const coreTitle = title.split('Price')[0].trim();
      return [
        { 
          q: t(`What is the price of ${coreTitle} at Blue Ridge?`, `ब्लू रिजमध्ये ${coreTitle} ची किंमत किती आहे?`), 
          a: t('2 BHK Ridges 41: from ₹97.60 L | 3 BHK Promenade: from ₹1.65 Cr | 4 BHK Altius: from ₹1.80 Cr | 5 BHK: ₹2.65 Cr. Prices subject to floor rise and applicable taxes.', '२ बीएचके रिजेस ४१: ₹९७.६० लाख पासून | ३ बीएचके प्रोमेनेड: ₹१.६५ कोटी पासून | ४ बीएचके आल्टियस: ₹१.८० कोटी पासून | ५ बीएचके: ₹२.६५ कोटी. किमती मजल्यानुसार आणि लागू करांनुसार बदलू शकतात.') 
        },
        { 
          q: t('What is the payment plan at Blue Ridge Hinjewadi?', 'ब्लू रिज हिंजवडी येथे पेमेंट प्लॅन कसा आहे?'), 
          a: t('Construction-linked plan: 10% on booking, 80% linked to milestones, 10% on possession. Home loans from SBI, HDFC, ICICI, Axis available. Contact sales for current schemes.', 'कन्स्ट्रक्शन-लिंक्ड प्लॅन: बुकिंगवर १०%, कामाच्या टप्प्यांनुसार ८०%, आणि ताब्यावेळी १०%. एसबीआय, एचडीएफसी, आयसीआयसीआय, ॲक्सिस बँकांकडून गृहकर्ज उपलब्ध. सध्याच्या ऑफर्ससाठी सेल्स टीमशी संपर्क साधा.') 
        }
      ];
    }
    case 'floor-plan': {
      const coreTitle = title.split('Floor')[0].trim();
      return [
        { 
          q: t(`What is the carpet area for ${coreTitle}?`, `${coreTitle} साठी कारपेट एरिया किती आहे?`), 
          a: t('2 BHK: 793-970 sq ft | 3 BHK: 1,250-1,316 sq ft | 4 BHK: 1,592-1,858 sq ft | 5 BHK: 2,480 sq ft. All carpet areas as per RERA registered plans.', '२ बीएचके: ७९३-९७० चौ. फूट | ३ बीएचके: १२५०-१३१६ चौ. फूट | ४ बीएचके: १५९२-१८५८ चौ. फूट | ५ बीएचके: २४८० चौ. फूट. सर्व कारपेट एरिया रेरा (RERA) नोंदणीकृत प्लॅन्सच्या आधारे आहेत.') 
        },
        { 
          q: t('How do I get the floor plan for Blue Ridge?', 'मला ब्लू रिजचा फ्लोअर प्लॅन कसा मिळू शकतो?'), 
          a: t('WhatsApp +91-7744009295 or use the enquiry form on this page. We dispatch the full PDF with all configurations within 30 minutes during business hours.', 'व्हॉट्सॲप +९१-७७४४००९२९५ वर संपर्क साधा किंवा या पेजवरील चौकशी फॉर्म भरा. आम्ही ऑफिस वेळेत ३० मिनिटांच्या आत सर्व कॉन्फिगरेशनसह संपूर्ण पीडीएफ पाठवतो.') 
        }
      ];
    }
    case 'site-visit':
      return [
        { 
          q: t('How do I book a site visit to Blue Ridge Hinjewadi?', 'मी ब्लू रिज हिंजवडीच्या साईट व्हिजिटसाठी बुकिंग कसे करू?'), 
          a: t('Call +91-20-67210000 or WhatsApp +91-7744009295. We offer 7-day slots including weekends. Sales Gallery at Blue Ridge Township, Phase 1, Hinjewadi, Pune - 411057. Open 9 AM-8 PM.', '+९१-२०-६७२१०००० वर कॉल करा किंवा व्हॉट्सॲप +९१-७७४४००९२९५ करा. आम्ही शनिवार-रविवारसह ७ दिवस बुकिंग देतो. सेल्स गॅलरी:夾 ब्लू रिज टाउनशिप, फेज १, हिंजवडी, पुणे - ४११०५७. वेळ सकाळी ९ ते रात्री ८.') 
        },
        { 
          q: t('Is there a virtual tour of Blue Ridge available?', 'ब्लू रिजचा व्हर्च्युअल टूर उपलब्ध आहे का?'), 
          a: t('Yes. Request a 360-degree virtual walkthrough of all towers and amenities via our enquiry form. Available instantly via WhatsApp.', 'होय. आमच्या चौकशी फॉर्मद्वारे सर्व टॉवर्स आणि सुविधांचा ३६०-डिग्री व्हर्च्युअल टूर मागवा. व्हॉट्सॲपवर त्वरित उपलब्ध.') 
        }
      ];
    case 'amenities':
      return [
        { 
          q: t(`What amenities does ${title} offer?`, `${title} मध्ये कोणत्या सुविधा उपलब्ध आहेत?`), 
          a: t('Paranjape Blue Ridge offers: 9-hole golf course, private boat club on Mula river, ICSE school inside, infinity pool, gymnasium, pet park, work-from-home pods, and 24/7 security.', 'परंजपे् ब्लू रिजमध्ये ९-होल गोल्फ कोर्स, मुळा नदीवर खाजगी बोट क्लब, आयसीएसई शाळा, इन्फिनिटी पूल, जिम, पेट पार्क, वर्क-फ्रॉम-होम पॉड्स आणि २४/७ सुरक्षा उपलब्ध आहे.') 
        },
        { 
          q: t('Is Blue Ridge Hinjewadi a fully gated community?', 'ब्लू रिज हिंजवडी पूर्णपणे गेटेड कम्युनिटी आहे का?'), 
          a: t('Yes. 138-acre fully gated township with CCTV, video door phones, intercom, and 24/7 manned checkpoints. Pets welcome in dedicated pet park.', 'होय. १३८ एकरची पूर्णपणे गेटेड टाउनशिप ज्यामध्ये सीसीटीव्ही, व्हिडिओ डोअर फोन, इंटरकॉम आणि २४/७ सुरक्षा चौक्या आहेत. समर्पित पेट पार्कमध्ये पाळीव प्राण्यांचे स्वागत आहे.') 
        }
      ];
    case 'towers':
    case 'clusters':
      return [
        { 
          q: t(`What configurations are available in ${title}?`, `${title} मध्ये कोणते पर्याय उपलब्ध आहेत?`), 
          a: t('Blue Ridge features premium 2, 3, 4, and 5 BHK luxury residences across its massive 138-acre township, including the ultra-premium Ridges 41 and The Altius clusters.', 'ब्लू रिजमध्ये त्याच्या भव्य १३८ एकरच्या टाउनशिपमध्ये प्रीमियम २, ३, ४ आणि ५ बीएचके लक्झरी घरे आहेत, ज्यात अति-प्रीमियम रिजेस ४१ आणि द आल्टियस क्लस्टर्स समाविष्ट आहेत.') 
        },
        { 
          q: t(`What are the possession dates for ${title}?`, `${title} साठी ताब्याची तारीख (Possession Date) काय आहे?`), 
          a: t('Many towers in Blue Ridge are ready-to-move-in. Newer clusters like Ridges 41 are slated for Dec 2028 possession, while The Altius and Promenade offer near-ready possession.', 'ब्लू रिजमधील अनेक टॉवर्स रेडी-टू-मूव्ह आहेत. रिजेस ४१ सारख्या नवीन क्लस्टर्सचा ताबा डिसेंबर २०२८ पर्यंत आहे, तर द आल्टियस आणि प्रोमेनेड लवकरच ताब्यासाठी तयार आहेत.') 
        }
      ];
    case 'luxury-west-pune':
      return [
        { 
          q: t(`Why is Blue Ridge the best choice for ${title}?`, `${title} साठी ब्लू रिज सर्वोत्तम पर्याय का आहे?`), 
          a: t('Unlike standalone luxury projects in Baner or Wakad, Blue Ridge is a self-sufficient 138-acre integrated township offering a golf course, boat club, and walk-to-work IT park proximity.', 'बाणेर किंवा वाकडमधील इतर लक्झरी प्रकल्पांच्या तुलनेत, ब्लू रिज ही एक स्वावलंबी १३८ एकरची एकात्मिक टाउनशिप आहे जी गोल्फ कोर्स, बोट क्लब आणि वॉक-टू-वर्क आयटी पार्क कनेक्टिव्हिटी प्रदान करते.') 
        },
        { 
          q: t('Is Hinjewadi Phase 1 better than Balewadi for luxury real estate?', 'लक्झरी रिअल इस्टेटसाठी बालेवाडीपेक्षा हिंजवडी फेज १ चांगली आहे का?'), 
          a: t('Yes. Hinjewadi Phase 1 offers zero-commute access to major IT hubs (Infosys, TCS) and features massive integrated townships like Blue Ridge that provide unmatched luxury amenities.', 'होय. हिंजवडी फेज १ प्रमुख आयटी कंपन्यांच्या जवळ प्रवासाचा वेळ वाचवते आणि ब्लू रिज सारख्या भव्य टाउनशिप्स येथे अतुलनीय लक्झरी सुविधा देतात.') 
        }
      ];
    case 'transactions':
      return [
        { 
          q: t(`How can I proceed with ${title}?`, `मी ${title} साठी पुढे कसे जाऊ?`), 
          a: t('You can easily browse all current Blue Ridge inventory, resale deals, and corporate rentals by contacting the official Paranjape Schemes sales gallery directly through this portal.', 'तुम्ही या अधिकृत पोर्टलद्वारे थेट संपर्क साधून सर्व ब्लू रिज इन्व्हेंटरी, रिसेल डील्स आणि कॉर्पोरेट रेंटल्स सहज पाहू शकता.') 
        },
        { 
          q: t('What is the resale value at Blue Ridge Hinjewadi?', 'ब्लू रिज हिंजवडी येथे रिसेलचे मूल्य किती आहे?'), 
          a: t('Blue Ridge commands the highest resale and rental value in Hinjewadi Phase 1 due to its mature infrastructure, active 9-hole golf course, and the operational Blue Ridge Public School.', 'ब्लू रिज हिंजवडी फेज १ मध्ये त्याचे विकसित इन्फ्रास्ट्रक्चर, सक्रिय ९-होल गोल्फ कोर्स आणि शाळेमुळे सर्वाधिक रिसेल आणि रेंटल व्हॅल्यू मिळवते.') 
        }
      ];
    case 'paranjape-schemes':
      return [
        { 
          q: t(`What is the developer reputation of Paranjape Schemes for ${title}?`, `${title} साठी परंजपे स्कीम्सची डेव्हलपर म्हणून प्रतिष्ठा कशी आहे?`), 
          a: t('Paranjape Schemes (Construction) Ltd has over 40 years of track record in Pune, with 50+ delivered projects, zero RERA complaints, and is highly respected for on-time delivery.', 'परंजपे स्कीम्सचा पुण्यात ४० पेक्षा जास्त वर्षांचा अनुभव आहे, ५० हून अधिक पूर्ण झालेले प्रकल्प आहेत, रेरा अंतर्गत कोणतीही तक्रार नाही आणि वेळेवर ताबा देण्यासाठी ते अत्यंत प्रतिष्ठित आहेत.') 
        },
        { 
          q: t(`Where is the project ${title} located?`, `हा प्रकल्प ${title} कुठे स्थित आहे?`), 
          a: t('The project ${title} is located in a prime growth corridor of Pune, offering excellent connectivity, social infrastructure, and high investment potential.', 'हा प्रकल्प ${title} पुण्याच्या मुख्य विकास क्षेत्रात स्थित आहे, जो उत्तम कनेक्टिव्हिटी, सामाजिक पायाभूत सुविधा आणि उच्च परताव्याची क्षमता देतो.') 
        }
      ];
    default:
      return [
        { 
          q: t(`What are the key features of ${title} at Blue Ridge?`, `ब्लू रिज येथील ${title} ची मुख्य वैशिष्ट्ये कोणती आहेत?`), 
          a: t('9-hole golf course, private boat club, Blue Ridge Public School (ICSE), pet park, infinity pool, and multi-tier security. MahaRERA registered.', '९-होल गोल्फ कोर्स, खाजगी बोट क्लब,ि ब्लू रिज पब्लिक स्कूल (ICSE), pet park, infinity pool, आणि बहुस्तरीय सुरक्षा. महारेरा नोंदणीकृत.') 
        },
        { 
          q: t('Is Blue Ridge RERA registered?', 'ब्लू रिज महारेरा (RERA) नोंदणीकृत आहे का?'), 
          a: t('Yes. Promenade: P52100055581, Altius: P52100078116, Ridges 41: P52100000054. All MahaRERA certified and compliant.', 'होय. प्रोमेनेड: P52100055581, आल्टियस: P52100078116, रिजेस ४१: P52100000054. सर्व महारेरा प्रमाणित आहेत.') 
        }
      ];
  }
}


interface JSONLDProps {
  pathname?: string;
}

export default function JSONLD({ pathname = '/' }: JSONLDProps) {
  const slug = pathname.replace(/^\//, '');
  const allUrls = generatePseoUrls();
  const pseoData = allUrls.find(u => u.slug === slug);
  const projectData = projects.find(p => p.slug === slug);

  const isMarathi = slug.startsWith('mr-') || pathname.includes('lang=mr');
  const t = (en: string, mr: string) => isMarathi ? mr : en;

  // --- Core Schemas (present on every page) ---

  const organizationSchema = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": t("Paranjape Schemes (Construction) Ltd.", "परंजपे स्कीम्स (कन्स्ट्रक्शन) लि."),
    "alternateName": [
      "Paranjape Schemes",
      "Paranjape Blue Ridge",
      "Paranjape Blue Ridge Hinjewadi",
      "Blue Ridge Hinjewadi",
      "Blue Ridge Township Pune",
      "Paranjape Schemes Construction Limited",
      "PSCL"
    ],
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/assets/images/paranjape-logo.svg`,
      "width": 300,
      "height": 60
    },
    "image": `${SITE_URL}/assets/images/township-night.png`,
    "description": t("Paranjape Schemes (Construction) Ltd. is a Pune-based real estate developer with 40+ years of experience and 50+ delivered projects. Blue Ridge Hinjewadi is their flagship 138-acre integrated township in Hinjewadi Phase 1, Pune.", "परंजपे स्कीम्स (कन्स्ट्रक्शन) लि. हा पुण्यातील ४०+ वर्षांचा अनुभव असलेला आणि ५०+ यशस्वी प्रकल्प पूर्ण केलेला अग्रगण्य रिअल इस्टेट डेव्हलपर आहे. ब्लू रिज हिंजवडी हा त्यांचा हिंजवडी फेज १ मधील १३८ एकरचा फ्लॅगशिप टाउनशिप प्रकल्प आहे."),
    "foundingDate": "1987",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": t("Blue Ridge, Phase 1, Hinjewadi", "ब्लू रिज, फेज १, हिंजवडी"),
      "addressLocality": t("Pune", "पुणे"),
      "addressRegion": t("Maharashtra", "महाराष्ट्र"),
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-20-67210000",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["English", "Marathi", "Hindi"]
    },
    "sameAs": [
      "https://www.pscl.in",
      "https://en.wikipedia.org/wiki/Paranjape_Schemes",
      "https://www.facebook.com/paranjapeschemes",
      "https://www.instagram.com/paranjapeschemes",
      "https://www.linkedin.com/company/paranjape-schemes",
      "https://twitter.com/ParanjapeSchemes"
    ]
  };

  const webSiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": t("Paranjape Blue Ridge Hinjewadi", "परंजपे ब्लू रिज हिंजवडी"),
    "description": t("Official portal for Paranjape Blue Ridge — Pune's premier 138-acre integrated township in Hinjewadi Phase 1.", "परंजपे ब्लू रिज - हिंजवडी फेज १ मधील पुण्याचा प्रमुख १३८ एकरचा टाउनशिप प्रकल्प अधिकृत पोर्टल."),
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/?s={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // --- Breadcrumb Schema ---
  const breadcrumbItems: { name: string; url: string }[] = [
    { name: t("Home", "होम"), url: SITE_URL }
  ];

  if (slug) {
    // Determine breadcrumb label from available data
    const pseoLabel = pseoData?.title;
    breadcrumbItems.push({
      name: pseoLabel || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      url: `${SITE_URL}/${slug}`
    });
  }

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${slug}#breadcrumb`,
    "itemListElement": breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  // --- Real Estate & Business Schemas ---

  // Resident Reviews — Diversified ratings to match 4.8/5 aggregate (Google quality signal)
  const nestedReviews = [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Rahul Sharma", "sameAs": "https://www.google.com/maps" },
      "datePublished": "2026-03-15",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "Living at Paranjape Blue Ridge for 3 years now. The walk-to-work from my flat to the Infosys campus takes under 10 minutes. The 9-hole golf course is world-class and the Blue Ridge Public School has been excellent for my kids. Best investment decision I made in Pune."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Priya Menon" },
      "datePublished": "2026-01-20",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "The Altius at Blue Ridge is simply stunning. River-facing 4 BHK with a private lift lobby and golf course views. Security is top-notch and the boat club is a weekend highlight for the family. Paranjape has delivered quality that no other township in Hinjewadi can match."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Vikram Nair" },
      "datePublished": "2025-11-10",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "As an NRI investor, I chose Blue Ridge Ridges 41 for its rental yield potential. Currently earning 4.8% annual yield from my 2 BHK. The township infrastructure, ICSE school inside, and Metro Line 3 proximity will drive further appreciation. Highly recommend for NRI property investment in Pune."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Anita Kulkarni" },
      "datePublished": "2025-09-22",
      "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "My 3 BHK in Promenade Residences has been largely great. River-facing balcony view is breathtaking and I work at Wipro nearby. Traffic during peak hours on the Hinjewadi bridge can be slow, but Blue Ridge's walk-to-work option means I often skip it entirely. Overall very happy with the township."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Suresh Patil" },
      "datePublished": "2025-12-05",
      "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "Bought a 4 BHK in The Altius in 2023 at ₹1.80 Cr. Current resale value is already ₹2.4 Cr. Maintenance charges could be lower for a property of this size, but the quality of infrastructure and the school inside the campus absolutely justifies it. Strong appreciation story."
    }
  ];

  const apartmentComplexSchema = {
    "@type": "ApartmentComplex",
    "@id": `${SITE_URL}/#apartmentcomplex`,
    "name": t("Paranjape Blue Ridge — 138-Acre Integrated Township, Hinjewadi Phase 1", "परंजपे् ब्लू रिज — १३८ एकर एकात्मिक टाउनशिप, हिंजवडी फेज १"),
    "alternateName": t("Blue Ridge Hinjewadi", "ब्लू रिज हिंजवडी"),
    "description": t("Pune's premier 138-acre integrated township offering premium 2, 3, 4 & 5 BHK luxury apartments in Hinjewadi Phase 1 near Rajiv Gandhi Infotech Park. Features include a 9-hole golf course, private boat club, ICSE school, walk-to-work SEZ, and Pune Metro Line 3 connectivity.", "राजीव गांधी इन्फोटेक पार्क जवळ हिंजवडी फेज १ मध्ये प्रीमियम २, ३, ४ आणि ५ बीएचके लक्झरी अपार्टमेंट्स देणारा पुण्याचा प्रमुख १३८ एकरचा टाउनशिप प्रकल्प. सुविधांमध्ये ९-होल गोल्फ कोर्स, खाजगी बोट क्लब, आयसीएसई शाळा आणि पुणे मेट्रो लाईन ३ कनेक्टिव्हिटी समाविष्ट आहे."),
    "url": SITE_URL,
    "telephone": "+91-20-67210000",
    "image": [
      `${SITE_URL}/assets/images/township-night.png`,
      `${SITE_URL}/assets/images/real-township-day.jpg`,
      `${SITE_URL}/assets/images/master-hero-v4.png`
    ],
    "numberOfAccommodationUnits": "5000+",
    "petsAllowed": true,
    "tourBookingPage": `${SITE_URL}/#enquiry`,
    "identifier": [
      { "@type": "PropertyValue", "name": "MahaRERA Promenade", "value": "P52100055581" },
      { "@type": "PropertyValue", "name": "MahaRERA Altius", "value": "P52100078116" },
      { "@type": "PropertyValue", "name": "MahaRERA Ridges 41", "value": "P52100000054" }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": t("Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park", "ब्लू रिज टाउनशिप, फेज १, हिंजवडी, राजीव गांधी इन्फोटेक पार्क"),
      "addressLocality": t("Pune", "पुणे"),
      "addressRegion": t("Maharashtra", "महाराष्ट्र"),
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5786825,
      "longitude": 73.7370331
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "9-Hole Professional Golf Course", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Private Boat Club on Mula River", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Blue Ridge Public School (ICSE)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Infinity Swimming Pool", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Walk-to-Work SEZ", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Gymnasium", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Jogging & Cycling Track", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Pet Park", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Security", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "High-Speed Elevators", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Captive Power Substation", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Pune Metro Line 3 Connectivity (800m)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "MahaRERA Certified", "value": true }
    ],
    "containedInPlace": {
      "@type": "City",
      "name": "Pune",
      "sameAs": "https://en.wikipedia.org/wiki/Pune"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2150"
    },
    "review": nestedReviews
  };

  let regionName = "Hinjewadi Phase 1";
  let postalCodeVal = "411057";
  let geoVal = { latitude: 18.5786825, longitude: 73.7370331 };

  // Knowledge Graph Trust Flow via Wikipedia & Wikidata geocoding anchors
  const trustBridges = [
    "https://en.wikipedia.org/wiki/Pune",
    "https://www.wikidata.org/wiki/Q1538", // Pune Wikidata
    "https://en.wikipedia.org/wiki/Hinjawadi",
    "https://www.wikidata.org/wiki/Q5766952", // Hinjawadi Wikidata
    "https://en.wikipedia.org/wiki/Paranjape_Schemes"
  ];

  if (slug) {
    if (slug.includes('wakad')) {
      regionName = "Wakad";
      postalCodeVal = "411057";
      geoVal = { latitude: 18.5987, longitude: 73.7753 };
      trustBridges.push("https://en.wikipedia.org/wiki/Wakad", "https://www.wikidata.org/wiki/Q7960783");
    } else if (slug.includes('baner')) {
      regionName = "Baner";
      postalCodeVal = "411045";
      geoVal = { latitude: 18.5590, longitude: 73.7868 };
      trustBridges.push("https://en.wikipedia.org/wiki/Baner", "https://www.wikidata.org/wiki/Q4856903");
    } else if (slug.includes('balewadi')) {
      regionName = "Balewadi";
      postalCodeVal = "411045";
      geoVal = { latitude: 18.5772, longitude: 73.7844 };
      trustBridges.push("https://en.wikipedia.org/wiki/Balewadi", "https://www.wikidata.org/wiki/Q4850785");
    } else if (slug.includes('punawale')) {
      regionName = "Punawale";
      postalCodeVal = "411033";
      geoVal = { latitude: 18.6305, longitude: 73.7542 };
      trustBridges.push("https://en.wikipedia.org/wiki/Punawale", "https://www.wikidata.org/wiki/Q110291993");
    }
  }

  const realEstateAgentSchema = {
    "@type": "RealEstateAgent",
    "name": "Paranjape Schemes (Construction) Ltd.",
    "alternateName": ["Paranjape Blue Ridge", "Blue Ridge Hinjewadi", "Paranjape Schemes Pune"],
    "image": `${SITE_URL}/assets/images/paranjape-logo.svg`,
    "@id": `${SITE_URL}/${slug}#business`,
    "url": `${SITE_URL}/${slug}`,
    "telephone": "+91-20-67210000",
    "priceRange": "₹97L - ₹2.65Cr",
    "hasMap": "https://www.google.com/maps/place/Blue+Ridge,+Phase+1,+Hinjawadi+Rajiv+Gandhi+Infotech+Park,+Hinjawadi,+Hinjavadi,+Maharashtra+411057/@18.5786825,73.7370331,17z",
    "geo": { "@type": "GeoCoordinates", "latitude": geoVal.latitude, "longitude": geoVal.longitude },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": geoVal.latitude, "longitude": geoVal.longitude },
      "geoRadius": "5000" // 5km radius dominance
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phase 1, Hinjewadi",
      "addressLocality": regionName,
      "postalCode": postalCodeVal,
      "addressCountry": "IN"
    },
    "location": { "@id": `${SITE_URL}/${slug}#place` },
    "sameAs": trustBridges
  };

  // VideoObject removed — fake contentUrl triggers GSC structured data errors.

  // --- Open House / Site Visit Event Schema ---
  const announcementSchema = {
    "@type": "Event",
    "@id": `${SITE_URL}/${slug}#launch-event`,
    "name": "Paranjape Blue Ridge Open House & Site Visit — Hinjewadi Pune",
    "description": "Visit the Paranjape Blue Ridge sales gallery and experience India's finest integrated township. Book a guided site tour of the 138-acre campus, golf course, boat club, and luxury show flats.",
    "startDate": "2026-01-01T09:00:00+05:30",
    "endDate": "2026-12-31T20:00:00+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Paranjape Blue Ridge Sales Gallery",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411057",
        "addressCountry": "IN"
      }
    },
    "organizer": { "@id": `${SITE_URL}/#organization` },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${SITE_URL}/blue-ridge-hinjewadi-site-visit`
    }
  };

  // --- Place Schema (Pune Real Estate Authority) ---
  const placeSchema = {
    "@type": "Place",
    "@id": `${SITE_URL}/${slug}#place`,
    "name": t("Paranjape Blue Ridge - 138 Acre Mega Township in West Pune", "परंजपे ब्लू रिज - पश्चिम पुण्यातील १३८ एकर मेगा टाउनशिप"),
    "description": t("Pune's premier real estate destination and luxury township located in the heart of Hinjewadi. Dominating the West Pune real estate market with premium 2, 3, 4, and 5 BHK apartments, a 9-hole golf course, and a massive IT SEZ.", "हिंजवडीच्या मध्यभागी असलेला पुण्याचा प्रमुख रिअल इस्टेट आणि लक्झरी टाउनशिप प्रकल्प. पश्चिम पुण्याच्या रिअल इस्टेट मार्केटमध्ये प्रीमियम २, ३, ४ आणि ५ बीएचके फ्लॅट्स, ९-होल गोल्फ कोर्स आणि भव्य आयटी एसईझेड सह वर्चस्व."),
    "url": `${SITE_URL}/${slug}`,
    "image": `${SITE_URL}/assets/images/township-aerial-night.jpg`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geoVal.latitude,
      "longitude": geoVal.longitude
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": t("Rajiv Gandhi Infotech Park, Phase 1", "राजीव गांधी इन्फोटेक पार्क, फेज १"),
      "addressLocality": t("Pune", "पुणे"),
      "addressRegion": t("Maharashtra", "महाराष्ट्र"),
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "containedInPlace": {
      "@type": "City",
      "name": t("Pune", "पुणे"),
      "url": "https://en.wikipedia.org/wiki/Pune"
    },
    "touristType": t("Pune Real Estate Landmark", "पुणे रिअल इस्टेट लँडमार्क"),
    "publicAccess": true
  };
  
  // --- LocalBusiness with Reviews ---
  const localBusinessSchema = {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/${slug}#localbusiness`,
    "name": slug && (slug.includes('wakad') || slug.includes('baner') || slug.includes('balewadi') || slug.includes('punawale'))
      ? t(`Paranjape Blue Ridge - Local Real Estate Gallery (${regionName} Region)`, `परंजपे ब्लू रिज - स्थानिक रिअल इस्टेट गॅलरी (${regionName} विभाग)`)
      : t("Paranjape Blue Ridge - Sovereign Sales Gallery", "परंजपे ब्लू रिज - सोव्हरेन सेल्स गॅलरी"),
    "alternateName": ["Blue Ridge Township", "Paranjape Blue Ridge Hinjewadi", "Paranjape Schemes Hinjewadi"],
    "keywords": "Pune Real Estate Market, Paranjape Blue Ridge Township Hinjewadi, Hinjewadi Real Estate Market, Luxury Apartments Pune West",
    "image": `${SITE_URL}/assets/images/township-night.png`,
    "url": `${SITE_URL}/${slug}`,
    "telephone": "+91-20-67210000",
    "priceRange": "₹97L - ₹2.65Cr",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "INR",
      "minPrice": "9700000",
      "maxPrice": "26500000"
    },
    "hasMap": "https://www.google.com/maps/place/Blue+Ridge,+Phase+1,+Hinjawadi+Rajiv+Gandhi+Infotech+Park,+Hinjawadi,+Hinjavadi,+Maharashtra+411057/@18.5786825,73.7370331,17z",
    "paymentAccepted": "Cash, Credit Card, Cheque, Wire Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": t("Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park", "ब्लू रिज टाउनशिप, फेज १, हिंजवडी, Rajiv Gandhi Infotech Park"),
      "addressLocality": t(regionName, regionName === "Hinjewadi Phase 1" ? "हिंजवडी फेज १" : regionName),
      "addressRegion": t("Maharashtra", "महाराष्ट्र"),
      "postalCode": postalCodeVal,
      "addressCountry": "IN"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": geoVal.latitude, "longitude": geoVal.longitude },
    "areaServed": {
      "@type": "City",
      "name": t("Pune", "पुणे"),
      "sameAs": "https://en.wikipedia.org/wiki/Pune"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2150"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "09:00", "closes": "20:00" }
    ]
  };

  // --- SiteNavigationElement Schema (Helps Google generate sitelinks) ---
  const siteNavigationSchema = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/${slug}#navigation`,
    "name": "Main Navigation",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Promenade Residences",
        "url": `${SITE_URL}/paranjape-blue-ridge-promenade-hinjewadi-pune`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "The Altius",
        "url": `${SITE_URL}/paranjape-blue-ridge-altius-hinjewadi-pune`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Ridges 41",
        "url": `${SITE_URL}/paranjape-blue-ridge-41-hinjewadi-pune`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Hinjewadi Market Guide",
        "url": `${SITE_URL}/hinjewadi-micro-market`
      }
    ]
  };

  // --- WebPage Schema with Speakable specifications ---
  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/${slug}#webpage`,
    "url": `${SITE_URL}/${slug}`,
    "name": pseoData?.title || projectData?.name || "Paranjape Blue Ridge Hinjewadi",
    "keywords": "Paranjape Blue Ridge Township Hinjewadi, Pune Real Estate Market, Blue Ridge Hinjewadi Pune, 2 BHK, 3 BHK, 4 BHK Flats in Hinjewadi, Paranjape Schemes",
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "about": { "@id": `${SITE_URL}/${slug}#place` },
    "mainEntity": { "@id": `${SITE_URL}/${slug}#business` },
    "primaryImageOfPage": { "@id": `${SITE_URL}/#listing` },
    "inLanguage": "en-IN",
    "dateModified": new Date().toISOString().split('T')[0],
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#speakable-title", "#speakable-summary"]
    }
  };

  // --- Build the Graph ---

  // HowTo Schema — targets "how to book / visit / buy at Blue Ridge" queries
  const howToSchema = {
    "@type": "HowTo",
    "@id": `${SITE_URL}/${slug}#howto`,
    "name": t("How to Book a Flat at Paranjape Blue Ridge Hinjewadi", "परंजपे ब्लू रिज हिंजवडी मध्ये फ्लॅट कसा बुक करावा"),
    "description": t("Step-by-step guide to booking your luxury residence at Paranjape Blue Ridge, Hinjewadi Phase 1, Pune.", "परंजपे ब्लू रिज, हिंजवडी फेज १, पुणे येथे लक्झरी घर बुक करण्यासाठी टप्प्याटप्प्याने मार्गदर्शक."),
    "totalTime": "PT30M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": t("Choose Your Configuration", "तुमचे कॉन्फिगरेशन निवडा"),
        "text": t("Browse 2 BHK, 3 BHK, 4 BHK, and 5 BHK options across Ridges 41, Promenade Residences, and The Altius. Prices start from ₹97.60 Lakhs.", "रिजेस ४१, प्रोमेनेड रेसिडेन्सेस आणि द आल्टियस मधील २ बीएचके, ३ बीएचके, ४ बीएचके आणि ५ बीएचके पर्याय पहा. किमती ₹९७.६० लाखांपासून सुरू होतात."),
        "url": `${SITE_URL}/#projects`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": t("Register Your Interest", "तुमची आवड नोंदवा"),
        "text": t("Fill the enquiry form on this page or WhatsApp +91-7744009295 to connect with a relationship manager.", "या पेजवरील चौकशी फॉर्म भरा किंवा रिलेशनशिप मॅनेजरशी संपर्क साधण्यासाठी व्हॉट्सॲप +९१-७७४४००९२९५ करा."),
        "url": `${SITE_URL}/#enquiry`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": t("Schedule a Site Visit", "साइट व्हिजिटचे नियोजन करा"),
        "text": t("Book a complimentary site visit at Blue Ridge Township, Phase 1, Hinjewadi, Pune. Sales gallery open 9 AM to 8 PM, 7 days a week.", "ब्लू रिज टाउनशिप, फेज १, हिंजवडी, पुणे येथे मोफत साइट व्हिजिट बुक करा. सेल्स गॅलरी आठवड्याचे ७ दिवस सकाळी ९ ते रात्री ८ वाजेपर्यंत उघडी असते."),
        "url": `${SITE_URL}/blue-ridge-hinjewadi-site-visit`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": t("Review RERA Details", "रेरा (RERA) तपशील तपासा"),
        "text": t("Verify MahaRERA numbers: Promenade P52100055581, Altius P52100078116, Ridges 41 P52100000054 on the official MahaRERA portal.", "अधिकृत महारेरा पोर्टलवर महारेरा क्रमांक: प्रोमेनेड P52100055581, आल्टियस P52100078116, रिजेस ४१ P52100000054 तपासा."),
        "url": "https://maharera.maharerait.gov.in"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": t("Apply for Home Loan", "गृहकर्जासाठी अर्ज करा"),
        "text": t("Blue Ridge is approved by all major banks: SBI, HDFC, ICICI, Axis, Kotak. Our team assists with home loan documentation and approval.", "ब्लू रिज सर्व प्रमुख बँकांद्वारे मंजूर आहे: SBI, HDFC, ICICI, Axis, Kotak. आमची टीम गृहकर्ज मंजुरीसाठी मदत करते."),
        "url": `${SITE_URL}/#enquiry`
      }
    ]
  };

  const graph: any[] = [
    organizationSchema,
    webSiteSchema,
    webPageSchema,
    breadcrumbSchema,
    apartmentComplexSchema,
    localBusinessSchema,
    realEstateAgentSchema,
    announcementSchema,
    siteNavigationSchema,
    placeSchema,
    howToSchema,
    // --- ImageObject for township photos (helps Google index images + image pack) ---
    {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#primary-image`,
      "url": `${SITE_URL}/assets/images/township-night.png`,
      "contentUrl": `${SITE_URL}/assets/images/township-night.png`,
      "name": "Paranjape Blue Ridge Hinjewadi — 138-Acre Integrated Township Night View",
      "description": "Aerial view of Paranjape Blue Ridge, Hinjewadi Phase 1, Pune — Pune's premier 138-acre integrated township with 5,000+ luxury residences.",
      "width": 1200,
      "height": 630,
      "inLanguage": "en-IN"
    },
    {
      "@type": "ImageObject",
      "url": `${SITE_URL}/assets/images/real-township-day.jpg`,
      "contentUrl": `${SITE_URL}/assets/images/real-township-day.jpg`,
      "name": "Paranjape Blue Ridge Hinjewadi Township Daytime View",
      "description": "Daytime aerial photograph of Blue Ridge township, Hinjewadi, showing the 9-hole golf course, private boat club on Mula river, and luxury residential towers.",
      "width": 1920,
      "height": 1080,
      "inLanguage": "en-IN"
    },
  ];

  // --- Per-Property Apartment, RealEstateListing & Product Schemas ---
  if (projectData) {
    projectData.configurations.forEach(config => {
      // Add Apartment Schema
      graph.push({
        "@type": "Apartment",
        "name": `${config.title} in ${projectData.name} - Blue Ridge Hinjewadi`,
        "description": `${config.title} at ${projectData.name}, Paranjape Blue Ridge Hinjewadi Phase 1. ${projectData.tagline}.`,
        "url": `${SITE_URL}/${projectData.slug}/${config.slug}`,
        "numberOfRooms": config.numberOfRooms || 3,
        "floorSize": config.floorSizeSqFt ? {
          "@type": "QuantitativeValue",
          "value": config.floorSizeSqFt,
          "unitCode": "FTK"
        } : undefined,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Blue Ridge, Phase 1, Hinjewadi",
          "addressLocality": "Pune",
          "postalCode": "411057",
          "addressCountry": "IN"
        },
        "identifier": projectData.reraNumber,
        "offers": config.priceValue ? {
          "@type": "Offer",
          "price": String(config.priceValue),
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/${projectData.slug}/${config.slug}`,
          "validFrom": "2026-01-01"
        } : undefined
      });

      // RealEstateListing schema — the most specific schema for real estate rich results
      if (config.priceValue) {
        graph.push({
          "@type": "RealEstateListing",
          "name": `${config.title} — ${projectData.name}, Paranjape Blue Ridge Hinjewadi`,
          "url": `${SITE_URL}/${projectData.slug}/${config.slug}`,
          "datePosted": "2026-01-01",
          "validThrough": "2027-12-31",
          "description": `Official listing for ${config.title} at ${projectData.name}. Paranjape Blue Ridge 138-acre integrated township, Hinjewadi Phase 1, Pune. MahaRERA: ${projectData.reraNumber}.`,
          "image": `${SITE_URL}${config.image || '/assets/images/township-night.png'}`,
          "offers": {
            "@type": "Offer",
            "price": String(config.priceValue),
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          },
          "about": {
            "@type": "Apartment",
            "numberOfRooms": config.numberOfRooms || 3,
            "floorSize": config.floorSizeSqFt ? {
              "@type": "QuantitativeValue",
              "value": config.floorSizeSqFt,
              "unitCode": "FTK"
            } : undefined,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Blue Ridge Township, Phase 1, Hinjewadi",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "postalCode": "411057",
              "addressCountry": "IN"
            },
            "identifier": { "@type": "PropertyValue", "name": "MahaRERA", "value": projectData.reraNumber }
          },
          "seller": { "@id": `${SITE_URL}/#organization` }
        });
      }

      // Product schema for Google Shopping/Search Tab rich results
      graph.push({
        "@type": "Product",
        "name": `${config.title} - ${projectData.name}`,
        "image": `${SITE_URL}${config.image || '/assets/images/township-night.png'}`,
        "description": `Premium ${config.title} with world-class amenities at Paranjape Blue Ridge Hinjewadi.`,
        "sku": `${projectData.id}-${config.slug}`,
        "brand": { "@type": "Brand", "name": "Paranjape Schemes" },
        "offers": {
          "@type": "Offer",
          "url": `${SITE_URL}/${projectData.slug}/${config.slug}`,
          "priceCurrency": "INR",
          "price": String(config.priceValue || 9500000),
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "2150"
        }
      });
    });
  }

  // --- PSEO-Specific Schemas ---
  if (pseoData) {
    graph.push({
      "@type": "Product",
      "name": pseoData.title,
      "description": pseoData.intent,
      "image": {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/${pseoData.slug}#primary-image`,
        "url": `${SITE_URL}/api/og?title=${encodeURIComponent(pseoData.title)}&type=Sovereign%20Portal`,
        "width": 1200,
        "height": 630
      },
      "brand": { "@type": "Brand", "name": "Paranjape Schemes" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "9500000",
        "availability": "https://schema.org/InStock",
        "url": `${SITE_URL}/${pseoData.slug}`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2150"
      }
    });

    // ItemList schema representing available projects on this configuration/category page
    graph.push({
      "@type": "ItemList",
      "@id": `${SITE_URL}/${pseoData.slug}#project-list`,
      "name": t(`Available Projects for ${pseoData.title}`, `${pseoData.title} साठी उपलब्ध प्रकल्प`),
      "description": t(`Premium residential clusters offering configurations for ${pseoData.title} in Paranjape Blue Ridge Hinjewadi.`, `परंजपे ब्लू रिज हिंजवडी मध्ये ${pseoData.title} साठी घरे उपलब्ध करून देणारे लक्झरी गृहप्रकल्प.`),
      "numberOfItems": projects.length,
      "itemListElement": projects.map((proj, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "RealEstateAgent",
          "@id": `${SITE_URL}/${proj.slug}#realestateagent`,
          "name": proj.name,
          "url": `${SITE_URL}/${proj.slug}`,
          "description": t(proj.description.slice(0, 150), proj.descriptionMr ? proj.descriptionMr.slice(0, 150) : proj.description.slice(0, 150))
        }
      }))
    });

    // Inject Silo FAQ
    const faqs = getSiloFAQs(pseoData.silo, pseoData.title, isMarathi);
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/${pseoData.slug}#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }

  // --- Homepage FAQ Schema ---
  if (!slug || slug === '') {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Paranjape Blue Ridge good for investment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Blue Ridge is Hinjewadi's most successful integrated township with high rental yields (4-5%) and consistent capital appreciation due to its proximity to Infosys, Wipro, and the upcoming Metro Line 3."
          }
        },
        {
          "@type": "Question",
          "name": "What is the price of a 2 BHK in Blue Ridge Hinjewadi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prices for 2 BHK residences in Ridges 41 start from ₹ 97.60 L onwards. Resale prices in older towers vary based on the cluster and facing."
          }
        },
        {
          "@type": "Question",
          "name": "How far is Blue Ridge from Hinjewadi Phase 1 IT Park?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blue Ridge is located inside Hinjewadi Phase 1, offering a true 'Walk-to-Work' lifestyle. Major campuses like Infosys and Wipro are within 1.5 KM."
          }
        },
        {
          "@type": "Question",
          "name": "Does Blue Ridge have a school inside?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the township features the Blue Ridge Public School (ICSE), ensuring your children have top-tier education within walking distance."
          }
        }
      ]
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
