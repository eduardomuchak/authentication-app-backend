import { UserDto } from 'src/users/dto/user.dto';
import { z } from 'zod';

export function validateUserSchema(user: UserDto) {
  const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    bio: z.string(),
    photo: z.string(),
    phone: z.string(),
  });

  const validatedUser = userSchema.parse(user);

  return validatedUser;
}
