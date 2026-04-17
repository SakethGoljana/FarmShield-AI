const axios = require('axios');
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

// Revised Soil Nutrient Thresholds (Indian Agricultural Standards)
const OPTIMAL = {
    N: { low: 280, high: 560, unit: 'kg/ha' }, // Low < 280, Med 280-560, High > 560
    P: { low: 25,  high: 56,  unit: 'kg/ha' },
    K: { low: 150, high: 450, unit: 'kg/ha' }, // 300 kg/ha is now "Optimal/Medium"
};

function getNutrientStatus(value, opt, lang = 'en') {
    const v = parseFloat(value);
    const hiMap = { 'Low': 'कम', 'High': 'अधिक', 'Optimal': 'इष्टतम' };
    let status = 'Optimal';
    let fix = 'ok';
    let color = '#22c55e';
    
    if (v < opt.low) { status = 'Low'; color = '#ef4444'; fix = 'deficient'; }
    else if (v > opt.high) { status = 'High'; color = '#f59e0b'; fix = 'excess'; }
    
    return { 
        status: lang === 'hi' ? hiMap[status] : status, 
        color, 
        fix 
    };
}

function getPhAssessment(ph, lang = 'en') {
    const v = parseFloat(ph);
    if (v < 5.5) return { 
        label: lang === 'en' ? 'Strongly Acidic' : 'अत्यधिक अम्लीय', 
        advice: lang === 'en' ? 'Your soil is highly acidic. Apply agricultural lime (calcium carbonate) at 2-4 tonnes per hectare to raise the pH. You can also mix wood ash into the soil as a natural alternative. Wait a few weeks after liming before planting.' : 'आपकी मिट्टी अत्यधिक अम्लीय है। pH बढ़ाने के लिए 2-4 टन प्रति हेक्टेयर की दर से कृषि चूना (कैल्शियम कार्बोनेट) लगाएं। आप एक प्राकृतिक विकल्प के रूप में मिट्टी में लकड़ी की राख भी मिला सकते हैं।', 
        color: '#ef4444' 
    };
    if (v < 6.5) return { 
        label: lang === 'en' ? 'Slightly Acidic' : 'थोड़ी अम्लीय', 
        advice: lang === 'en' ? 'This pH is ideal for many horticultural crops and most vegetables. If you are planting legumes which prefer a more neutral pH, apply a light liming (1-2 tonnes/ha).' : 'यह pH कई बागवानी फसलों और अधिकांश सब्जियों के लिए आदर्श है। यदि आप फलियां लगा रहे हैं, तो हल्का चूना (1-2 टन/हेक्टेयर) लगाएं।', 
        color: '#f59e0b' 
    };
    if (v <= 7.8) return { 
        label: lang === 'en' ? 'Ideal (Healthy)' : 'आदर्श (स्वस्थ)', 
        advice: lang === 'en' ? 'Perfect balance! Your soil pH is in the sweet spot. Maximum nutrient availability occurs in this range. No pH adjustments are necessary.' : 'बिल्कुल सही संतुलन! आपकी मिट्टी का pH सर्वोत्तम है। इस सीमा में अधिकतम पोषक तत्व उपलब्ध होते हैं। किसी pH समायोजन की आवश्यकता नहीं है।', 
        color: '#22c55e' 
    };
    if (v <= 8.5) return { 
        label: lang === 'en' ? 'Alkaline (Salty)' : 'क्षारीय (नमकीन)', 
        advice: lang === 'en' ? 'Your soil is slightly alkaline. Add elemental sulfur or gypsum to slowly lower the pH. Incorporating organic matter like well-rotted compost also helps buffer the alkalinity naturally.' : 'आपकी मिट्टी थोड़ी क्षारीय है। pH को धीरे-धीरे कम करने के लिए मौलिक सल्फर या जिप्सम मिलाएं। अच्छी तरह सड़ी हुई खाद प्राकृतिक रूप से क्षारीयता को संतुलित करने में मदद करती है।', 
        color: '#f59e0b' 
    };
    return { 
        label: lang === 'en' ? 'Strongly Alkaline' : 'अत्यधिक क्षारीय', 
        advice: lang === 'en' ? 'This soil is too alkaline for most crops. Add elemental sulfur (200-500 kg/ha) months before planting. Significantly increase organic manure application and avoid sodium-rich or urea-based fertilizers.' : 'यह मिट्टी अधिकांश फसलों के लिए बहुत अधिक क्षारीय है। रोपण से महीनों पहले मौलिक सल्फर (200-500 किग्रा/हेक्टेयर) मिलाएं। जैविक खाद का प्रयोग काफी बढ़ा दें।', 
        color: '#ef4444' 
    };
}

