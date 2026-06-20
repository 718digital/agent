// =============================================
// DOLA AI HELPERS
// =============================================

const DOLA_API_KEY = process.env.DOLA_API_KEY || '';
const DOLA_API_URL = process.env.DOLA_API_URL || 'https://ark.ap-southeast.bytepluses.com/api/v3';
const DOLA_MODEL = process.env.DOLA_MODEL || 'bytedance/dola-seed-2-0-lite';

async function callDola(systemPrompt, userMessage) {
    try {
        const response = await fetch(`${DOLA_API_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DOLA_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: DOLA_MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage || '' }
                ],
                temperature: 0.7,
                max_tokens: 4096
            })
        });

        if (!response.ok) {
            throw new Error(`Dola API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('❌ Dola error:', error);
        return "Je suis désolé, je rencontre un problème technique avec Dola.";
    }
}

async function callDolaJSON(systemPrompt, userMessage) {
    const enhanced = systemPrompt + "\n\nRéponds UNIQUEMENT en format JSON valide, sans texte autour.";
    const result = await callDola(enhanced, userMessage);
    try {
        return JSON.parse(result);
    } catch (e) {
        try {
            const clean = result.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(clean);
        } catch (e2) {
            console.error('❌ Dola JSON parse error:', e2.message, '\nRaw response:', result);
            return null;
        }
    }
}

module.exports = { callDola, callDolaJSON };
