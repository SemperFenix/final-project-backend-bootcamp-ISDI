import { model, Schema } from 'mongoose';
import AikidoUser from '../../students/domain/aikido.user';
import Tech from '../../techniques/domain/techniques';

const aikidoUserSchema = new Schema<AikidoUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  techsLearnt: [
    {
      type: Tech,
    },
  ],
  techsInProgress: [
    {
      type: Tech,
    },
  ],
  role: {
    type: String,
  },
  timePracticing: {
    type: String,
  },
  principalSensei: {
    type: AikidoUser,
  },
  mainUke: {
    type: AikidoUser,
  },
  avatar: {
    type: String,
  },
  age: {
    type: String,
  },
});

aikidoUserSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const AikidoUserModel = model(
  'Aikido_User',
  aikidoUserSchema,
  'aikido_users'
);
