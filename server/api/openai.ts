import {
  ChatCompletionRequestMessage,
  Configuration,
  ConfigurationParameters,
  OpenAIApi,
} from 'openai';

let openai: undefined | OpenAIApi = undefined;

export async function openaiSetConfig(cfg: ConfigurationParameters) {
  const configuration = new Configuration({
    organization: cfg.organization,
    apiKey: cfg.apiKey,
  });
  openai = new OpenAIApi(configuration);
}

export async function listModels() {
  if (openai) {
    try {
      return await openai.listModels();
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

type openaiRequestData = {
  messages: ChatCompletionRequestMessage[];
  model: string;
  temperature?: number;
};
