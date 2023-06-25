import { ChatCompletionRequestMessage, Configuration, ConfigurationParameters, OpenAIApi } from 'openai';
let openai: undefined | OpenAIApi = undefined;

export async function openaiSetConfig(cfg: ConfigurationParameters) {
    const configuration = new Configuration({
        organization: cfg.organization,
        apiKey: cfg.apiKey,
    });
    openai = new OpenAIApi(configuration);
    console.log(openai);
}

export async function openaiListModels() {
    console.log('in list models');
    if (openai) {
        try {
            const res = await openai.listModels();
            return res;
        } catch (err) {
            console.log('Error in listModels ', err);
        }
    }
}

export async function openaiRequest(data: openaiRequestData) {
    if (openai) {
        try {
            return await openai.createChatCompletion({
                ...data,
            });
        } catch (err) {
            console.log('Error in OpenAI API Request ', err);
        }
    }
}

export async function openaiCreateChatCompletion(
    question: string,
    model: string,
    temperature?: number,
    top_p?: number,
    n?: number,
    stream?: boolean,
    stop?: string | string[],
    max_tokens?: number,
    presence_penalty?: number,
    frequency_penalty?: number,
    logit_bias?: { [key: string]: number },
    user?: string
) {
    if (openai) {
        try {
            const res = await openai.createChatCompletion({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: question,
                        name: 'User',
                    },
                ],
                temperature: temperature || 0.9,
                top_p: top_p || 1,
                n: n || 1,
                stream: stream || false,
                stop: stop || ['\n', 'Human:', 'AI:'],
                max_tokens: max_tokens || 150,
                presence_penalty: presence_penalty || 0.6,
                frequency_penalty: frequency_penalty || 0.6,
                logit_bias: logit_bias || undefined,
                user: user || undefined,
            });

            return res;
        } catch (err) {
            console.log('Error in OpenAI API Request ', err);
        }
    }
}

export async function openaiFineTune(data: openaiFineTuneData) {
    if (openai) {
        try {
            return await openai.createFineTune({
                ...data,
            });
        } catch (err) {
            console.log('Error in OpenAI API Request ', err);
        }
    }
}
type openaiRequestData = {
    messages: ChatCompletionRequestMessage[];
    model: string;
    temperature?: number;
};
