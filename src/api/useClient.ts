import { apiClient } from '@/api/client';
import { getApiError } from '@/services/apiErrorHelper';
import errorMessages from '@/constants/errorMessages';

const fileName = 'document.api.ts';

async function getDocument(id: string, yearWeek: number) {
    try {
        const response = await apiClient.get('reousce/name', {
            params: {
                resourceId: id,
                year_week: yearWeek,
            },
        });
        return response.data;
    } catch (error) {
        return Promise.reject(getApiError(error, errorMessages.RESOURCE_NAME, fileName));
    }
}

export default {
    getDocument,
};
