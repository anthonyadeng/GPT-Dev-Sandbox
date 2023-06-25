import { modelsResponseType, singleModelType } from '../utils/defaultModels';
import { Autocomplete, TextField } from '@mui/material';
import { trpc } from '../utils/trpc';
import { defaultModels } from '../utils/defaultModels';
interface ModelsProps {
    apiKey: React.MutableRefObject<string>;
    organization: React.MutableRefObject<string>;
    modelsList: React.MutableRefObject<modelsResponseType>;
}
export default function Models({ modelsList, organization, apiKey }: ModelsProps) {
    trpc.openaiSetConfig.useQuery(
        {
            organization: organization.current,
            apiKey: apiKey.current,
        },
        {
            enabled: !!apiKey.current,
            retry: false,
            staleTime: Infinity,
            cacheTime: Infinity,
            placeholderData: modelsList.current,
        }
    );

    const { isLoading, error, data } = trpc.openaiListModels.useQuery();

    if (isLoading) return <div>'Loading...'</div>;

    if (error) return <div>An error has occurred: {error.message}</div>;

    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={data?.data.map((modelp: singleModelType) => modelp.id)}
                sx={{ width: 300 }}
                fullWidth
                selectOnFocus
                renderInput={(params) => <TextField {...params} label="Model" />}
            />
        </div>
    );
}

// function formatModelsResponse(modelsResponse: modelsResponseType) {
//   return modelsResponse.data.map((model: { id: string }) => {
//     return { modelID: model.id, modelDetails: model };
//   });
// }
