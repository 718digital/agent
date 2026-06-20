// =============================================
// WHATSAPP HELPERS
// =============================================

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || '';
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || '';

async function sendWhatsApp(to, message) {
    if (!WHATSAPP_TOKEN) {
        console.log(`📱 [SIMULATION] Message vers ${to}: ${message}`);
        return { status: 'simulated' };
    }

    try {
        const response = await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: to,
                type: 'text',
                text: { body: message }
            })
        });
        return response.json();
    } catch (error) {
        console.error('❌ WhatsApp error:', error);
        return { status: 'error', message: error.message };
    }
}

async function sendWhatsAppFile(to, url, caption) {
    if (!WHATSAPP_TOKEN) {
        console.log(`📱 [SIMULATION] Fichier vers ${to}: ${url}`);
        return { status: 'simulated' };
    }

    try {
        const response = await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: to,
                type: 'document',
                document: {
                    link: url,
                    caption: caption
                }
            })
        });
        return response.json();
    } catch (error) {
        console.error('❌ WhatsApp file error:', error);
        return { status: 'error', message: error.message };
    }
}

module.exports = { sendWhatsApp, sendWhatsAppFile };
