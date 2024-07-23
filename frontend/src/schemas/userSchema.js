import { z } from 'zod';

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export default userSchema;