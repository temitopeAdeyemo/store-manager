import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    password: Joi.string()
      .pattern(/^[\w-]+$/)
      .message('Password can only be numbers, letters, hyphens and underscores.')
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  },
});
