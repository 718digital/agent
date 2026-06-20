// =============================================
// AIRTABLE HELPERS
// =============================================

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || '';

async function airtableRequest(method, table, body = null, recordId = null) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.log('⚠️ Airtable non configuré - Mode simulation');
        return { id: `sim-${Date.now()}`, fields: body };
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}${recordId ? '/' + recordId : ''}`;
    const options = {
        method: method,
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    if (body) options.body = JSON.stringify({ fields: body });

    try {
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        console.error('❌ Airtable error:', error);
        return { id: `sim-${Date.now()}`, fields: body };
    }
}

async function createRecord(table, fields) {
    return airtableRequest('POST', table, fields);
}

async function updateRecord(table, recordId, fields) {
    return airtableRequest('PATCH', table, fields, recordId);
}

async function findRecords(table, filterFormula) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        return [];
    }

    try {
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}?filterByFormula=${encodeURIComponent(filterFormula)}`;
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
        });
        const data = await response.json();
        return data.records || [];
    } catch (error) {
        console.error('❌ Airtable find error:', error);
        return [];
    }
}

async function getRecord(table, recordId) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !recordId) {
        return null;
    }

    try {
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}/${recordId}`;
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
        });
        return response.json();
    } catch (error) {
        console.error('❌ Airtable get error:', error);
        return null;
    }
}

module.exports = { createRecord, updateRecord, findRecords, getRecord };
