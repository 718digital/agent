// =============================================
// ROUTAGE - Décision d'utilisation des IA
// =============================================

const COMPLEX_SERVICES = [
    'logo', 'identite', 'branding', 'charte', 'luxe',
    'premium', 'sur mesure', 'personnalisé', 'complexe',
    'identité visuelle', 'corporate', 'élégant', 'concept'
];

const SIMPLE_SERVICES = [
    'flyer', 'post', 'reseau social', 'instagram', 'facebook',
    'carte visite', 'affiche', 'menu', 'banniere',
    'publication', 'story', 'annonce', 'invitation'
];

function determineComplexity(brief, serviceType) {
    // Garde-fou : évite un crash si brief/serviceType sont undefined ou non-string
    brief = typeof brief === 'string' ? brief : '';
    serviceType = typeof serviceType === 'string' ? serviceType : '';

    const text = (brief + ' ' + serviceType).toLowerCase();

    // 1. Vérifier les services complexes
    for (const word of COMPLEX_SERVICES) {
        if (text.includes(word.toLowerCase())) return 'complex';
    }

    // 2. Vérifier les services simples
    for (const word of SIMPLE_SERVICES) {
        if (text.includes(word.toLowerCase())) return 'simple';
    }

    // 3. Analyse du brief
    const words = brief.split(' ').length;
    const hasDetails = /détail|précis|spécifique|personnalisé|exigences/.test(text);

    if (words > 30 || hasDetails) return 'complex';

    return 'simple';
}

function getAIForTask(task, complexity) {
    // Complexe → Dola, Simple → Mistral
    if (complexity === 'complex') {
        return 'Dola AI';
    }
    return 'Mistral';
}

function getToolByComplexity(complexity) {
    if (complexity === 'complex') {
        return {
            ai: 'Dola AI',
            emoji: '🎨',
            description: 'Création complexe avec Dola AI'
        };
    }
    return {
        ai: 'Mistral',
        emoji: '📄',
        description: 'Design simple avec Mistral'
    };
}

module.exports = {
    determineComplexity,
    getAIForTask,
    getToolByComplexity,
    COMPLEX_SERVICES,
    SIMPLE_SERVICES
};
