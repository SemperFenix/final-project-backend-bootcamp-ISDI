import { model, Schema } from 'mongoose';
import { Tech } from '../../../techniques/domain/tech.js';

const techsSchema = new Schema<Tech>({
  attack: {
    type: String,
    required: true,
  },
  tech: {
    type: String,
    required: true,
  },
  stand: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  usersLearnt: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Aikido_User',
      required: true,
    },
  ],
  usersInProgress: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Aikido_User',
      required: true,
    },
  ],
  usersToLearn: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Aikido_User',
      required: true,
    },
  ],
  video: {
    type: String,
    required: true,
  },
});

techsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TechModel = model('Tech', techsSchema, 'techniques');
