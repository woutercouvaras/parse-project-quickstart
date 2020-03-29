import { Customer } from "@project/model";

export interface CloudRequest {
    [x: string]: any;
}

export interface CloudResponse {
    data?: any;
    error?: any;
}

export const helloFromCloud = async (): Promise<CloudResponse> => {
    return {
        data: "Hello from the cloud"
    };
};

export const deleteUser = async (request: CloudRequest): Promise<CloudResponse> => {
    if (request.params.userId) {
        try {
            const query = new Parse.Query(Customer);
            const user = await query.get(request.params.userId);
            await user.destroy({ useMasterKey: true });
            return {
                data: request.params.userId
            };
        } catch (e) {
            return {
                error: e
            };
        }
    }
    return {
        data: null
    };
};