function getFertilizerPlan(N, P, K, lang = 'en') {
    const tips = [];

    const nStatus = getNutrientStatus(N, OPTIMAL.N, lang);
    const pStatus = getNutrientStatus(P, OPTIMAL.P, lang);
    const kStatus = getNutrientStatus(K, OPTIMAL.K, lang);

    // Nitrogen Advice
    if (nStatus.fix === 'deficient') {
        tips.push(lang === 'en' 
            ? '🟢 Nitrogen Boost Required: Your soil lacks sufficient nitrogen for leafy growth. Apply Urea (46-0-0) in split doses across the growing season. For an organic approach, mix in heavy amounts of vermicompost or neem cake during field preparation.'
            : '🟢 नाइट्रोजन की आवश्यकता: आपकी मिट्टी में पत्तियों के विकास के लिए पर्याप्त नाइट्रोजन नहीं है। पूरे बढ़ते मौसम में विभाजित खुराकों में यूरिया (46-0-0) का प्रयोग करें। जैविक दृष्टिकोण के लिए, खेत की तैयारी के दौरान भारी मात्रा में वर्मीकम्पोस्ट या नीम की खली मिलाएं।');
    } else if (nStatus.fix === 'ok') {
        tips.push(lang === 'en' 
            ? '✅ Nitrogen is Optimal: Your nitrogen levels are perfect. Just maintain your current organic matter levels with a standard manure application before sowing.'
            : '✅ नाइट्रोजन इष्टतम है: आपका नाइट्रोजन स्तर बिल्कुल सही है। बुवाई से पहले प्रमाणित खाद के प्रयोग से अपने वर्तमान जैविक पदार्थ के स्तर को बनाए रखें।');
    } else {
        tips.push(lang === 'en' 
            ? '⚠️ Nitrogen Excess: You have too much nitrogen, which can lead to weak, leafy plants that produce fewer fruits and attract pests. Reduce urea application significantly for the next cycle.'
            : '⚠️ अधिक नाइट्रोजन: आपके पास बहुत अधिक नाइट्रोजन है, जिससे पौधे कमजोर हो सकते हैं जो कम फल देते हैं और कीटों को आकर्षित करते हैं। अगले चक्र के लिए यूरिया का प्रयोग काफी कम करें।');
    }
    
    // Phosphorus Advice
    if (pStatus.fix === 'deficient') {
        tips.push(lang === 'en' 
            ? '🟡 Phosphorus Boost Needed: Low phosphorus hinders strong root development and energy transfer. Apply Diammonium Phosphate (DAP) or Single Super Phosphate (SSP) at the time of sowing. Incorporate it deeply into the soil near the root zone.'
            : '🟡 फ़ॉस्फोरस की आवश्यकता: कम फ़ॉस्फोरस जड़ विकास में बाधा डालता है। बुवाई के समय डायमोनियम फॉस्फेट (DAP) या सिंगल सुपर फॉस्फेट (SSP) का प्रयोग करें। इसे जड़ क्षेत्र के पास मिट्टी में गहराई तक मिलाएं।');
    } else if (pStatus.fix === 'ok') {
        tips.push(lang === 'en' 
            ? '✅ Phosphorus is Optimal: Root development will be strong. Only apply a small maintenance dose of DAP during sowing if required by your specific crop.'
            : '✅ फ़ॉस्फोरस इष्टतम है: जड़ विकास मजबूत होगा। यदि आपकी विशिष्ट फसल के लिए आवश्यक हो तो बुवाई के दौरान DAP की केवल एक छोटी रखरखाव खुराक (मैंटेनेंस डोज़) लगाएं।');
    }
    
    // Potassium Advice
    if (kStatus.fix === 'deficient') {
        tips.push(lang === 'en' 
            ? '🔴 Potassium Boost Needed: Potassium is critical for disease resistance and fruit quality. Apply Muriate of Potash (MOP) as a basal dose. For organic farming, wood ash is a great natural source of potassium.'
            : '🔴 पोटेशियम की आवश्यकता: रोग प्रतिरोध और फल गुणवत्ता के लिए पोटेशियम महत्वपूर्ण है। बेसल खुराक के रूप में म्यूरेट ऑफ पोटाश (MOP) लगाएं। जैविक खेती के लिए, लकड़ी की राख पोटेशियम का एक बेहतरीन प्राकृतिक स्रोत है।');
    } else if (kStatus.fix === 'ok') {
        tips.push(lang === 'en' 
            ? '✅ Potassium is Healthy: Your soil has sufficient potassium for good fruit quality and drought resistance. No additional potash fertilizers are necessary right now.'
            : '✅ पोटेशियम स्वस्थ है: आपकी मिट्टी में अच्छी फल गुणवत्ता और सूखा प्रतिरोध के लिए पर्याप्त पोटेशियम है। अभी किसी अतिरिक्त पोटाश उर्वरक की आवश्यकता नहीं है।');
    } else {
        tips.push(lang === 'en' 
            ? '📊 Potash Abundant: Levels are perfectly high. The soils in Punjab/Jalandhar often naturally retain potassium well. You can safely skip potash applications for the next 2 cycles to save money.'
            : '📊 प्रचुर पोटाश: स्तर बिल्कुल उच्च हैं। पंजाब/जालंधर की मिट्टी अक्सर प्राकृतिक रूप से पोटेशियम बरकरार रखती है। पैसे बचाने के लिए आप अगले 2 चक्रों के लिए पोटाश आवेदन को सुरक्षित रूप से छोड़ सकते हैं।');
    }
    
    return { tips, nutrients: { N: nStatus, P: pStatus, K: kStatus } };
}

