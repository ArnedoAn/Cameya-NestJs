import { User } from '@prisma/client';

export interface RegisterResponse {
    success: boolean;
    result?: User;
    error?: string;
}
