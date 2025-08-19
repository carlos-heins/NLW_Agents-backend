import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts';

const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: 'Transcreva o audio para português de Brasil. Seja preciso e natual na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.'
            },
            {
                inlineData: {
                    mimeType,
                    data: audioAsBase64
                }
            }
        ]
    })

    if (!response.text) {
        throw new Error("Erro ao transcrever o audio")
    }


    return response.text
}

export async function generateEmbedding(text: string) {
    const response = await gemini.models.embedContent({
        model: 'text-embedding-004',
        contents: [{ text }],
        config: {
            taskType: 'RETRIEVAL_DOCUMENT'
        }
    });

    if (!response.embeddings?.[0].values) {
        throw new Error("Erro ao gerar os embeddings");
    }

    return response.embeddings[0].values;
}

export async function generateAnswer(question: string, transcriptions: string[]) {
    const context = transcriptions.join('\n\n');

    const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e objetiva em português Brasileiro. Se a resposta não estiver presente no contexto, diga "Não sei".
    CONTEXTO: ${context}
    PERGUNTA: ${question}
    INSTRUÇÕES:
    - Use apenas informações do contexto para responder.
    - Seja claro e direto.
    - Se a resposta não estiver no contexto, diga "Não sei".
    - Responda em português Brasileiro.
    - Mantenha um tom educativo e profissional.
    - Cite trechos importantes do contexto quando necessário.
    - Se for usar o contexto utilize junto do tempo 'Conteudo da Aula"
    `
    .trim();

    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: prompt
            }
        ]
    })

    if (!response.text) {
        throw new Error("Erro ao gerar a resposta");
    }

    return response.text;
}