function getSoilHealthScore(N, P, K, ph) {
    let score = 100;
    // Penalize for each nutrient out of range
    if (getNutrientStatus(N, OPTIMAL.N).fix !== 'ok') score -= 15;
    if (getNutrientStatus(P, OPTIMAL.P).fix !== 'ok') score -= 15;
    if (getNutrientStatus(K, OPTIMAL.K).fix !== 'ok') score -= 15;
    // Penalize for pH out of ideal range
    const phVal = parseFloat(ph);
    if (phVal < 5.5 || phVal > 8.5) score -= 20;
    else if (phVal < 6.0 || phVal > 7.5) score -= 10;
    return Math.max(0, score);
}

router.post('/analyze', verifyToken, async (req, res) => {
    try {
        const { N, P, K, temperature, humidity, ph, rainfall } = req.body;
        const lang = req.query.lang || 'en';
        
        // Personalized analysis
        const phAssessment = getPhAssessment(ph, lang);
        const fertilizerPlan = getFertilizerPlan(N, P, K, lang);
        const healthScore = getSoilHealthScore(N, P, K, ph);
        
        let topCrops = ['General balanced crop'];
        let detailedCrops = [];

        try {
            const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001';
            const mlResponse = await axios.post(`${mlUrl}/recommend-crop`, {
                N: parseFloat(N), P: parseFloat(P), K: parseFloat(K),
                temperature: parseFloat(temperature) || 25,
                humidity: parseFloat(humidity) || 50,
                pH: parseFloat(ph) || 6.5,
                rainfall: parseFloat(rainfall) || 100
            });
            
            if (mlResponse.data.recommended_crops && mlResponse.data.recommended_crops.length > 0) {
                topCrops = mlResponse.data.recommended_crops;
            }
            if (mlResponse.data.detailed) {
                detailedCrops = mlResponse.data.detailed;
            }
        } catch (mlErr) {
            console.warn('⚠️ ML service offline, using basic recommendations.', mlErr.message);
        }

        // Save to history if user is authenticated
        if (req.user) {
            const DiagnosisHistory = require('../models/DiagnosisHistory');
            const history = new DiagnosisHistory({
                userId: req.user.uid,
                soilData: { 
                    N: parseFloat(N) || 0, 
                    P: parseFloat(P) || 0, 
                    K: parseFloat(K) || 0, 
                    pH: parseFloat(ph) || 7 
                },
                soilAdvice: fertilizerPlan.tips.join(' | '),
                cropRecommendations: topCrops.slice(0, 3),
                weatherAtTime: {
                    temperature: parseFloat(temperature) || 25,
                    humidity: parseFloat(humidity) || 50,
                    rainfall: parseFloat(rainfall) || 100
                },
                createdAt: new Date()
            });
        try {
            await history.save();
        } catch (dbErr) {
            console.error('❌ Could not save history to DB:', dbErr.message);
        }
        }

        res.status(200).json({
            success: true,
            data: {
                healthScore,
                topCrops,
                detailedCrops,
                phAssessment,
                nutrients: fertilizerPlan.nutrients,
                fertilizerTips: fertilizerPlan.tips,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
