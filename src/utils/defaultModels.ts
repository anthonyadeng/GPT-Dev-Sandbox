export interface singleModelType {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  permission: {
    id: string;
    object: string;
    created: number;
    allow_create_engine: boolean;
    allow_sampling: boolean;
    allow_logprobs: boolean;
    allow_search_indices: boolean;
    allow_view: boolean;
    allow_fine_tuning: boolean;
    organization: string;
    group: null;
    is_blocking: boolean;
  }[];
  root: string;
  parent: null;
}
export interface modelsResponseType {
  object: string;
  data: singleModelType[];
}

export const defaultModels: modelsResponseType = {
  object: 'list',
  data: [
    {
      id: 'whisper-1',
      object: 'model',
      created: 1677532384,
      owned_by: 'openai-internal',
      permission: [
        {
          id: 'modelperm-KlsZlfft3Gma8pI6A8rTnyjs',
          object: 'model_permission',
          created: 1683912666,
          allow_create_engine: false,
          allow_sampling: true,
          allow_logprobs: true,
          allow_search_indices: false,
          allow_view: true,
          allow_fine_tuning: false,
          organization: '*',
          group: null,
          is_blocking: false,
        },
      ],
      root: 'whisper-1',
      parent: null,
    },
  ],
};
