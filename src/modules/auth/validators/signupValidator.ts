import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    first_name: Joi.string()
      .pattern(/^[\w-]+$/)
      .message('First name can only contain letters, numbers, hyphens and underscores.')
      .required(),
    last_name: Joi.string()
      .pattern(/^[\w-]+$/)
      .message('Last name can only be numbers, letters, hyphens and underscores.')
      .required(),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      .message(
        'Password must contain minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
      )
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
  },
});
