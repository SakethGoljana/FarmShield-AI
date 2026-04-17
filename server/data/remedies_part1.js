/**
 * DESCRIPTIVE REMEDY DATABASE — English + Hindi
 * Each remedy is a detailed paragraph explaining WHAT to do, HOW to do it, and WHY.
 * Organized by disease key matching ML model output.
 */

const REMEDIES = {
  // ═══════════════════════════════════════════
  //  APPLE (7 classes)
  // ═══════════════════════════════════════════
  'Apple___alternaria_leaf_spot': {
    en: [
      'Apply Mancozeb or Iprodione Fungicide — Alternaria leaf spot is caused by the Alternaria mali fungus that thrives in warm, humid conditions. Prepare a spray solution by mixing mancozeb at 2.5 grams per litre of water, and spray it thoroughly on all leaf surfaces including the undersides. Repeat applications every 10 to 14 days during the growing season, especially after rain. Always wear protective gloves and a face mask when handling chemical fungicides.',
      'Remove and Destroy Infected Leaves — As soon as you notice brown or dark spots with concentric rings on the leaves, pluck them off carefully and collect any fallen leaves from the ground. Do not add these to your compost pile as the fungal spores can survive and re-infect your trees. Instead, burn them or bury them far away from your orchard. This reduces the number of spores available to spread the infection.',
      'Ensure Proper Tree Spacing for Airflow — Overcrowded trees create a damp, still-air environment that fungi love. When planting new trees, maintain at least 4 to 5 metres between each tree. For existing orchards, prune the inner branches to open up the canopy and allow sunlight and wind to reach all parts of the tree. Good air circulation helps leaves dry quickly after rain, which significantly reduces fungal growth.',
    ],
    hi: [
      'मैंकोज़ेब या इप्रोडायोन कवकनाशी का छिड़काव करें — अल्टरनेरिया पत्ती धब्बा रोग अल्टरनेरिया माली कवक के कारण होता है जो गर्म और नम वातावरण में पनपता है। एक लीटर पानी में 2.5 ग्राम मैंकोज़ेब मिलाकर छिड़काव का घोल तैयार करें और पत्तियों की ऊपरी और निचली दोनों सतहों पर अच्छी तरह छिड़काव करें। बढ़ते मौसम में हर 10 से 14 दिन में छिड़काव दोहराएं, खासकर बारिश के बाद। रासायनिक कवकनाशी इस्तेमाल करते समय हमेशा सुरक्षात्मक दस्ताने और मास्क पहनें।',
      'संक्रमित पत्तियों को हटाएं और नष्ट करें — जैसे ही आपको पत्तियों पर भूरे या काले गोलाकार धब्बे दिखें, उन्हें सावधानी से तोड़ लें और जमीन पर गिरी हुई पत्तियों को भी इकट्ठा करें। इन्हें अपनी खाद में न मिलाएं क्योंकि कवक के बीजाणु जीवित रह सकते हैं और आपके पेड़ों को फिर से संक्रमित कर सकते हैं। इन्हें जला दें या अपने बाग से दूर गाड़ दें। इससे संक्रमण फैलाने वाले बीजाणुओं की संख्या कम होती है।',
      'हवा के प्रवाह के लिए पेड़ों के बीच उचित दूरी रखें — भीड़-भाड़ वाले पेड़ एक नम, शांत वातावरण बनाते हैं जो कवक को पसंद है। नए पेड़ लगाते समय हर पेड़ के बीच कम से कम 4 से 5 मीटर की दूरी रखें। मौजूदा बागों में, छतरी को खोलने के लिए भीतरी शाखाओं की छंटाई करें ताकि धूप और हवा पेड़ के सभी हिस्सों तक पहुंचे। अच्छा वायु संचार बारिश के बाद पत्तियों को जल्दी सुखाता है, जिससे कवक की वृद्धि काफी कम होती है।',
    ]
  },
  'Apple___black_rot': {
    en: [
      'Prune Infected Branches Below the Canker — Black rot is caused by the Botryosphaeria obtusa fungus that forms cankers (sunken, dead areas) on branches. Using sharp, sterilized pruning shears, cut at least 15 centimetres below the visible canker into healthy wood. After each cut, sterilize the shears with rubbing alcohol or a 10% bleach solution to avoid spreading the fungus. Apply wound sealant to the cut to prevent re-infection.',
      'Apply Copper-Based Fungicide — Spray a copper hydroxide or copper sulfate fungicide during the dormant season (late winter, before buds open) and again at petal fall. Mix according to package directions, typically 30 to 50 grams per 10 litres of water. Ensure thorough coverage of the entire tree including trunk and branches. Copper-based fungicides create a protective barrier on the tree surface that prevents fungal spores from germinating.',
      'Remove All Mummified Fruits — Infected fruits that remain on the tree or fall to the ground become reservoirs of the fungus. Walk through your orchard and collect every shrivelled, blackened fruit from both the tree and the ground. Dispose of them by burning or burying at least 30 centimetres deep, far from the orchard. Doing this in late autumn drastically reduces the fungal load for the next growing season.',
    ],
    hi: [
      'कैंकर के नीचे संक्रमित शाखाओं की छंटाई करें — काला सड़न बोट्रियोस्फेरिया ऑब्टुसा कवक के कारण होता है जो शाखाओं पर कैंकर (धंसे हुए, मृत क्षेत्र) बनाता है। तेज, निष्फल कटाई कैंची का उपयोग करके दिखाई देने वाले कैंकर से कम से कम 15 सेंटीमीटर नीचे स्वस्थ लकड़ी में काटें। हर कट के बाद कवक के प्रसार से बचने के लिए कैंची को रबिंग अल्कोहल या 10% ब्लीच के घोल से निष्फल करें। पुनः संक्रमण रोकने के लिए कट पर घाव सीलेंट लगाएं।',
      'कॉपर-आधारित कवकनाशी का छिड़काव करें — सुप्त मौसम (देर सर्दियों में, कलियां खुलने से पहले) और फिर पंखुड़ियां गिरने पर कॉपर हाइड्रॉक्साइड या कॉपर सल्फेट कवकनाशी का छिड़काव करें। पैकेज के निर्देशानुसार मिलाएं, आमतौर पर 10 लीटर पानी में 30 से 50 ग्राम। तने और शाखाओं सहित पूरे पेड़ पर अच्छी तरह छिड़काव सुनिश्चित करें। कॉपर-आधारित कवकनाशी पेड़ की सतह पर एक सुरक्षात्मक परत बनाते हैं जो कवक बीजाणुओं को अंकुरित होने से रोकती है।',
      'सभी सूखे मुरझाए फल हटाएं — संक्रमित फल जो पेड़ पर रहते हैं या जमीन पर गिर जाते हैं, कवक के भंडार बन जाते हैं। अपने बाग में घूमें और हर सिकुड़े हुए, काले फल को पेड़ और जमीन दोनों से इकट्ठा करें। इन्हें जलाकर या बाग से दूर कम से कम 30 सेंटीमीटर गहरा गाड़कर निपटाएं। देर शरद ऋतु में ऐसा करने से अगले मौसम के लिए कवक की मात्रा काफी कम हो जाती है।',
    ]
  },
  'Apple___brown_spot': {
    en: [
      'Apply Captan or Thiophanate-Methyl Fungicide — Brown spot on apple leaves is caused by fungi that spread through windborne spores. Mix captan at 2 grams per litre of water and spray evenly on all foliage, ensuring coverage on both upper and lower leaf surfaces. Begin spraying when new leaves emerge in spring and continue every 10 to 14 days through the growing season. Thiophanate-methyl is a systemic alternative that gets absorbed into the plant for longer protection.',
      'Maintain Proper Orchard Sanitation — Fallen leaves and fruit debris harbour the fungal spores through winter. After leaf fall, rake up all debris from the orchard floor and either burn it or compost it at high temperatures above 60°C. This practice alone can reduce disease pressure by up to 50% the following year. Keep the area under trees clean throughout the season.',
      'Remove Fallen Leaves and Fruit Promptly — During the growing season, regularly collect and dispose of any dropped leaves or fruits showing brown lesions. The sooner infected material is removed, the fewer spores are available to spread to healthy leaves. Make it a weekly routine to walk through the orchard and clean up fallen plant material.',
    ],
    hi: [
      'कैप्टान या थायोफैनेट-मिथाइल कवकनाशी लगाएं — सेब की पत्तियों पर भूरे धब्बे हवा से फैलने वाले बीजाणुओं द्वारा कारित कवक से होते हैं। एक लीटर पानी में 2 ग्राम कैप्टान मिलाएं और सभी पत्तियों पर समान रूप से छिड़काव करें, पत्तियों की ऊपरी और निचली दोनों सतहों पर कवरेज सुनिश्चित करें। वसंत में नई पत्तियां निकलने पर छिड़काव शुरू करें और बढ़ते मौसम में हर 10 से 14 दिन में जारी रखें। थायोफैनेट-मिथाइल एक प्रणालीगत विकल्प है जो लंबी सुरक्षा के लिए पौधे में अवशोषित हो जाता है।',
      'उचित बाग स्वच्छता बनाए रखें — गिरी हुई पत्तियां और फल का मलबा सर्दियों में कवक के बीजाणुओं को आश्रय देता है। पत्ती गिरने के बाद, बाग के फर्श से सभी मलबे को इकट्ठा करें और या तो जला दें या 60°C से ऊपर उच्च तापमान पर खाद बनाएं। अकेले यह अभ्यास अगले वर्ष रोग के दबाव को 50% तक कम कर सकता है। पूरे मौसम में पेड़ों के नीचे का क्षेत्र साफ रखें।',
      'गिरी हुई पत्तियों और फलों को तुरंत हटाएं — बढ़ते मौसम के दौरान, नियमित रूप से भूरे घाव दिखाने वाली गिरी हुई पत्तियों या फलों को इकट्ठा करें और निपटाएं। जितनी जल्दी संक्रमित सामग्री हटाई जाती है, उतने कम बीजाणु स्वस्थ पत्तियों में फैलने के लिए उपलब्ध होते हैं। बाग में घूमकर गिरी हुई पौधों की सामग्री की सफाई की साप्ताहिक दिनचर्या बनाएं।',
    ]
  },
  'Apple___gray_spot': {
    en: [
      'Spray with Benomyl or Thiophanate-Methyl — Gray spot appears as small grey lesions on apple leaves and is caused by a related Alternaria species. Mix benomyl or thiophanate-methyl at the label-recommended rate (typically 1 to 2 grams per litre) and apply as a foliar spray. These systemic fungicides are absorbed into the leaf tissue and provide protection from within the plant. Apply at 14-day intervals beginning at petal fall.',
      'Remove All Infected Plant Debris — The fungal spores overwinter in fallen leaves and on dead twig tips. After harvest, thoroughly clean the orchard by raking and collecting all leaf litter. Burn this material or remove it from the orchard area entirely. In spring, inspect the trees carefully and prune out any dead twigs showing signs of fungal colonisation.',
      'Improve Air Circulation Through Pruning — Dense tree canopies trap moisture, creating ideal conditions for gray spot fungus. Perform annual dormant-season pruning to thin out crossing branches, water sprouts, and excessively dense areas. Aim for an open vase or central-leader shape that allows sunlight to penetrate the interior of the tree. This helps all parts of the tree dry quickly after rain.',
    ],
    hi: [
      'बेनोमिल या थायोफैनेट-मिथाइल का छिड़काव करें — ग्रे स्पॉट सेब की पत्तियों पर छोटे भूरे घावों के रूप में दिखाई देता है और एक संबंधित अल्टरनेरिया प्रजाति के कारण होता है। लेबल-अनुशंसित दर (आमतौर पर 1 से 2 ग्राम प्रति लीटर) पर बेनोमिल या थायोफैनेट-मिथाइल मिलाएं और पत्तियों पर छिड़काव करें। ये प्रणालीगत कवकनाशी पत्ती के ऊतकों में अवशोषित हो जाते हैं और पौधे के भीतर से सुरक्षा प्रदान करते हैं। पंखुड़ी गिरने पर शुरू करके 14 दिन के अंतराल पर लगाएं।',
      'सभी संक्रमित पौधों का मलबा हटाएं — कवक के बीजाणु गिरी हुई पत्तियों और मृत टहनी के सिरों पर सर्दियों में जीवित रहते हैं। फसल कटाई के बाद, सभी पत्ती के कूड़े को रेक करके और इकट्ठा करके बाग की अच्छी तरह सफाई करें। इस सामग्री को जला दें या बाग के क्षेत्र से पूरी तरह हटा दें। वसंत में, पेड़ों का सावधानीपूर्वक निरीक्षण करें और कवक उपनिवेशण के संकेत दिखाने वाली मृत टहनियों की छंटाई करें।',
      'छंटाई के माध्यम से वायु संचार में सुधार करें — घने पेड़ के छतरी नमी को फंसाते हैं, ग्रे स्पॉट कवक के लिए आदर्श स्थितियां बनाते हैं। क्रॉसिंग शाखाओं, वॉटर स्प्राउट्स और अत्यधिक घने क्षेत्रों को पतला करने के लिए वार्षिक सुप्त-मौसम छंटाई करें। एक खुले फूलदान या केंद्रीय-लीडर आकार का लक्ष्य रखें जो सूरज की रोशनी को पेड़ के आंतरिक भाग में प्रवेश करने दे। इससे बारिश के बाद पेड़ के सभी हिस्से जल्दी सूखते हैं।',
    ]
  },
  'Apple___healthy': {
    en: ['Your Apple Tree is Healthy — Great news! Your apple tree shows no signs of disease. Continue your current care routine including regular watering (about 25 litres per week for mature trees), balanced fertilization in early spring with NPK 10-10-10, and annual dormant-season pruning to maintain good tree structure and airflow. Monitor leaves weekly during the monsoon season for any early signs of fungal infection.'],
    hi: ['आपका सेब का पेड़ स्वस्थ है — बहुत अच्छी खबर! आपके सेब के पेड़ में रोग के कोई लक्षण नहीं हैं। अपनी वर्तमान देखभाल दिनचर्या जारी रखें जिसमें नियमित सिंचाई (परिपक्व पेड़ों के लिए प्रति सप्ताह लगभग 25 लीटर), शुरुआती वसंत में NPK 10-10-10 के साथ संतुलित उर्वरक, और अच्छी पेड़ संरचना और वायु प्रवाह बनाए रखने के लिए वार्षिक सुप्त-मौसम छंटाई शामिल है। मानसून के मौसम में कवक संक्रमण के किसी भी शुरुआती संकेत के लिए साप्ताहिक पत्तियों की निगरानी करें।']
  },
  'Apple___rust': {
    en: [
      'Apply Myclobutanil Fungicide at Bud Break — Cedar-apple rust is a fungal disease that requires two hosts: apple trees and juniper/cedar trees. The most effective time to spray is at the pink bud stage, before flowers open. Mix myclobutanil (such as Rally or Immunox) at 1 ml per litre of water and spray thoroughly. Repeat at 7 to 10 day intervals through petal fall. This prevents the rust spores (blown from cedar trees) from infecting your apple leaves.',
      'Remove Nearby Cedar or Juniper Trees — The rust fungus completes part of its life cycle on cedar and juniper trees within a 2-kilometre radius. If possible, remove these host trees from your property. If they belong to neighbours or are wild trees that cannot be removed, increase your fungicide spray schedule and focus on creating a windbreak between your orchard and the cedar trees.',
      'Use Rust-Resistant Apple Varieties — When planting new apple trees, choose varieties known for rust resistance such as Liberty, Freedom, or Enterprise. These varieties have been bred to resist rust infection and will save you considerable time and fungicide costs in the long run. Consult your local agricultural extension office for varieties best suited to your region.',
    ],
    hi: [
      'कली टूटने पर माइक्लोब्युटानिल कवकनाशी लगाएं — सेडर-सेब रस्ट एक कवक रोग है जिसके लिए दो मेजबानों की आवश्यकता होती है: सेब के पेड़ और जुनिपर/सीडार के पेड़। छिड़काव का सबसे प्रभावी समय गुलाबी कली चरण में है, फूल खुलने से पहले। एक लीटर पानी में 1 मिली माइक्लोब्युटानिल मिलाएं और अच्छी तरह छिड़काव करें। पंखुड़ी गिरने तक 7 से 10 दिन के अंतराल पर दोहराएं। यह रस्ट बीजाणुओं (सीडार पेड़ों से उड़कर आने वाले) को आपकी सेब की पत्तियों को संक्रमित करने से रोकता है।',
      'पास के सीडार या जुनिपर पेड़ हटाएं — रस्ट कवक अपने जीवन चक्र का एक हिस्सा 2 किलोमीटर के दायरे में सीडार और जुनिपर पेड़ों पर पूरा करता है। यदि संभव हो, इन मेजबान पेड़ों को अपनी संपत्ति से हटा दें। यदि वे पड़ोसियों के हैं या जंगली पेड़ हैं जिन्हें हटाया नहीं जा सकता, तो अपने कवकनाशी छिड़काव कार्यक्रम को बढ़ाएं और अपने बाग और सीडार पेड़ों के बीच हवा अवरोध बनाने पर ध्यान दें।',
      'रस्ट-प्रतिरोधी सेब की किस्में उपयोग करें — नए सेब के पेड़ लगाते समय, रस्ट प्रतिरोध के लिए जानी जाने वाली किस्में चुनें जैसे लिबर्टी, फ्रीडम, या एंटरप्राइज। इन किस्मों को रस्ट संक्रमण का प्रतिरोध करने के लिए विकसित किया गया है और लंबे समय में आपका काफी समय और कवकनाशी खर्च बचाएगी। अपने क्षेत्र के लिए सबसे उपयुक्त किस्मों के लिए अपने स्थानीय कृषि विस्तार कार्यालय से परामर्श करें।',
    ]
  },
  'Apple___scab': {
    en: [
      'Apply Captan or Mancozeb Fungicide — Apple scab is one of the most common apple diseases, caused by the Venturia inaequalis fungus. Begin preventive spraying at the green tip stage using captan at 2 grams per litre or mancozeb at 2.5 grams per litre. Continue spraying every 7 to 10 days through petal fall and beyond if wet weather persists. These contact fungicides must be applied before infection occurs, as they work by preventing spore germination on the leaf surface.',
      'Remove and Destroy Infected Leaves — Scab appears as olive-green to black velvety spots on leaves and fruit. Remove visibly scabbed leaves during the growing season and collect all leaf litter after autumn leaf fall. The fungus overwinters in fallen leaves on the ground and releases spores during spring rains that infect new growth. Removing this source material is the most important cultural practice for scab management.',
      'Promote Good Air Circulation — Prune apple trees annually during the dormant season to create an open canopy structure. Remove water sprouts, crossing branches, and inward-growing limbs. An open tree dries faster after rain, reducing the window for scab infection. Additionally, avoid planting trees too close together; maintain at least 4 metres between trees for standard varieties.',
    ],
    hi: [
      'कैप्टान या मैंकोज़ेब कवकनाशी लगाएं — सेब पपड़ी सेब के सबसे आम रोगों में से एक है, जो वेंचुरिया इनाइक्वालिस कवक के कारण होता है। हरे सिरे के चरण में कैप्टान 2 ग्राम प्रति लीटर या मैंकोज़ेब 2.5 ग्राम प्रति लीटर का उपयोग करके निवारक छिड़काव शुरू करें। पंखुड़ी गिरने तक और उसके बाद अगर बारिश का मौसम जारी रहे तो हर 7 से 10 दिन में छिड़काव जारी रखें। ये संपर्क कवकनाशी संक्रमण होने से पहले लगाए जाने चाहिए क्योंकि ये पत्ती की सतह पर बीजाणु अंकुरण को रोककर काम करते हैं।',
      'संक्रमित पत्तियों को हटाएं और नष्ट करें — पपड़ी पत्तियों और फलों पर जैतूनी-हरे से काले मखमली धब्बों के रूप में दिखाई देती है। बढ़ते मौसम के दौरान दिखाई देने वाली पपड़ी वाली पत्तियों को हटाएं और शरद ऋतु में पत्ती गिरने के बाद सभी पत्ती कूड़ा इकट्ठा करें। कवक जमीन पर गिरी हुई पत्तियों में सर्दियों में जीवित रहता है और वसंत की बारिश के दौरान बीजाणु छोड़ता है जो नई वृद्धि को संक्रमित करते हैं। इस स्रोत सामग्री को हटाना पपड़ी प्रबंधन के लिए सबसे महत्वपूर्ण सांस्कृतिक अभ्यास है।',
      'अच्छे वायु संचार को बढ़ावा दें — एक खुली छतरी संरचना बनाने के लिए सुप्त मौसम के दौरान सालाना सेब के पेड़ों की छंटाई करें। वॉटर स्प्राउट्स, क्रॉसिंग शाखाओं और अंदर की ओर बढ़ने वाली शाखाओं को हटाएं। खुला पेड़ बारिश के बाद तेजी से सूखता है, जिससे पपड़ी संक्रमण की संभावना कम होती है। इसके अतिरिक्त, पेड़ों को बहुत पास-पास न लगाएं; मानक किस्मों के लिए पेड़ों के बीच कम से कम 4 मीटर की दूरी बनाए रखें।',
    ]
  },

  // ═══════════════════════════════════════════
  //  BELL PEPPER (2)
  // ═══════════════════════════════════════════
  'Bell_pepper___bacterial_spot': {
    en: [
      'Apply Copper-Based Bactericide — Bacterial spot is caused by Xanthomonas bacteria and spreads rapidly in warm, wet conditions. Spray copper hydroxide or copper oxychloride at 3 grams per litre of water as soon as symptoms appear. Apply in the early morning or late evening to avoid leaf burn. Repeat every 7 to 10 days. Note that copper sprays are preventive — they kill bacteria on the leaf surface but cannot cure already-infected tissue.',
      'Avoid Working in Fields When Plants are Wet — Bacterial spot spreads easily through water splash and physical contact. Never prune, harvest, or handle pepper plants when leaves are wet from rain or dew. Schedule all field activities for dry conditions, ideally in the afternoon when the foliage has fully dried. Wash your hands and sanitize tools with a dilute bleach solution before and after working with plants.',
      'Use Certified Disease-Free Seeds — Many bacterial diseases are seed-borne, meaning the bacteria travel inside the seed itself. Always purchase seeds from reputable suppliers who provide disease-free certification. You can also treat your own saved seeds by soaking them in hot water at 50°C for 25 minutes, which kills bacteria without harming germination. Let seeds dry completely before planting.',
    ],
    hi: [
      'कॉपर-आधारित जीवाणुनाशी लगाएं — बैक्टीरियल स्पॉट ज़ैंथोमोनास बैक्टीरिया के कारण होता है और गर्म, नम स्थितियों में तेजी से फैलता है। लक्षण दिखते ही 1 लीटर पानी में 3 ग्राम कॉपर हाइड्रॉक्साइड या कॉपर ऑक्सीक्लोराइड का छिड़काव करें। पत्ती जलने से बचने के लिए सुबह जल्दी या शाम को छिड़काव करें। हर 7 से 10 दिन में दोहराएं। ध्यान दें कि कॉपर स्प्रे निवारक हैं — वे पत्ती की सतह पर बैक्टीरिया को मारते हैं लेकिन पहले से संक्रमित ऊतक को ठीक नहीं कर सकते।',
      'जब पौधे गीले हों तब खेत में काम करने से बचें — बैक्टीरियल स्पॉट पानी के छींटों और शारीरिक संपर्क से आसानी से फैलता है। जब बारिश या ओस से पत्तियां गीली हों तब कभी भी मिर्च के पौधों की छंटाई, कटाई या उन्हें न छुएं। सभी खेती गतिविधियों को सूखी स्थितियों के लिए निर्धारित करें, आदर्श रूप से दोपहर में जब पत्तियां पूरी तरह सूख चुकी हों। पौधों के साथ काम करने से पहले और बाद में अपने हाथ धोएं और उपकरणों को पतले ब्लीच घोल से कीटाणुरहित करें।',
      'प्रमाणित रोग-मुक्त बीज का उपयोग करें — कई जीवाणु रोग बीज-जनित होते हैं, अर्थात बैक्टीरिया बीज के अंदर ही यात्रा करते हैं। हमेशा प्रतिष्ठित आपूर्तिकर्ताओं से बीज खरीदें जो रोग-मुक्त प्रमाणन प्रदान करते हैं। आप अपने स्वयं सहेजे गए बीजों को 50°C पर 25 मिनट तक गर्म पानी में भिगोकर भी उपचारित कर सकते हैं, जो अंकुरण को नुकसान पहुंचाए बिना बैक्टीरिया को मारता है। बोने से पहले बीजों को पूरी तरह सूखने दें।',
    ]
  },
  'Bell_pepper___healthy': {
    en: ['Your Bell Pepper Plant is Healthy — Excellent! Your pepper plant shows strong, vibrant foliage with no signs of bacterial or fungal infection. Continue providing consistent watering (peppers prefer moist but not waterlogged soil), full sun exposure for at least 6 hours daily, and feed with a balanced fertilizer every 3 weeks. Watch for common pests like aphids and whiteflies, and pick ripe peppers promptly to encourage continued production.'],
    hi: ['आपका शिमला मिर्च का पौधा स्वस्थ है — बहुत बढ़िया! आपके मिर्च के पौधे में मजबूत, जीवंत पत्तियां हैं और बैक्टीरियल या कवक संक्रमण के कोई लक्षण नहीं हैं। नियमित सिंचाई जारी रखें (मिर्च नम लेकिन जलमग्न नहीं मिट्टी पसंद करती है), प्रतिदिन कम से कम 6 घंटे पूर्ण धूप, और हर 3 सप्ताह संतुलित उर्वरक दें। एफिड्स और सफेद मक्खी जैसे आम कीटों पर नजर रखें, और निरंतर उत्पादन को प्रोत्साहित करने के लिए पके हुए मिर्च तुरंत तोड़ें।']
  },

  // ═══════════════════════════════════════════
  //  BLUEBERRY (1)
  // ═══════════════════════════════════════════
  'Blueberry___healthy': {
    en: ['Your Blueberry Plant is Healthy — Wonderful! Your blueberry bush is thriving. Blueberries require acidic soil with a pH between 4.5 and 5.5 for optimal nutrient absorption. Continue mulching with pine bark or pine needles to maintain soil acidity, water regularly with drip irrigation to keep roots moist, and prune old woody canes after the harvest season to encourage vigorous new growth next year.'],
    hi: ['आपका ब्लूबेरी पौधा स्वस्थ है — बहुत अच्छा! आपकी ब्लूबेरी की झाड़ी अच्छी तरह बढ़ रही है। ब्लूबेरी को इष्टतम पोषक तत्व अवशोषण के लिए 4.5 से 5.5 के बीच pH वाली अम्लीय मिट्टी की आवश्यकता होती है। मिट्टी की अम्लता बनाए रखने के लिए चीड़ की छाल या चीड़ की सुइयों से मल्चिंग जारी रखें, जड़ों को नम रखने के लिए ड्रिप सिंचाई से नियमित पानी दें, और अगले वर्ष जोरदार नई वृद्धि को प्रोत्साहित करने के लिए फसल के मौसम के बाद पुरानी लकड़ी के बेंतों की छंटाई करें।']
  },

  // ═══════════════════════════════════════════
  //  CASSAVA (5)
  // ═══════════════════════════════════════════
  'Cassava___bacterial_blight': {
    en: [
      'Remove and Burn Infected Plants Immediately — Cassava bacterial blight (CBB) is caused by Xanthomonas axonopodis and can devastate entire fields if not controlled quickly. Uproot all plants showing symptoms like angular leaf spots, wilting, and gum exudation from stems. Burn these plants completely — do not leave them in the field or add to compost. This prevents bacterial spread through rain splash and insect vectors.',
      'Use Resistant Cassava Varieties — The most sustainable long-term solution for CBB is planting resistant varieties. Consult your local agricultural research station for varieties bred for resistance in your region. Resistant varieties may produce slightly different starch content but will save your entire harvest from being lost to blight.',
      'Practice Strict Crop Rotation — Do not plant cassava in the same field for at least 2 consecutive seasons after a blight outbreak. Rotate with non-host crops like maize, groundnut, or cowpea. This breaks the disease cycle as the bacteria cannot survive in soil without a host plant for extended periods.',
    ],
    hi: [
      'संक्रमित पौधों को तुरंत उखाड़कर जला दें — कसावा बैक्टीरियल ब्लाइट (CBB) ज़ैंथोमोनास एक्सोनोपोडिस के कारण होता है और अगर जल्दी नियंत्रित न किया जाए तो पूरे खेत को तबाह कर सकता है। कोणीय पत्ती के धब्बे, मुरझाना और तनों से गोंद निकलने जैसे लक्षण दिखाने वाले सभी पौधों को उखाड़ दें। इन पौधों को पूरी तरह जला दें — इन्हें खेत में न छोड़ें या खाद में न मिलाएं। यह बारिश के छींटों और कीट वाहकों द्वारा बैक्टीरिया के प्रसार को रोकता है।',
      'प्रतिरोधी कसावा किस्में उपयोग करें — CBB का सबसे टिकाऊ दीर्घकालिक समाधान प्रतिरोधी किस्में लगाना है। अपने क्षेत्र में प्रतिरोध के लिए विकसित किस्मों के लिए अपने स्थानीय कृषि अनुसंधान केंद्र से परामर्श करें। प्रतिरोधी किस्में थोड़ी अलग स्टार्च सामग्री का उत्पादन कर सकती हैं लेकिन आपकी पूरी फसल को ब्लाइट से बचाएंगी।',
      'सख्त फसल चक्र अपनाएं — ब्लाइट के प्रकोप के बाद कम से कम लगातार 2 मौसमों तक एक ही खेत में कसावा न लगाएं। मक्का, मूंगफली या लोबिया जैसी गैर-मेजबान फसलों के साथ बदलें। इससे रोग चक्र टूट जाता है क्योंकि बैक्टीरिया लंबे समय तक मेजबान पौधे के बिना मिट्टी में जीवित नहीं रह सकते।',
    ]
  },
  'Cassava___brown_streak_disease': {
    en: [
      'Use Virus-Free Planting Material — Cassava brown streak disease (CBSD) is caused by a virus and spreads through infected stem cuttings. Always source your planting material from certified virus-free nurseries. Inspect cuttings carefully before planting — avoid any material from plants showing yellow patches or brown streaks on stems.',
      'Remove Infected Plants Early — At the first sign of yellow blotchy patterns on leaves or brown necrotic streaks on stems, uproot and destroy the entire plant. Early removal prevents whiteflies (the insect vector) from acquiring the virus and transmitting it to healthy neighbouring plants.',
      'Plant Resistant Varieties — Several cassava varieties have been bred for tolerance to CBSD. Contact your regional agricultural extension service for recommended tolerant varieties. While no variety is fully immune, tolerant varieties show minimal yield loss even when infected.',
    ],
    hi: [
      'वायरस-मुक्त रोपण सामग्री का उपयोग करें — कसावा ब्राउन स्ट्रीक रोग (CBSD) एक वायरस के कारण होता है और संक्रमित तना कटिंग के माध्यम से फैलता है। अपनी रोपण सामग्री हमेशा प्रमाणित वायरस-मुक्त नर्सरियों से लें। लगाने से पहले कटिंग का सावधानीपूर्वक निरीक्षण करें — तनों पर पीले धब्बे या भूरी धारियां दिखाने वाले पौधों से किसी भी सामग्री से बचें।',
      'संक्रमित पौधों को जल्दी हटाएं — पत्तियों पर पीले धब्बेदार पैटर्न या तनों पर भूरी नेक्रोटिक धारियों के पहले संकेत पर, पूरे पौधे को उखाड़कर नष्ट कर दें। जल्दी हटाने से सफेद मक्खियों (कीट वाहक) को वायरस प्राप्त करने और इसे स्वस्थ पड़ोसी पौधों तक पहुँचाने से रोकता है।',
      'प्रतिरोधी किस्में लगाएं — CBSD के लिए सहनशीलता के लिए कई कसावा किस्में विकसित की गई हैं। अनुशंसित सहनशील किस्मों के लिए अपनी क्षेत्रीय कृषि विस्तार सेवा से संपर्क करें। जबकि कोई भी किस्म पूरी तरह प्रतिरक्षित नहीं है, सहनशील किस्में संक्रमित होने पर भी न्यूनतम उपज हानि दिखाती हैं।',
    ]
  },
  'Cassava___green_mottle': {
    en: [
      'Use Virus-Free Cuttings for Planting — Green mottle virus spreads primarily through infected planting material. Source your cassava stem cuttings only from healthy, certified plants. Inspect mother plants carefully for any mosaic or mottling patterns before taking cuttings.',
      'Control Whitefly Vectors — Whiteflies (Bemisia tabaci) are the primary insect vectors that spread the green mottle virus between plants. Apply neem oil spray (5 ml per litre of water) every 7 days to deter whiteflies. Yellow sticky traps placed at canopy height around the field perimeter can also help monitor and reduce whitefly populations.',
      'Remove Infected Plants Promptly — Plants showing green mottling, leaf distortion, or stunted growth should be uprooted and burned immediately. Leaving infected plants in the field allows whiteflies to feed on them and carry the virus to neighbouring healthy plants.',
    ],
    hi: [
      'रोपण के लिए वायरस-मुक्त कटिंग का उपयोग करें — ग्रीन मॉटल वायरस मुख्य रूप से संक्रमित रोपण सामग्री के माध्यम से फैलता है। अपनी कसावा तना कटिंग केवल स्वस्थ, प्रमाणित पौधों से लें। कटिंग लेने से पहले मातृ पौधों का किसी भी मोज़ेक या मॉटलिंग पैटर्न के लिए सावधानीपूर्वक निरीक्षण करें।',
      'सफेद मक्खी वाहकों को नियंत्रित करें — सफेद मक्खी (बेमिसिया ताबासी) प्राथमिक कीट वाहक हैं जो पौधों के बीच ग्रीन मॉटल वायरस फैलाती हैं। सफेद मक्खियों को रोकने के लिए हर 7 दिन नीम तेल स्प्रे (1 लीटर पानी में 5 मिली) लगाएं। खेत की परिधि के चारों ओर छतरी की ऊंचाई पर रखे गए पीले चिपचिपे जाल भी सफेद मक्खी की आबादी की निगरानी और कमी में मदद कर सकते हैं।',
      'संक्रमित पौधों को तुरंत हटाएं — हरी चित्तीदार, पत्ती विकृति या बौनी वृद्धि दिखाने वाले पौधों को तुरंत उखाड़कर जला देना चाहिए। खेत में संक्रमित पौधों को छोड़ने से सफेद मक्खियां उन पर भोजन कर सकती हैं और वायरस को पड़ोसी स्वस्थ पौधों तक ले जा सकती हैं।',
    ]
  },
  'Cassava___healthy': {
    en: ['Your Cassava Plant is Healthy — Your cassava is growing well with no signs of disease. Continue maintaining well-drained soil, as cassava roots are susceptible to rot in waterlogged conditions. Ensure proper weed control, especially in the first 3 months after planting when the crop is establishing. Cassava is drought-tolerant once established but benefits from supplemental irrigation during extended dry spells.'],
    hi: ['आपका कसावा पौधा स्वस्थ है — आपका कसावा बिना किसी रोग के लक्षण के अच्छी तरह बढ़ रहा है। अच्छी जल निकासी वाली मिट्टी बनाए रखें, क्योंकि कसावा की जड़ें जलमग्न स्थितियों में सड़ने के लिए संवेदनशील हैं। विशेष रूप से रोपण के बाद पहले 3 महीनों में जब फसल स्थापित हो रही होती है, उचित खरपतवार नियंत्रण सुनिश्चित करें। कसावा स्थापित होने के बाद सूखा-सहनशील है लेकिन लंबे सूखे के दौरान पूरक सिंचाई से लाभ होता है।']
  },
  'Cassava___mosaic_disease': {
    en: [
      'Use Resistant Cassava Varieties — Cassava mosaic disease (CMD) is one of the most devastating diseases in cassava farming. Plant resistant or tolerant varieties that have been specifically bred for CMD resistance. These varieties maintain good yields even under high disease pressure and are your most effective defence.',
      'Remove Infected Plants and Destroy Them — Plants showing characteristic mosaic leaf patterns (yellow and green patches, leaf curling, reduced leaf size) should be immediately removed. Pull out the entire plant including roots and burn all plant material. This reduces the virus source in your field dramatically.',
      'Control Whitefly Populations with Neem Oil — The Bemisia tabaci whitefly transmits CMD from infected to healthy plants. Spray neem oil solution (5 ml neem oil plus 1 ml liquid soap per litre of water) every 5 to 7 days on the underside of leaves where whiteflies congregate. This organic treatment disrupts whitefly feeding and reproduction without harming beneficial insects.',
    ],
    hi: [
      'प्रतिरोधी कसावा किस्में उपयोग करें — कसावा मोज़ेक रोग (CMD) कसावा की खेती में सबसे विनाशकारी रोगों में से एक है। CMD प्रतिरोध के लिए विशेष रूप से विकसित प्रतिरोधी या सहनशील किस्में लगाएं। ये किस्में उच्च रोग दबाव में भी अच्छी उपज बनाए रखती हैं और आपकी सबसे प्रभावी रक्षा हैं।',
      'संक्रमित पौधों को हटाएं और नष्ट करें — विशिष्ट मोज़ेक पत्ती पैटर्न (पीले और हरे धब्बे, पत्ती मुड़ना, पत्ती का आकार कम होना) दिखाने वाले पौधों को तुरंत हटा दें। जड़ों सहित पूरा पौधा उखाड़ दें और सभी पौधों की सामग्री को जला दें। इससे आपके खेत में वायरस के स्रोत में नाटकीय रूप से कमी आती है।',
      'नीम तेल से सफेद मक्खी की आबादी नियंत्रित करें — बेमिसिया ताबासी सफेद मक्खी CMD को संक्रमित से स्वस्थ पौधों में प्रसारित करती है। पत्तियों के निचले हिस्से पर जहां सफेद मक्खियां इकट्ठा होती हैं, हर 5 से 7 दिन नीम तेल का घोल (1 लीटर पानी में 5 मिली नीम तेल और 1 मिली तरल साबुन) छिड़कें। यह जैविक उपचार लाभकारी कीटों को नुकसान पहुंचाए बिना सफेद मक्खी के भोजन और प्रजनन को बाधित करता है।',
    ]
  },

  // Remaining diseases continued in Part 2...
};

module.exports = REMEDIES;
