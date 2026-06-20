// =============================================
// CANVA PRO HELPERS
// =============================================

function generateCanvaAutofill(templateId, data) {
    const cleanData = {};
    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && value !== null && value !== '') {
            cleanData[key] = String(value).trim();
        }
    }

    const params = new URLSearchParams();
    params.set('autofill', JSON.stringify(cleanData));
    params.set('utm_source', '718digital');

    return `https://www.canva.com/design/${templateId}/view?${params.toString()}`;
}

const CANVA_TEMPLATES = {
    'logo': process.env.CANVA_TEMPLATE_LOGO || 'DAFxxxxx',
    'flyer': process.env.CANVA_TEMPLATE_FLYER || 'DAFyyyyy',
    'post': process.env.CANVA_TEMPLATE_POST || 'DAFzzzzz'
};

module.exports = { generateCanvaAutofill, CANVA_TEMPLATES };
